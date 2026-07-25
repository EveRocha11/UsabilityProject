document.addEventListener("DOMContentLoaded", () => {
    // ── Auth guard ──
    const currentEmail = localStorage.getItem('nivela_current_email');
    if (!currentEmail) {
        globalThis.location.href = 'login.html';
        return;
    }
    const accounts = JSON.parse(localStorage.getItem('nivela_accounts') || '[]');
    const user = accounts.find(a => a.email.toLowerCase() === currentEmail.toLowerCase());
    if (!user) {
        globalThis.location.href = 'login.html';
        return;
    }

    const editBtn = document.querySelector(".profile-edit-btn");
    const passwordToggle = document.querySelector(".profile-password-toggle");

    const nameInput = document.getElementById("profile-name");
    const emailInput = document.getElementById("profile-email");
    const passwordInput = document.getElementById("profile-password");
    const eyeIcon = passwordToggle ? passwordToggle.querySelector("img") : null;

    // Estado para saber si el "Modo Edición" está activo en la página
    let isEditMode = false;

    // ── Load User Data ──
    const resetInputs = () => {
        if (nameInput) {
            nameInput.value = user.name + (user.lastname ? ' ' + user.lastname : '');
        }
        if (emailInput) {
            emailInput.value = user.email;
        }
        if (passwordInput) {
            passwordInput.value = user.password || '';
        }
    };
    resetInputs();

    // Set header avatar initial
    const headerAvatar = document.querySelector(".avatar");
    if (headerAvatar && user.name) {
        headerAvatar.textContent = user.name[0].toUpperCase();
    }

    // ── Load Progress Data ──
    const progressKey = `nivela_progress_${currentEmail}`;
    const p = JSON.parse(localStorage.getItem(progressKey) || '{}');
    if (!p.units) {
        p.units = {
            1: { complete: false, lessons: [false, false, false] },
            2: { complete: false, lessons: [false, false, false] },
            3: { complete: false, lessons: [false, false, false] },
            4: { complete: false, lessons: [false, false, false] },
        };
    }
    if (!p.points) p.points = 0;

    // Set total score
    const scoreValue = document.querySelector(".score-value");
    const scoreCard = document.querySelector(".score-card");
    if (scoreValue) {
        scoreValue.textContent = p.points + ' P';
    }
    if (scoreCard) {
        scoreCard.setAttribute("aria-label", "Total Score: " + p.points + " points");
    }

    // Calculate current unit ID
    let currentUnitId = 1;
    for (let id = 1; id <= 4; id++) {
        if (p.units[id] && !p.units[id].complete) {
            currentUnitId = id;
            break;
        }
        if (id === 4) {
            currentUnitId = 4;
        }
    }

    // Progress in current unit
    const unitData = p.units[currentUnitId];
    const done = unitData ? unitData.lessons.filter(Boolean).length : 0;
    const pct = Math.round((done / 3) * 100);

    // Update current unit UI elements
    const unitIndexEl = document.querySelector(".current-unit-index");
    if (unitIndexEl) {
        unitIndexEl.textContent = currentUnitId;
    }

    const progressTrackEl = document.querySelector(".current-unit-track");
    const progressFillEl = document.querySelector(".current-unit-track .progress-fill");
    if (progressFillEl) {
        progressFillEl.style.width = pct + '%';
    }
    if (progressTrackEl) {
        progressTrackEl.setAttribute('aria-valuenow', pct);
        progressTrackEl.setAttribute('aria-label', `Current unit progress: ${pct}%`);
    }

    const scaleSpans = document.querySelectorAll(".current-unit-scale span");
    if (scaleSpans && scaleSpans.length >= 2) {
        scaleSpans[0].textContent = 'U' + currentUnitId;
        if (currentUnitId < 4) {
            scaleSpans[1].textContent = 'U' + (currentUnitId + 1);
        } else {
            scaleSpans[1].textContent = 'Done';
        }
    }

    // ── Edit Actions ──
    if (editBtn) {
        editBtn.addEventListener("click", () => {
            isEditMode = true;

            // 1. Quitamos el readonly a Name y Email para que se puedan editar
            nameInput.removeAttribute("readonly");
            emailInput.removeAttribute("readonly");

            // Opcional: Le da foco visual al primer input para comodidad del usuario
            nameInput.focus();

            // Añadimos una clase visual opcional al contenedor por si quieres darle estilos en CSS
            document.querySelector(".perfil-page").classList.add("profile-edit-page");
        });
    }

    if (passwordToggle && passwordInput) {
        passwordToggle.addEventListener("click", () => {
            // 2. Comportamiento del Ojo
            if (passwordInput.type === "password") {
                passwordInput.type = "text";
                if (eyeIcon) eyeIcon.src = "../assets/img/eye-open.svg";

                // SI EL MODO EDICIÓN ESTÁ ACTIVO: Al ver la contraseña también permitimos editarla
                if (isEditMode) {
                    passwordInput.removeAttribute("readonly");
                }
            } else {
                passwordInput.type = "password";
                if (eyeIcon) eyeIcon.src = "../assets/img/eye-slash.svg";

                // Al ocultarla, se vuelve a bloquear por seguridad
                passwordInput.setAttribute("readonly", true);
            }
        });
    }

    // 3. Comportamiento de los botones Confirmar / Cancelar (Vuelven al modo lectura)
    const cancelBtn = document.querySelector(".profile-action-secondary");
    const confirmBtn = document.querySelector(".profile-action-primary");

    const desativarEdicion = () => {
        isEditMode = false;

        // Bloqueamos todos los inputs otra vez
        nameInput.setAttribute("readonly", true);
        emailInput.setAttribute("readonly", true);
        passwordInput.setAttribute("readonly", true);

        // Forzamos a que la contraseña se oculte por seguridad al terminar
        passwordInput.type = "password";
        if (eyeIcon) eyeIcon.src = "../assets/img/eye-slash.svg";

        document.querySelector(".perfil-page").classList.remove("profile-edit-page");
    };

    if (cancelBtn) {
        cancelBtn.addEventListener("click", () => {
            resetInputs();
            desativarEdicion();
        });
    }

    if (confirmBtn) {
        confirmBtn.addEventListener("click", () => {
            if (!isEditMode) {
                desativarEdicion();
                return;
            }

            const newNameFull = nameInput.value.trim();
            const newEmail = emailInput.value.trim();
            const newPassword = passwordInput.value;

            // Validation
            if (!newNameFull) {
                alert("Name cannot be empty.");
                return;
            }
            if (!newEmail) {
                alert("Email cannot be empty.");
                return;
            }
            const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            if (!validateEmail(newEmail)) {
                alert("Please enter a valid email address.");
                return;
            }
            if (!newPassword || newPassword.length < 8) {
                alert("Password must be at least 8 characters long.");
                return;
            }

            const emailChanged = newEmail.toLowerCase() !== user.email.toLowerCase();
            if (emailChanged) {
                const accountsList = JSON.parse(localStorage.getItem('nivela_accounts') || '[]');
                const duplicate = accountsList.some(a => a.email.toLowerCase() === newEmail.toLowerCase());
                if (duplicate) {
                    alert("This email is already registered by another account.");
                    return;
                }
            }

            // Split name and lastname
            const parts = newNameFull.split(/\s+/);
            const firstName = parts[0] || '';
            const lastName = parts.slice(1).join(' ') || '';

            // Update in array
            const accountsList = JSON.parse(localStorage.getItem('nivela_accounts') || '[]');
            const idx = accountsList.findIndex(a => a.email.toLowerCase() === currentEmail.toLowerCase());
            if (idx !== -1) {
                accountsList[idx].name = firstName;
                accountsList[idx].lastname = lastName;
                accountsList[idx].email = newEmail;
                accountsList[idx].password = newPassword;
                localStorage.setItem('nivela_accounts', JSON.stringify(accountsList));

                user.name = firstName;
                user.lastname = lastName;
                user.email = newEmail;
                user.password = newPassword;
            }

            if (emailChanged) {
                const oldProgressKey = `nivela_progress_${currentEmail}`;
                const newProgressKey = `nivela_progress_${newEmail}`;
                const progressData = localStorage.getItem(oldProgressKey);
                if (progressData) {
                    localStorage.setItem(newProgressKey, progressData);
                    localStorage.removeItem(oldProgressKey);
                }

                localStorage.setItem('nivela_current_email', newEmail);
                location.reload();
                return;
            }

            // Update header avatar if name changes
            if (headerAvatar && user.name) {
                headerAvatar.textContent = user.name[0].toUpperCase();
            }

            desativarEdicion();
        });
    }

    // ── Start button click ──
    const startBtn = document.querySelector(".current-unit-start");
    if (startBtn) {
        startBtn.addEventListener("click", () => {
            globalThis.location.href = `unit-available.html?id=${currentUnitId}`;
        });
    }
});