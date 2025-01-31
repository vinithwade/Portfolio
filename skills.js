document.addEventListener('DOMContentLoaded', () => {
    const skillsWrapper = document.querySelector('.skills-wrapper');
    const skillItems = document.querySelectorAll('.skill-item');
    let isDragging = false;
    let selectedItem = null;
    let startX = 0;
    let startY = 0;
    let velocity = { x: 0, y: 0 };
    let gravity = 0.3;
    let friction = 0.98;
    let bounce = 0.7;
    let rafId = null;

    // Function to duplicate skills for infinite loop
    function duplicateSkills() {
        skillItems.forEach(item => {
            const clone = item.cloneNode(true);
            skillsWrapper.appendChild(clone);
        });
    }

    // Create multiple sets for smoother infinite loop
    duplicateSkills();
    duplicateSkills();

    function applyPhysics(element, mouseX, mouseY) {
        let x = mouseX;
        let y = mouseY;
        
        // Initial velocity based on mouse movement
        velocity.x = (Math.random() - 0.5) * 30; // More dramatic initial movement
        velocity.y = -20 - Math.random() * 15; // Strong upward burst

        function animate() {
            if (!isDragging) return;

            // Apply physics
            velocity.y += gravity;
            velocity.x *= friction;
            velocity.y *= friction;

            // Add turbulence
            velocity.x += (Math.random() - 0.5) * 2;
            velocity.y += (Math.random() - 0.5) * 2;

            x += velocity.x;
            y += velocity.y;

            // Screen boundaries
            const bounds = element.getBoundingClientRect();
            if (x <= 0 || x >= window.innerWidth - bounds.width) {
                velocity.x *= -bounce;
                x = x <= 0 ? 0 : window.innerWidth - bounds.width;
            }
            if (y <= 0 || y >= window.innerHeight - bounds.height) {
                velocity.y *= -bounce;
                y = y <= 0 ? 0 : window.innerHeight - bounds.height;
            }

            // Calculate rotation based on movement
            const speed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
            const rotation = (Math.atan2(velocity.y, velocity.x) * 180 / Math.PI) + speed * 2;

            // Apply transforms
            element.style.position = 'fixed';
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;
            element.style.transform = `rotate(${rotation}deg) scale(1.2)`;
            element.style.zIndex = '1000';
            element.style.transition = 'transform 0.1s ease-out';

            rafId = requestAnimationFrame(animate);
        }

        animate();
    }

    // Handle mouse interactions for each skill item
    skillItems.forEach((item) => {
        item.addEventListener('mousedown', (e) => {
            e.preventDefault();
            isDragging = true;
            selectedItem = item;

            // Create a clone for physics animation
            const clone = item.cloneNode(true);
            document.body.appendChild(clone);
            clone.classList.add('floating');
            
            // Position clone at mouse position
            const rect = item.getBoundingClientRect();
            const mouseX = e.clientX - rect.width / 2;
            const mouseY = e.clientY - rect.height / 2;

            // Hide original
            item.style.opacity = '0';
            
            // Start physics
            applyPhysics(clone, mouseX, mouseY);
            
            // Pause the skills loop
            skillsWrapper.style.animationPlayState = 'paused';
        });
    });

    document.addEventListener('mouseup', () => {
        if (!isDragging || !selectedItem) return;
        
        cancelAnimationFrame(rafId);
        isDragging = false;

        // Remove floating clone with explosion effect
        const floatingElements = document.querySelectorAll('.skill-item.floating');
        floatingElements.forEach(element => {
            element.style.transition = 'all 0.3s ease-out';
            element.style.transform = 'scale(0)';
            element.style.opacity = '0';
            setTimeout(() => element.remove(), 300);
        });

        // Show original with bounce effect
        selectedItem.style.opacity = '1';
        selectedItem.style.transform = 'scale(1.2)';
        setTimeout(() => {
            selectedItem.style.transition = 'transform 0.3s ease-out';
            selectedItem.style.transform = 'scale(1)';
        }, 50);

        selectedItem = null;
        skillsWrapper.style.animationPlayState = 'running';
    });

    // Reset animation seamlessly
    skillsWrapper.addEventListener('animationend', () => {
        skillsWrapper.style.animation = 'none';
        skillsWrapper.offsetHeight;
        skillsWrapper.style.animation = 'slideLeft 20s linear infinite';
    });
}); 