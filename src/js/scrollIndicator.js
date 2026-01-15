export function initScrollIndicator(trackSelector, thumbSelector) {
  const track = document.querySelector(trackSelector);
  const thumb = document.querySelector(thumbSelector);
  if (!track || !thumb) return;

  function updateThumb() {
    const max = track.scrollWidth - track.clientWidth;
    const p = max > 0 ? track.scrollLeft / max : 0;

    const bar = thumb.parentElement;
    const travel = bar.clientWidth - thumb.clientWidth;

    thumb.style.transform = `translateX(${p * travel}px)`;
  }

  track.addEventListener('scroll', updateThumb, { passive: true });
  window.addEventListener('resize', updateThumb);
  updateThumb();
}
