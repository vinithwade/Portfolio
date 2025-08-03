// Experience Journey Animations - Professional & Clean
document.addEventListener('DOMContentLoaded', function() {
    // Set first node as active
    const experienceNodes = document.querySelectorAll('.experience-node');
    const timelineDots = document.querySelectorAll('.node-dot');
    const statNumbers = document.querySelectorAll('.stat-number');
    const journeyLine = document.querySelector('.journey-line');
    
    if (experienceNodes.length > 0 && !experienceNodes[0].classList.contains('active')) {
        experienceNodes[0].classList.add('active');
        if (experienceNodes[0].querySelector('.node-dot')) {
            experienceNodes[0].querySelector('.node-dot').classList.add('active');
        }
    }
    
    // Add interactions for experience nodes
    experienceNodes.forEach((node, index) => {
        const skillTags = node.querySelectorAll('.skill-tag');
        const nodeContent = node.querySelector('.experience-content');
        const nodeDot = node.querySelector('.node-dot');
        
        // Add staggered animation for skill tags
        skillTags.forEach((tag, tagIndex) => {
            tag.style.transition = `all 0.3s ease ${tagIndex * 0.05}s`;
            
            // Add hover effect for skill tags - more subtle and professional
            tag.addEventListener('mouseenter', () => {
                tag.style.transform = 'translateY(-2px)';
                tag.style.backgroundColor = 'rgba(74, 0, 224, 0.1)';
                tag.style.borderColor = 'var(--accent-color)';
                tag.style.color = 'var(--accent-color)';
            });
            
            tag.addEventListener('mouseleave', () => {
                tag.style.transform = 'translateY(0)';
                tag.style.backgroundColor = 'rgba(50, 50, 50, 0.6)';
                tag.style.borderColor = 'transparent';
                tag.style.color = 'var(--secondary-text-color)';
            });
        });
        
        // Node click event to set active state
        node.addEventListener('click', () => {
            // Only update if not already active (prevents unnecessary reflows)
            if (!node.classList.contains('active')) {
                // Remove active class from all nodes
                experienceNodes.forEach(n => {
                    n.classList.remove('active');
                    if (n.querySelector('.node-dot')) {
                        n.querySelector('.node-dot').classList.remove('active');
                    }
                });
                
                // Add active class to clicked node
                node.classList.add('active');
                if (nodeDot) {
                    nodeDot.classList.add('active');
                }
                
                // Smooth scroll to the node
                node.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
        
        // Mouse enter/leave effects - more subtle
        node.addEventListener('mouseenter', () => {
            if (nodeDot) nodeDot.style.transform = 'scale(1.1)';
            if (nodeContent) {
                nodeContent.style.transform = 'translateY(-3px)';
                nodeContent.style.borderColor = 'var(--accent-color)';
                nodeContent.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
            }
        });
        
        node.addEventListener('mouseleave', () => {
            if (nodeDot) nodeDot.style.transform = 'scale(1)';
            if (nodeContent) {
                nodeContent.style.transform = 'translateY(0)';
                nodeContent.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                nodeContent.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
            }
        });
    });
    
    // Journey end animation
    const journeyEnd = document.querySelector('.journey-end');
    if (journeyEnd) {
        journeyEnd.addEventListener('mouseenter', () => {
            journeyEnd.style.transform = 'scale(1.03)';
        });
        
        journeyEnd.addEventListener('mouseleave', () => {
            journeyEnd.style.transform = 'scale(1)';
        });
    }
    
    // Animate stat numbers when they come into view
    const animateStats = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const value = target.getAttribute('data-count') || target.innerText;
                    const numValue = parseInt(value);
                    let count = 0;
                    
                    const interval = setInterval(() => {
                        if (count < numValue) {
                            count += Math.ceil(numValue / 30); // Faster animation
                            if (count > numValue) count = numValue;
                            target.innerText = count + '+';
                        } else {
                            clearInterval(interval);
                        }
                    }, 40);
                    
                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    };
    
    // Animate journey stats circles with more subtle animation
    const journeyStats = document.querySelectorAll('.journey-stat');
    journeyStats.forEach((stat, index) => {
        stat.style.animationDelay = `${index * 0.15}s`; // Slightly faster
        stat.style.opacity = '0';
        stat.style.transform = 'translateY(15px)';
        
        setTimeout(() => {
            stat.style.transition = 'all 0.6s ease';
            stat.style.opacity = '1';
            stat.style.transform = 'translateY(0)';
        }, 200 + index * 150);
    });
    
    // Animate experience nodes on scroll with subtle fade-in
    const animateNodes = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const node = entry.target;
                    node.style.opacity = '1';
                    node.style.transform = 'translateX(0)';
                    observer.unobserve(node);
                }
            });
        }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });
        
        experienceNodes.forEach(node => {
            node.style.opacity = '0.7';
            node.style.transform = 'translateX(-10px)';
            node.style.transition = 'all 0.6s ease';
            observer.observe(node);
        });
    };
    
    // Run animations
    animateStats();
    animateNodes();
    
    // Responsive adjustments
    const handleResize = () => {
        const windowWidth = window.innerWidth;
        experienceNodes.forEach(node => {
            if (windowWidth <= 576) {
                node.style.marginBottom = '2.5rem';
            } else if (windowWidth <= 768) {
                node.style.marginBottom = '3rem';
            } else {
                node.style.marginBottom = '3.5rem';
            }
        });
    };
    
    // Initial call and event listener
    handleResize();
    window.addEventListener('resize', handleResize);
});