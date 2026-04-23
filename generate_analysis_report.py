from __future__ import annotations

import re
from collections import Counter
from dataclasses import dataclass
from pathlib import Path

import pandas as pd
from pandas.api.types import is_numeric_dtype, is_string_dtype


DATA_PATH = Path("Document") / "dataset_limpio.xlsx"
REPORT_PATH = Path("Document") / "analisis_resultados.md"

# Aliases para comparar herramientas con nombres consistentes en el reporte.
# Ajusta aquí si en tu Excel aparecen variantes distintas.
TOOL_ALIASES = {
    "British Council Games": "Johnny Grammar",
    "british council games": "Johnny Grammar",
    "British Council": "Johnny Grammar",
}


SPANISH_STOPWORDS = {
    "a", "al", "algo", "como", "con", "contra", "cual", "cuando", "de", "del", "desde",
    "donde", "durante", "e", "el", "ella", "ellas", "ellos", "en", "entre", "era", "es",
    "esa", "ese", "eso", "esta", "estaba", "estas", "este", "esto", "estos", "fue",
    "ha", "han", "hay", "hasta", "la", "las", "le", "les", "lo", "los", "mas", "más",
    "me", "mi", "mis", "mucha", "mucho", "muy", "no", "nos", "o", "otra", "otro",
    "para", "pero", "por", "porque", "que", "qué", "se", "ser", "si", "sí", "sin",
    "sobre", "su", "sus", "tambien", "también", "te", "tiene", "tienen", "todo", "todos",
    "tu", "tus", "un", "una", "uno", "unos", "unas", "y", "ya",
}


# Agrupaciones "por dimensión" usando preguntas numéricas.
# Nota: algunas preguntas son de fricción (más alto = peor experiencia), se indica en el reporte.
DIMENSION_QUESTIONS: dict[str, list[str]] = {
    "Facilidad de uso (Q1, más alto = más fácil)": ["1. La herramienta fue fácil de usar"],
    "Complejidad percibida (Q3, más alto = más compleja)": ["3. La herramienta me pareció innecesariamente compleja."],
    "Inconsistencias (Q5, más alto = más inconsistencias)": ["5. Encontré inconsistencias en el funcionamiento de la herramienta."],
    "Apoyo al aprendizaje (Q7, más alto = mayor acuerdo)": ["7. Las actividades del juego me ayudaron a comprender mejor el contenido en inglés."],
    "Interés (Q9, más alto = más interesante)": ["9. El uso del juego hizo que la actividad fuera más interesante que una actividad tradicional de clase."],
    "Participación (Q11, más alto = más participación)": ["11. El juego facilitó mi participación durante la actividad."],
}


KEYWORD_GROUPS: dict[str, list[str]] = {
    "Accesibilidad/claridad (palabras)": [
        "claro", "claridad", "confuso", "comprender", "entender", "instrucciones", "leer", "texto",
        "audio", "sonido", "boton", "botón", "tamaño", "pantalla", "interfaz",
    ],
    "Interacción/errores (palabras)": [
        "error", "errores", "bug", "falla", "funciona", "funcionan", "boton", "botón", "clic",
        "lento", "carga", "traba", "congel", "crash",
    ],
}


@dataclass(frozen=True)
class BlockSpec:
    block_id: int
    tool_col: str
    question_cols: list[str]


def load_data(path: Path) -> pd.DataFrame:
    if not path.exists():
        raise FileNotFoundError(f"No encuentro el dataset limpio: {path.resolve()}")
    return pd.read_excel(path)


def build_block_specs(df: pd.DataFrame) -> list[BlockSpec]:
    """Infer blocks by column positions.

    Your dataset has:
    - Timestamp
    - Block 1: tool + 15 questions
    - Block 2: tool + 15 questions
    - Block 3: tool + 15 questions

    This method is robust even if a few columns have odd suffixes.
    """
    cols = list(df.columns)
    tool_positions = [i for i, c in enumerate(cols) if str(c).startswith("¿Qué herramienta estás evaluando?")]
    if len(tool_positions) != 3:
        raise ValueError(
            f"Esperaba 3 columnas de herramienta y encontré {len(tool_positions)}: {tool_positions}"
        )

    specs: list[BlockSpec] = []
    for idx, pos in enumerate(tool_positions, start=1):
        # Next tool start (or end)
        next_pos = tool_positions[idx] if idx < len(tool_positions) else len(cols)
        block_cols = cols[pos:next_pos]
        tool_col = block_cols[0]
        question_cols = block_cols[1:]
        if len(question_cols) != 15:
            raise ValueError(
                f"Bloque {idx} debería tener 15 preguntas; encontré {len(question_cols)}."
            )
        specs.append(BlockSpec(block_id=idx, tool_col=tool_col, question_cols=question_cols))

    return specs


