document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.experience-slider');
    const sliderDots = document.querySelectorAll('.slider-dot');
    const experienceImages = document.querySelectorAll('.experience-image');
    const experienceEntries = document.querySelectorAll('.experience-entry');
    let currentIndex = 0;
    let startX = 0;
    let isDragging = false;

    function updateSlider(index) {
        // Update dots
        sliderDots.forEach(dot => dot.classList.remove('active'));
        sliderDots[index].classList.add('active');

        // Update images with slide animation
        experienceImages.forEach(img => {
            img.classList.remove('active');
            img.style.opacity = '0';
            img.style.transform = 'translateX(100%)';
        });
        experienceImages[index].classList.add('active');
        experienceImages[index].style.opacity = '1';
        experienceImages[index].style.transform = 'translateX(0)';

        // Update experience details
        experienceEntries.forEach(entry => entry.classList.remove('active'));
        experienceEntries[index].classList.add('active');

        currentIndex = index;
    }

    // Touch and mouse events
    slider.addEventListener('mousedown', startDragging);
    slider.addEventListener('touchstart', (e) => startDragging(e.touches[0]));
    
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', (e) => drag(e.touches[0]));
    
    document.addEventListener('mouseup', endDragging);
    document.addEventListener('touchend', endDragging);

    function startDragging(e) {
        isDragging = true;
        startX = e.pageX || e.clientX;
        slider.style.cursor = 'grabbing';
    }

    function drag(e) {
        if (!isDragging) return;
        e.preventDefault();
        
        const currentX = e.pageX || e.clientX;
        const diff = startX - currentX;
        
        // Determine direction and threshold
        if (Math.abs(diff) > 50) {
            if (diff > 0 && currentIndex < sliderDots.length - 1) {
                // Slide left - next image
                updateSlider(currentIndex + 1);
                endDragging();
            } else if (diff < 0 && currentIndex > 0) {
                // Slide right - previous image
                updateSlider(currentIndex - 1);
                endDragging();
            }
        }
    }

    function endDragging() {
        isDragging = false;
        slider.style.cursor = 'grab';
    }

    // Click handlers for dots
    sliderDots.forEach((dot, index) => {
        dot.addEventListener('click', () => updateSlider(index));
    });

    // Auto-slide every 5 seconds
    let autoSlideInterval = setInterval(nextSlide, 5000);

    function nextSlide() {
        const nextIndex = (currentIndex + 1) % sliderDots.length;
        updateSlider(nextIndex);
    }

    // Pause auto-slide on interaction
    slider.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    slider.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(nextSlide, 5000);
    });
}); 