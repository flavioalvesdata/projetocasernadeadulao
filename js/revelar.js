/**
 * Entrada suave de blocos ao entrar no viewport.
 * Progressivo: sem JS o conteúdo já está legível no HTML.
 */
(function () {
  function initRevelar() {
    const reduzMovimento = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const alvos = Array.from(document.querySelectorAll(".revelar"));
    if (!alvos.length) return;

    if (reduzMovimento || !("IntersectionObserver" in window)) {
      alvos.forEach((el) => el.classList.add("revelar--visivel"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revelar--visivel");
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );

    alvos.forEach((el) => observer.observe(el));
  }

  window.Caserna = window.Caserna || {};
  window.Caserna.initRevelar = initRevelar;
})();
