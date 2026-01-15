import { initScrollIndicator } from './ScrollIndicator.js';
import { enableMouseDragScroll } from './dragScroll.js';
import { enableThumbDrag } from './barScrub.js';

document.addEventListener('DOMContentLoaded', () => {
    initScrollIndicator('.skills-images', '.skills-thumb');
    enableMouseDragScroll('.skills-images');
    enableThumbDrag('.skills-images', '.skills-bar', '.skills-thumb')
});
