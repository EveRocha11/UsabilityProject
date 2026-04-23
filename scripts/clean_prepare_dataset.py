from __future__ import annotations

import re
from dataclasses import dataclass
from pathlib import Path

import pandas as pd
from pandas.api.types import is_string_dtype


EXCEL_PATH = Path("Document") / "Evaluación de Herramientas inglés (Respuestas).xlsx"
OUTPUT_DIR = Path("Document")


@dataclass
class CleanConfig:
    # How to treat missing values
    convert_common_placeholders_to_nan: bool = True
    strip_text_values: bool = True
    empty_or_whitespace_to_nan: bool = True

    # Column name standardization
    strip_column_names: bool = True
    collapse_internal_whitespace_in_column_names: bool = True

    # Data consistency
    standardize_tool_names: bool = True

    # Duplicates
    drop_exact_duplicate_rows: bool = True


COMMON_MISSING_PLACEHOLDERS = {
    "",
    " ",
    "-",
    "—",
    "--",
    "N/A",
    "NA",
    "n/a",
    "na",
    "No aplica",
    "No Aplica",
    "Sin respuesta",
    "sin respuesta",
    "No responde",
    "no responde",
    "(en blanco)",
    "(blank)",
}


def report_structure(df: pd.DataFrame, title: str) -> None:
    print("\n" + "=" * 80)
    print(title)
    print("=" * 80)
    rows, cols = df.shape
    print(f"- Filas: {rows}")
    print(f"- Columnas: {cols}")


def report_columns(df: pd.DataFrame, title: str) -> None:
    print("\n" + "=" * 80)
    print(title)
    print("=" * 80)
    for i, c in enumerate(df.columns, start=1):
        print(f"{i:>3}. {c}")


def _count_values_with_outer_whitespace(series: pd.Series) -> int:
    if not is_string_dtype(series.dtype):
        return 0
    s = series.dropna().astype("string")
    if s.empty:
        return 0
    return int((s != s.str.strip()).sum())


def _count_placeholder_values(series: pd.Series) -> int:
    if not is_string_dtype(series.dtype):
        return 0
    s = series.dropna().astype("string")
    if s.empty:
        return 0
    return int(s.isin(list(COMMON_MISSING_PLACEHOLDERS)).sum())


def _category_variant_hint(series: pd.Series) -> tuple[int, int] | None:
    """Return (raw_unique, normalized_unique) if the column looks categorical.

    Normalization: strip + casefold + collapse spaces.
    We do NOT print category values (only counts).
    """
    if not is_string_dtype(series.dtype):
        return None

    s = series.dropna().astype("string")
    if s.empty:
        return None

    raw_unique = int(s.nunique(dropna=True))
    if raw_unique <= 1:
        return None

    normalized = (
        s.str.strip()
        .str.casefold()
        .str.replace(r"\s+", " ", regex=True)
    )
    norm_unique = int(normalized.nunique(dropna=True))
    return raw_unique, norm_unique


def load_excel(excel_path: Path, sheet_name: str | int | None = 0) -> pd.DataFrame:
    """Load the Excel into a DataFrame."""
    if not excel_path.exists():
        raise FileNotFoundError(f"No encuentro el archivo: {excel_path.resolve()}")
    return pd.read_excel(excel_path, sheet_name=sheet_name)


def normalize_column_name(name: object, *, cfg: CleanConfig) -> str:
    """Standardize a single column name without changing meaning."""
    s = str(name)
    if cfg.strip_column_names:
        s = s.strip()
    if cfg.collapse_internal_whitespace_in_column_names:
        s = re.sub(r"\s+", " ", s)
    return s


def make_unique_columns(columns: list[str]) -> list[str]:
    """Ensure column names are unique by appending a suffix when needed."""
    seen: dict[str, int] = {}
    out: list[str] = []
    for c in columns:
        if c not in seen:
            seen[c] = 0
            out.append(c)
            continue
        seen[c] += 1
        out.append(f"{c}__dup{seen[c]}")
    return out


def standardize_text_series(series: pd.Series, *, cfg: CleanConfig) -> pd.Series:
    """Strip text, convert placeholders/whitespace-only to NaN."""
    if not is_string_dtype(series.dtype):
        return series

    s = series.astype("string")

    if cfg.strip_text_values:
        s = s.str.strip()

    if cfg.empty_or_whitespace_to_nan:
        # After strip, empty strings are true empties
        s = s.replace("", pd.NA)

    if cfg.convert_common_placeholders_to_nan:
        # Replace exact placeholder tokens with NA
        s = s.replace(list(COMMON_MISSING_PLACEHOLDERS), pd.NA)

    return s


