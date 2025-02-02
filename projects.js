document.addEventListener('DOMContentLoaded', () => {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const projectCards = document.querySelectorAll('.card');

    // Add data-category attributes to your project cards in HTML
    // For example: <div class="card" data-category="ai-ml">

    function filterProjects(category) {
        projectCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.classList.remove('hidden');
                // Add animation
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.classList.add('hidden');
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
            }
        });
    }

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            // Filter projects
            filterProjects(button.dataset.category);
        });
    });

    // Scroll Arrow Functionality
    const scrollArrow = document.querySelector('.scroll-arrow');
    let isDragging = false;
    let startY;
    let scrollStartY;

    scrollArrow.addEventListener('mousedown', (e) => {
        isDragging = true;
        startY = e.pageY;
        scrollStartY = window.scrollY;
        document.body.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        const delta = e.pageY - startY;
        window.scrollTo(0, scrollStartY + delta);
    });

    document.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        document.body.style.cursor = 'auto';
        
        // Scroll to bio section when releasing the arrow
        document.querySelector('.bio-section').scrollIntoView({
            behavior: 'smooth'
        });
    });

    // Show/hide arrow based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > window.innerHeight) {
            scrollArrow.style.opacity = '0';
        } else {
            scrollArrow.style.opacity = '1';
        }
    });

    // Skill to project category mapping
    const skillToCategory = {
        'html5': 'fullstack',
        'css3': 'fullstack',
        'javascript': 'fullstack',
        'react': 'fullstack',
        'node.js': 'fullstack',
        'python': 'ai-ml',
        'aws': 'fullstack',
        'docker': 'embedded',
        'git': 'fullstack'
    };

    // Add click handlers to skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(skill => {
        skill.addEventListener('click', () => {
            // Get skill name from the span
            const skillName = skill.querySelector('.skill-name').textContent.toLowerCase();
            const category = skillToCategory[skillName];
            
            if (category) {
                // First scroll to projects section
                const projectsSection = document.querySelector('#projects');
                projectsSection.scrollIntoView({ behavior: 'smooth' });

                // Find and click the corresponding category button
                const categoryBtn = document.querySelector(`.category-btn[data-category="${category}"]`);
                if (categoryBtn) {
                    // Remove active class from all buttons
                    document.querySelectorAll('.category-btn').forEach(btn => {
                        btn.classList.remove('active');
                    });
                    
                    // Add active class to selected category
                    categoryBtn.classList.add('active');
                    
                    // Filter the projects
                    const projectCards = document.querySelectorAll('.card');
                    projectCards.forEach(card => {
                        if (category === 'all' || card.dataset.category === category) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                }
            }
        });

        // Add pointer cursor to indicate clickable
        skill.style.cursor = 'pointer';
    });
}); 