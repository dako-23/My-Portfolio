(function () {
    function initScrollIndicator(trackSelector, thumbSelector) {
        const track = document.querySelector(trackSelector);
        const thumb = document.querySelector(thumbSelector);
        if (!track || !thumb) return;

        function update() {
            const max = track.scrollWidth - track.clientWidth;
            const p = max > 0 ? track.scrollLeft / max : 0;
            const bar = thumb.parentElement;
            const travel = bar.clientWidth - thumb.clientWidth;
            thumb.style.transform = `translateX(${p * travel}px)`;
        }

        track.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);
        update();
    }

    function enableThumbDrag(trackSel, barSel, thumbSel) {
        const track = document.querySelector(trackSel);
        const bar = document.querySelector(barSel);
        const thumb = document.querySelector(thumbSel);
        if (!track || !bar || !thumb) return;

        thumb.addEventListener("pointerdown", e => {
            thumb.setPointerCapture(e.pointerId);
            const barLeft = bar.getBoundingClientRect().left;
            const grab = e.clientX - thumb.getBoundingClientRect().left;

            function move(ev) {
                const travel = bar.clientWidth - thumb.clientWidth;
                const left = Math.min(Math.max(ev.clientX - barLeft - grab, 0), travel);
                track.scrollLeft = (left / travel) * (track.scrollWidth - track.clientWidth);
            }

            thumb.addEventListener("pointermove", move);
            thumb.addEventListener("pointerup", () => {
                thumb.removeEventListener("pointermove", move);
            }, { once: true });
        });
    }

    function init() {
        const ok =
            document.querySelector(".skills-images") &&
            document.querySelector(".skills-bar") &&
            document.querySelector(".skills-thumb");

        if (!ok) return requestAnimationFrame(init);

        initScrollIndicator(".skills-images", ".skills-thumb");
        enableThumbDrag(".skills-images", ".skills-bar", ".skills-thumb");
    }

    init();
})();