def standardize_tool_column(series: pd.Series) -> pd.Series:
    """Normalize tool/app names to a canonical form.

    This is rule-based (not model-based) and does not inspect free-text answers.
    """
    s = series.astype("string")

    # Normalize for matching
    key = (
        s.str.strip()
        .str.casefold()
        .str.replace(r"\s+", " ", regex=True)
    )

    # Canonical mapping (extend if you discover more variants)
    canonical = {
        "duolingo": "Duolingo",
        "grammar ninja": "Grammar Ninja",
        "johnny grammar": "Johnny Grammar",
        # Common light variations
        "johnnygrammar": "Johnny Grammar",
        "grammar-ninja": "Grammar Ninja",
        "johnny-grammar": "Johnny Grammar",
    }

    mapped = key.map(canonical)
    # If not mapped, keep original (but stripped) to avoid incorrect autocorrections.
    return mapped.fillna(s.str.strip())


def report_nulls(df: pd.DataFrame, title: str) -> None:
    rows = len(df)
    null_counts = df.isna().sum().sort_values(ascending=False)

    print("\n" + "=" * 80)
    print(title)
    print("=" * 80)
    print(f"Filas: {rows} | Columnas: {df.shape[1]}")

    any_null = False
    for col, n in null_counts.items():
        if int(n) == 0:
            continue
        any_null = True
        pct = (int(n) / rows) * 100 if rows else 0
        print(f"- {col}: {int(n)} ({pct:.1f}%)")
    if not any_null:
        print("- No se detectaron nulos (NaN/NA) en ninguna columna.")


def report_dtypes(df: pd.DataFrame, title: str) -> None:
    print("\n" + "=" * 80)
    print(title)
    print("=" * 80)
    print(df.dtypes)


def report_duplicates(df: pd.DataFrame, title: str) -> None:
    dup_rows = int(df.duplicated().sum())
    print("\n" + "=" * 80)
    print(title)
    print("=" * 80)
    print(f"Filas duplicadas exactas: {dup_rows}")


def report_quality_signals(df: pd.DataFrame, title: str) -> None:
    """Heurísticas simples de calidad (sin analizar el contenido semántico).

    Nota: no imprime respuestas; solo conteos/indicadores.
    """
    print("\n" + "=" * 80)
    print(title)
    print("=" * 80)

    printed_any = False

    # Column name hygiene
    col_series = pd.Series([str(c) for c in df.columns], dtype="string")
    col_stripped = col_series.str.strip()

    outer_ws_names = int((col_series != col_stripped).sum())
    if outer_ws_names:
        print(f"- Nombres de columnas con espacios al inicio/fin: {outer_ws_names}")
        printed_any = True

    col_norm = (
        col_stripped
        .str.casefold()
        .str.replace(r"\s+", " ", regex=True)
    )
    dup_after_norm = int(col_norm.duplicated().sum())
    if dup_after_norm:
        print(f"- Columnas que se vuelven duplicadas al normalizar (casefold+espacios): {dup_after_norm}")
        printed_any = True

    # Text columns: whitespace/placeholders
    text_cols = [c for c in df.columns if is_string_dtype(df[c].dtype)]
    if not text_cols:
        print("- No se detectaron columnas de texto (string/object).")
        return

    total_ws_values = 0
    total_placeholder_values = 0
    for c in text_cols:
        total_ws_values += _count_values_with_outer_whitespace(df[c])
        total_placeholder_values += _count_placeholder_values(df[c])

    if total_ws_values:
        print(f"- Valores de texto con espacios al inicio/fin (total): {total_ws_values}")
        printed_any = True
    if total_placeholder_values:
        print(f"- Valores tipo placeholder (N/A, '-', etc.) (total): {total_placeholder_values}")
        printed_any = True

    # Category variant hints (useful for columns like "herramienta")
    tool_cols = [c for c in df.columns if str(c).startswith("¿Qué herramienta estás evaluando?")]
    for c in tool_cols:
        hint = _category_variant_hint(df[c])
        if not hint:
            continue
        raw_u, norm_u = hint
        if norm_u < raw_u:
            print(f"- '{c}': posibles variantes por mayúsculas/espacios (únicos: {raw_u} → {norm_u} al normalizar)")
            printed_any = True

    if not printed_any:
        print("- OK: no se detectaron señales de calidad relevantes.")


