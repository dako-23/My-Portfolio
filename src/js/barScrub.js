export function enableThumbDrag(trackSel, barSel, thumbSel) {
  const track = document.querySelector(trackSel);
  const bar = document.querySelector(barSel);
  const thumb = document.querySelector(thumbSel);
  if (!track || !bar || !thumb) return;

  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

  const setByLeft = (left) => {
    const travel = bar.clientWidth - thumb.clientWidth;
    const p = travel > 0 ? clamp(left, 0, travel) / travel : 0;
    track.scrollLeft = p * (track.scrollWidth - track.clientWidth);
  };

  thumb.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    thumb.setPointerCapture(e.pointerId);
    bar.classList.add('dragging');

    const barLeft = bar.getBoundingClientRect().left;
    const grab = e.clientX - thumb.getBoundingClientRect().left;

    const onMove = (ev) => setByLeft(ev.clientX - barLeft - grab);
    const onUp = () => {
      bar.classList.remove('dragging');
      thumb.removeEventListener('pointermove', onMove);
      thumb.removeEventListener('pointerup', onUp);
      thumb.removeEventListener('pointercancel', onUp);
    };

    thumb.addEventListener('pointermove', onMove);
    thumb.addEventListener('pointerup', onUp);
    thumb.addEventListener('pointercancel', onUp);
  });
}