def canonical_question_name(col: str) -> str:
    """Normalize question labels across blocks by removing trailing block suffixes."""
    s = str(col).strip()
    s = re.sub(r"\s+", " ", s)
    # Remove trailing ' 2' or ' 3' at end (common in exported sheets)
    s = re.sub(r"\s+[23]$", "", s)
    # Unify small wording variation for Q5 so it becomes a single column after reshape.
    s = s.replace(
        "5. Encontró inconsistencias en el funcionamiento de la herramienta.",
        "5. Encontré inconsistencias en el funcionamiento de la herramienta.",
    )
    return s


def to_long_format(df: pd.DataFrame, specs: list[BlockSpec]) -> pd.DataFrame:
    """Convert from wide blocks to long rows (one evaluation per row)."""
    base = df[["Marca temporal"]].copy()
    base["respondent_id"] = range(1, len(df) + 1)

    long_parts: list[pd.DataFrame] = []
    for spec in specs:
        part = pd.concat(
            [
                base,
                df[[spec.tool_col] + spec.question_cols].copy(),
            ],
            axis=1,
        )
        part = part.rename(columns={spec.tool_col: "herramienta"})
        # Canonicalize question names
        rename_map = {c: canonical_question_name(c) for c in spec.question_cols}
        part = part.rename(columns=rename_map)
        part["block_id"] = spec.block_id

        # Keep only rows where this block actually has a tool selected
        part = part[part["herramienta"].notna()].copy()
        long_parts.append(part)

    long_df = pd.concat(long_parts, ignore_index=True)

    # Ensure tool is string for grouping
    long_df["herramienta"] = long_df["herramienta"].astype("string")

    # Apply tool aliases for consistent comparisons
    tool_clean = long_df["herramienta"].str.strip()
    # Case-sensitive mapping first
    tool_mapped = tool_clean.map(TOOL_ALIASES)
    # Case-insensitive fallback
    tool_mapped_ci = tool_clean.str.casefold().map({k.casefold(): v for k, v in TOOL_ALIASES.items()})
    long_df["herramienta_original"] = tool_clean
    long_df["herramienta"] = tool_mapped.fillna(tool_mapped_ci).fillna(tool_clean)
    return long_df


def _escape_md(text: object) -> str:
    s = "" if text is None else str(text)
    return s.replace("|", "\\|")


def markdown_table(obj: pd.DataFrame | pd.Series) -> str:
    """Render a small DataFrame/Series as a Markdown table without external deps."""
    if isinstance(obj, pd.Series):
        df = obj.to_frame(name=obj.name or "valor")
    else:
        df = obj

    if df.empty:
        return "(sin datos)"

    df = df.copy()

    # Include index as first column
    index_name = df.index.name or ""
    headers = [index_name] + [str(c) for c in df.columns]

    rows = []
    for idx, row in df.iterrows():
        rows.append([idx, *row.tolist()])

    # Build Markdown
    out = []
    out.append("| " + " | ".join(_escape_md(h) for h in headers) + " |")
    out.append("| " + " | ".join(["---"] * len(headers)) + " |")
    for r in rows:
        out.append("| " + " | ".join(_escape_md(v) for v in r) + " |")
    return "\n".join(out)