def clean_dataset(df: pd.DataFrame, cfg: CleanConfig) -> tuple[pd.DataFrame, dict[str, object]]:
    """Clean dataset in a safe, analysis-free way.

    Returns cleaned df and a metadata dict describing what changed.
    """
    meta: dict[str, object] = {}

    # 1) Column names
    original_columns = list(df.columns)
    normalized_columns = [normalize_column_name(c, cfg=cfg) for c in original_columns]
    unique_columns = make_unique_columns(normalized_columns)

    meta["columns_changed"] = original_columns != unique_columns
    meta["columns_collisions_resolved"] = len(set(normalized_columns)) != len(normalized_columns)

    df = df.copy()
    df.columns = unique_columns

    # 2) Standardize text cells (strip/placeholders)
    text_cols = [c for c in df.columns if is_string_dtype(df[c].dtype)]
    meta["text_columns"] = len(text_cols)

    for col in text_cols:
        df[col] = standardize_text_series(df[col], cfg=cfg)

    # 3) Standardize tool names (categorical column)
    if cfg.standardize_tool_names:
        tool_cols = [
            c for c in df.columns
            if str(c).startswith("¿Qué herramienta estás evaluando?")
        ]
        meta["tool_columns_found"] = tool_cols
        for col in tool_cols:
            df[col] = standardize_tool_column(df[col])

    # 4) Drop exact duplicate rows
    if cfg.drop_exact_duplicate_rows:
        before = len(df)
        df = df.drop_duplicates()
        meta["duplicate_rows_removed"] = before - len(df)

    return df, meta


def verify_cleaning(before: pd.DataFrame, after: pd.DataFrame) -> None:
    """Basic verification checks that don't analyze survey answers."""
    print("\n" + "=" * 80)
    print("VERIFICACIÓN (checks básicos)")
    print("=" * 80)

    print(f"- Shape antes: {before.shape} | después: {after.shape}")
    print(f"- Columnas únicas antes: {before.columns.is_unique} | después: {after.columns.is_unique}")

    # Null totals (just counts)
    before_nulls = int(before.isna().sum().sum())
    after_nulls = int(after.isna().sum().sum())
    print(f"- Total de celdas nulas antes: {before_nulls} | después: {after_nulls}")

    # Duplicated rows
    before_dups = int(before.duplicated().sum())
    after_dups = int(after.duplicated().sum())
    print(f"- Filas duplicadas exactas antes: {before_dups} | después: {after_dups}")


def save_outputs(df: pd.DataFrame, *, output_dir: Path) -> tuple[Path, Path]:
    output_dir.mkdir(parents=True, exist_ok=True)

    out_xlsx = output_dir / "dataset_limpio.xlsx"
    out_csv = output_dir / "dataset_limpio.csv"

    # Save as Excel (preserves types better than CSV for timestamps)
    df.to_excel(out_xlsx, index=False)
    df.to_csv(out_csv, index=False, encoding="utf-8")

    return out_xlsx, out_csv


def main() -> None:
    print("Hojas encontradas en el Excel:")
    xls = pd.ExcelFile(EXCEL_PATH)
    for i, name in enumerate(xls.sheet_names):
        print(f"- [{i}] {name}")

    df = load_excel(EXCEL_PATH, sheet_name=0)

    # Report BEFORE cleaning
    report_structure(df, "ESTRUCTURA (ANTES)")
    report_columns(df, "COLUMNAS (ANTES)")
    report_nulls(df, "NULOS (ANTES)")
    report_dtypes(df, "DTYPES (ANTES)")
    report_duplicates(df, "DUPLICADOS (ANTES)")
    report_quality_signals(df, "SEÑALES DE CALIDAD (ANTES)")

    cfg = CleanConfig()
    cleaned, meta = clean_dataset(df, cfg)

    # Report AFTER cleaning
    report_structure(cleaned, "ESTRUCTURA (DESPUÉS)")
    report_nulls(cleaned, "NULOS (DESPUÉS)")
    report_dtypes(cleaned, "DTYPES (DESPUÉS)")
    report_duplicates(cleaned, "DUPLICADOS (DESPUÉS)")
    report_quality_signals(cleaned, "SEÑALES DE CALIDAD (DESPUÉS)")

    verify_cleaning(df, cleaned)

    out_xlsx, out_csv = save_outputs(cleaned, output_dir=OUTPUT_DIR)

    print("\n" + "=" * 80)
    print("SALIDA")
    print("=" * 80)
    print(f"- Excel limpio: {out_xlsx}")
    print(f"- CSV limpio:  {out_csv}")
    print(f"- Metadatos (resumen técnico): {meta}")


if __name__ == "__main__":
    main()
