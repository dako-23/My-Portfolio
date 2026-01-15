import { initScrollIndicator } from './ScrollIndicator.js';
import { enableMouseDragScroll } from './dragScroll.js';
import { enableThumbDrag } from './barScrub.js';


function initWhenReady() {
    const ok =
        document.querySelector(".skills-images") &&
        document.querySelector(".skills-bar") &&
        document.querySelector(".skills-thumb");

    if (!ok) return requestAnimationFrame(initWhenReady);

    initScrollIndicator(".skills-images", ".skills-thumb");
    enableMouseDragScroll('.skills-images');
    enableThumbDrag(".skills-images", ".skills-bar", ".skills-thumb");
}

initWhenReady();
document.addEventListener("astro:page-load", initWhenReady);