def numeric_question_report(long_df: pd.DataFrame, question: str) -> dict[str, str]:
    s = long_df[question]
    s_num = pd.to_numeric(s, errors="coerce")

    freq = s_num.value_counts(dropna=True).sort_index().to_frame("frecuencia")
    freq["porcentaje"] = (freq["frecuencia"] / int(s_num.notna().sum()) * 100).round(1)

    desc = s_num.describe().to_frame(name="valor")

    means_by_tool = (
        long_df.assign(_q=s_num)
        .groupby("herramienta", dropna=True)["_q"]
        .agg(["count", "mean", "median", "std", "min", "max"])
        .round(3)
        .sort_values("count", ascending=False)
    )

    return {
        "freq": markdown_table(freq),
        "desc": markdown_table(desc),
        "means_by_tool": markdown_table(means_by_tool),
    }


def text_question_report(long_df: pd.DataFrame, question: str, top_n: int = 12) -> dict[str, str]:
    s = long_df[question].astype("string")
    non_null = s.notna().sum()

    # length distribution (characters) as a proxy for "how much people wrote"
    lengths = s.dropna().str.len()
    length_desc = lengths.describe().to_frame(name="valor").round(2)

    # Tokenization for common themes (aggregated; does not show raw responses)
    tokens = []
    for txt in s.dropna().tolist():
        t = str(txt).casefold()
        t = re.sub(r"[^\w\sáéíóúüñ]", " ", t)
        t = re.sub(r"\d+", " ", t)
        t = re.sub(r"\s+", " ", t).strip()
        if not t:
            continue
        for w in t.split():
            if len(w) < 3:
                continue
            if w in SPANISH_STOPWORDS:
                continue
            tokens.append(w)

    top_words = Counter(tokens).most_common(top_n)
    top_words_df = pd.DataFrame(top_words, columns=["palabra", "frecuencia"]).set_index("palabra")

    # By tool (top words)
    by_tool_rows = []
    for tool, sub in long_df[["herramienta", question]].dropna().groupby("herramienta"):
        tool_tokens = []
        for txt in sub[question].astype("string").dropna().tolist():
            t = str(txt).casefold()
            t = re.sub(r"[^\w\sáéíóúüñ]", " ", t)
            t = re.sub(r"\d+", " ", t)
            t = re.sub(r"\s+", " ", t).strip()
            for w in t.split():
                if len(w) < 3 or w in SPANISH_STOPWORDS:
                    continue
                tool_tokens.append(w)
        for word, cnt in Counter(tool_tokens).most_common(8):
            by_tool_rows.append({"herramienta": str(tool), "palabra": word, "frecuencia": cnt})

    by_tool_df = pd.DataFrame(by_tool_rows)
    if not by_tool_df.empty:
        by_tool_pivot = (
            by_tool_df.pivot_table(index="palabra", columns="herramienta", values="frecuencia", fill_value=0)
            .sort_values(by=by_tool_df["herramienta"].unique().tolist(), ascending=False)
        )
    else:
        by_tool_pivot = pd.DataFrame()

    return {
        "non_null": str(int(non_null)),
        "length_desc": markdown_table(length_desc),
        "top_words": markdown_table(top_words_df),
        "top_words_by_tool": markdown_table(by_tool_pivot),
    }


def keyword_counts_by_tool(long_df: pd.DataFrame, text_questions: list[str]) -> pd.DataFrame:
    """Count occurrences of keyword groups across ALL text questions (aggregated).

    Produces a descriptive table; does not show individual responses.
    """
    if not text_questions:
        return pd.DataFrame()

    # Concatenate all text fields per row
    text_frame = long_df[["herramienta"] + text_questions].copy()
    for c in text_questions:
        text_frame[c] = text_frame[c].astype("string")

    joined = text_frame[text_questions].fillna("").agg(" ".join, axis=1)
    joined = joined.astype("string").str.casefold()

    # Normalize punctuation lightly
    joined = joined.str.replace(r"[^\w\sáéíóúüñ]", " ", regex=True)
    joined = joined.str.replace(r"\s+", " ", regex=True).str.strip()

    rows = []
    for tool, idxs in text_frame.groupby("herramienta").groups.items():
        blob = " ".join(joined.loc[list(idxs)].tolist())
        for group_name, kws in KEYWORD_GROUPS.items():
            count = 0
            for kw in kws:
                kw_norm = str(kw).casefold()
                # Simple whole-word-ish count
                count += len(re.findall(rf"\b{re.escape(kw_norm)}\b", blob))
            rows.append({"herramienta": str(tool), "grupo": group_name, "conteo": count})

    out = pd.DataFrame(rows)
    if out.empty:
        return out
    return out.pivot_table(index="grupo", columns="herramienta", values="conteo", fill_value=0)


