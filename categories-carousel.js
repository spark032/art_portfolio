document.querySelectorAll('.categories-page .gallery-section').forEach((section) => {
    const track = section.querySelector('.all-photo-grid');
    if (!track) return;

    const projects = [...track.querySelectorAll('.all-photo-item')];
    const projectsPerPage = 3;
    const pageCount = Math.ceil(projects.length / projectsPerPage);

    while (track.children.length < pageCount * projectsPerPage) {
        const spacer = document.createElement('div');
        spacer.className = 'category-carousel-spacer';
        spacer.setAttribute('aria-hidden', 'true');
        track.appendChild(spacer);
    }

    const carousel = document.createElement('div');
    carousel.className = 'category-carousel';
    track.parentNode.insertBefore(carousel, track);
    carousel.appendChild(track);
    track.classList.add('category-carousel-track');

    const previousButton = document.createElement('button');
    previousButton.className = 'category-carousel-arrow category-carousel-previous';
    previousButton.type = 'button';
    previousButton.setAttribute('aria-label', `Show previous ${section.querySelector('h2').textContent} projects`);
    previousButton.textContent = '‹';

    const nextButton = document.createElement('button');
    nextButton.className = 'category-carousel-arrow category-carousel-next';
    nextButton.type = 'button';
    nextButton.setAttribute('aria-label', `Show next ${section.querySelector('h2').textContent} projects`);
    nextButton.textContent = '›';

    carousel.append(previousButton, nextButton);

    let currentPage = 0;
    const updateCarousel = () => {
        track.scrollTo({ left: track.clientWidth * currentPage, behavior: 'smooth' });
        previousButton.disabled = currentPage === 0;
        nextButton.disabled = currentPage === pageCount - 1;
    };

    previousButton.addEventListener('click', () => {
        currentPage = Math.max(0, currentPage - 1);
        updateCarousel();
    });

    nextButton.addEventListener('click', () => {
        currentPage = Math.min(pageCount - 1, currentPage + 1);
        updateCarousel();
    });

    window.addEventListener('resize', () => {
        track.scrollLeft = track.clientWidth * currentPage;
    });

    updateCarousel();
});
