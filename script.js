// Menu mobile
document.documentElement.classList.add("js");

const header = document.getElementById("site-header");
const toggle = document.querySelector(".nav__toggle");
const links = document.querySelector(".nav__links");

function isMenuOpen() {
    return header ? header.dataset.open === "true" : false;
}

function renderToggle() {
    if (!toggle) return;
    const open = isMenuOpen();
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", t(open ? "menu_close" : "menu_open"));
}

function setMenu(open) {
    if (!header || !toggle) return;
    header.dataset.open = String(open);
    renderToggle();
}

if (toggle) {
    toggle.addEventListener("click", () => {
        setMenu(!isMenuOpen());
    });
}

if (links) {
    links.addEventListener("click", (event) => {
        if (event.target.closest("a")) setMenu(false);
    });
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenu(false);
});

document.addEventListener("click", (event) => {
    if (!header || !isMenuOpen()) return;
    if (!header.contains(event.target)) setMenu(false);
});

// Mantém o rótulo do botão de menu no idioma atual
document.addEventListener("langchange", renderToggle);

// Animação de entrada
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealItems.length) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    revealItems.forEach((item) => observer.observe(item));
} else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
}

// Ano no rodapé
document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
});

// Formulário de contato: monta um email com o conteúdo
const form = document.querySelector("[data-contact-form]");

if (form) {
    const status = form.querySelector(".form__status");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!form.reportValidity()) return;

        const data = new FormData(form);
        const nome = String(data.get("nome") || "").trim();
        const email = String(data.get("email") || "").trim();
        const assunto = String(data.get("assunto") || "").trim();
        const mensagem = String(data.get("mensagem") || "").trim();

        const subject = encodeURIComponent(assunto || `${t("mail_subject_prefix")}${nome}`);
        const body = encodeURIComponent(
            `${mensagem}\n\n---\n${nome}\n${email}`
        );

        window.location.href = `mailto:contatobeldev@gmail.com?subject=${subject}&body=${body}`;

        if (status) {
            status.textContent = t("status_opening");
        }
    });
}
