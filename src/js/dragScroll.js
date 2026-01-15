export function enableMouseDragScroll(selector) {
    const el = document.querySelector(selector);
    if (!el) return;

    let isDown = false;
    let startX;
    let startScrollLeft;

    el.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX;
        startScrollLeft = el.scrollLeft;
        el.classList.add('dragging');
    });

    window.addEventListener('mouseup', () => {
        isDown = false;
        el.classList.remove('dragging');
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const walk = e.pageX - startX;
        el.scrollLeft = startScrollLeft - walk;
    });

    el.addEventListener('dragstart', (e) => e.preventDefault());
}