def write_report(df: pd.DataFrame, long_df: pd.DataFrame, specs: list[BlockSpec], out_path: Path) -> None:
    # Identify question columns in long_df (exclude meta)
    meta_cols = {"Marca temporal", "respondent_id", "herramienta", "herramienta_original", "block_id"}
    question_cols = [c for c in long_df.columns if c not in meta_cols]

    numeric_questions = [c for c in question_cols if is_numeric_dtype(long_df[c])]
    text_questions = [c for c in question_cols if is_string_dtype(long_df[c].dtype)]

    lines: list[str] = []

    lines.append("# Análisis descriptivo de la encuesta (usabilidad y accesibilidad)\n")
    lines.append(
        "Este reporte es **descriptivo**: resume frecuencias, distribuciones y promedios. "
        "No propone soluciones, no define requerimientos y no incluye conclusiones finales del sistema.\n"
    )

    lines.append("## Paso 1 — Cargar el dataset limpio\n")
    lines.append("Código:\n")
    lines.append("```python\nimport pandas as pd\nfrom pathlib import Path\n\npath = Path('Document') / 'dataset_limpio.xlsx'\ndf = pd.read_excel(path)\n```\n")
    lines.append("Qué hace cada línea:\n")
    lines.append("- Importa pandas y Path para manejar datos y rutas.")
    lines.append("- Lee el Excel limpio y lo guarda en `df` (tabla en memoria).\n")

    lines.append("## Paso 2 — Entender la estructura (3 bloques por persona)\n")
    lines.append(
        "Este archivo tiene **3 bloques** repetidos: cada bloque comienza con “¿Qué herramienta estás evaluando?” "
        "y luego vienen 15 preguntas. Para comparar herramientas, conviene convertirlo a formato **largo**: "
        "1 fila = 1 evaluación de 1 herramienta.\n"
    )

    # Coverage / counts
    lines.append("### Cobertura del dataset\n")
    lines.append(f"- Respuestas originales (filas): **{df.shape[0]}**\n")
    lines.append(f"- Evaluaciones en formato largo (filas): **{long_df.shape[0]}**\n")

    # Show original labels found (before aliasing)
    detected = long_df["herramienta_original"].value_counts(dropna=True).to_frame("evaluaciones")
    lines.append("Etiquetas de herramienta detectadas en el archivo (originales):\n")
    lines.append(markdown_table(detected) + "\n")

    count_by_tool = long_df["herramienta"].value_counts(dropna=True).to_frame("evaluaciones")
    lines.append("Evaluaciones por herramienta:\n")
    lines.append(markdown_table(count_by_tool) + "\n")

    if (detected.index != count_by_tool.index).any() or (detected.shape != count_by_tool.shape):
        lines.append(
            "Nota: para facilitar la comparación, se aplicaron aliases a nombres de herramienta "
            "(por ejemplo, 'British Council Games' → 'Johnny Grammar'). Ajustable en TOOL_ALIASES.\n"
        )

    lines.append("## Paso 3 — Frecuencias, distribución y promedios (preguntas numéricas)\n")
    lines.append(
        "En preguntas con escala numérica (por ejemplo 1–5), se reporta:\n"
        "- **Frecuencia**: cuántas veces aparece cada valor\n"
        "- **Distribución**: resumen estadístico (min/mediana/max, etc.)\n"
        "- **Promedio**: media (y comparación por herramienta)\n"
    )

    for q in numeric_questions:
        lines.append(f"### {q}\n")
        rep = numeric_question_report(long_df, q)
        lines.append("Frecuencia (global):\n")
        lines.append(rep["freq"] + "\n")
        lines.append("Distribución (global):\n")
        lines.append(rep["desc"] + "\n")
        lines.append("Resumen por herramienta (count/mean/median/std/min/max):\n")
        lines.append(rep["means_by_tool"] + "\n")

    # Comparison table of means for all numeric questions
    lines.append("## Paso 4 — Comparación entre herramientas (resumen)\n")
    lines.append(
        "Tabla de promedios por herramienta para **todas** las preguntas numéricas. "
        "Útil para comparar tendencias generales sin interpretar texto.\n"
    )

    means_matrix = (
        long_df.groupby("herramienta")[numeric_questions]
        .mean(numeric_only=True)
        .round(3)
        .T
    )
    lines.append(markdown_table(means_matrix) + "\n")

    lines.append("## Paso 4.1 — Patrones por dimensión (agrupación de preguntas numéricas)\n")
    lines.append(
        "Esta sección agrupa preguntas en dimensiones para facilitar la lectura. "
        "Es un resumen **descriptivo**; no implica causalidad ni recomendaciones.\n"
    )

    # Build dimension table (mean per tool per dimension)
    dim_rows = {}
    for dim_name, qs in DIMENSION_QUESTIONS.items():
        available = [q for q in qs if q in long_df.columns and is_numeric_dtype(long_df[q])]
        if not available:
            continue
        dim_rows[dim_name] = long_df.groupby("herramienta")[available].mean(numeric_only=True).mean(axis=1)

    if dim_rows:
        dim_df = pd.DataFrame(dim_rows).round(3).T
        lines.append(markdown_table(dim_df) + "\n")
    else:
        lines.append("(No se pudieron calcular dimensiones: no se detectaron columnas numéricas esperadas.)\n")

    lines.append("## Paso 5 — Preguntas abiertas (texto): cómo analizarlas sin leer caso por caso\n")
    lines.append(
        "Para respuestas abiertas, aquí se usa un enfoque **agregado** (sin mostrar respuestas individuales):\n"
        "- Conteo de respuestas no vacías\n"
        "- Distribución de longitud (aprox. cuánto escriben)\n"
        "- Palabras más frecuentes (quitando stopwords comunes)\n"
        "- Palabras más frecuentes por herramienta\n"
    )

    # Keyword group summary across ALL text questions
    kw_summary = keyword_counts_by_tool(long_df, text_questions)
    if not kw_summary.empty:
        lines.append("\n### Resumen agregado de palabras clave (todas las respuestas abiertas)\n")
        lines.append(
            "Conteo de palabras clave por herramienta (sirve como indicador descriptivo de temas mencionados).\n"
        )
        lines.append(markdown_table(kw_summary) + "\n")

    for q in text_questions:
        lines.append(f"### {q}\n")
        rep = text_question_report(long_df, q)
        lines.append(f"- Respuestas no nulas (en formato largo): **{rep['non_null']}**\n")
        lines.append("Distribución de longitud (caracteres):\n")
        lines.append(rep["length_desc"] + "\n")
        lines.append("Palabras más frecuentes (global):\n")
        lines.append(rep["top_words"] + "\n")
        lines.append("Palabras más frecuentes por herramienta (tabla):\n")
        lines.append(rep["top_words_by_tool"] + "\n")

    lines.append("## Paso 6 — Verificación rápida (consistencia)\n")
    lines.append(
        "Checks recomendados para confirmar que el análisis es consistente:\n"
        "- No hay duplicados exactos\n"
        "- Los nulos son esperables en preguntas abiertas\n"
        "- Los valores numéricos caen dentro del rango esperado (ej. 1–5)\n"
    )

    dup_exact = int(long_df.duplicated().sum())
    null_total = int(long_df.isna().sum().sum())
    lines.append(f"- Filas duplicadas exactas (formato largo): **{dup_exact}**\n")
    lines.append(f"- Total de celdas nulas (formato largo): **{null_total}**\n")

    out_path.write_text("\n".join(lines), encoding="utf-8")


def main() -> None:
    df = load_data(DATA_PATH)
    specs = build_block_specs(df)
    long_df = to_long_format(df, specs)

    # Ensure text columns are string dtype (helps consistent reporting)
    for c in long_df.columns:
        if is_string_dtype(long_df[c].dtype):
            long_df[c] = long_df[c].astype("string")

    write_report(df, long_df, specs, REPORT_PATH)
    print(f"Reporte generado: {REPORT_PATH}")


if __name__ == "__main__":
    main()
