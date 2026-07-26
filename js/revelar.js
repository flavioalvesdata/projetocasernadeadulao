/**
 * Revelação discreta ao rolar. Desliga com prefers-reduced-motion.
 */
(function () {
  function initRevelar() {
    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)");
    const alvos = Array.from(document.querySelectorAll("[data-revelar]"));
    if (!alvos.length) return;

    if (reduzido.matches || !("IntersectionObserver" in window)) {
      alvos.forEach((el) => el.classList.add("is-revelado"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revelado");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );

    alvos.forEach((el) => io.observe(el));
  }

  window.Caserna = window.Caserna || {};
  window.Caserna.initRevelar = initRevelar;
})();
