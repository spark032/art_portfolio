document.addEventListener('DOMContentLoaded', () => {
    const scrollContainer = document.querySelector('.horizontal-scroll-section .scroll-container');
    const scrollContent = document.querySelector('.horizontal-scroll-section .scroll-content');
  
    // Only run if the horizontal scroll elements exist
    if (!scrollContainer || !scrollContent) {
        return;
    }
  
    // Clone scroll-content to create an infinite loop
    const clone = scrollContent.cloneNode(true);
    scrollContainer.appendChild(clone);
  
    let scrollSpeed = 0.73; // pixels per frame
    let isPaused = false;
  
    function scrollLoop() {
      if (!isPaused) {
        scrollContainer.scrollLeft += scrollSpeed;
  
        // Reset scroll to start when scrolled past original width
        if (scrollContainer.scrollLeft >= scrollContent.scrollWidth) {
          scrollContainer.scrollLeft = 0;
        }
      }
      requestAnimationFrame(scrollLoop);
    }
  
    // Start loop
    requestAnimationFrame(scrollLoop);
  
    // Pause on hover
    scrollContainer.addEventListener('mouseover', e => {
      if (e.target.closest('.image-container')) {
        isPaused = true;
      }
    });
  
    scrollContainer.addEventListener('mouseout', e => {
      if (e.target.closest('.image-container')) {
        isPaused = false;
      }
    });
  });
  