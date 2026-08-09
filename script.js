document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const navLinks = document.querySelectorAll('.nav-submenu a');
    const sections = document.querySelectorAll('.grammar-section');
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    // Toggle Mobile Menu
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            if (mobileOverlay) mobileOverlay.classList.toggle('active');
        });
    }

    // Close menu when clicking overlay
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', () => {
            sidebar.classList.remove('open');
            mobileOverlay.classList.remove('active');
        });
    }

    // Close menu when clicking a link (mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768 && sidebar) {
                sidebar.classList.remove('open');
                if (mobileOverlay) mobileOverlay.classList.remove('active');
            }
        });
    });

    // Accordion Logic
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const submenu = header.nextElementSibling;
            const isOpen = submenu.style.maxHeight;

            // Close all other accordions
            document.querySelectorAll('.nav-submenu').forEach(sub => {
                sub.style.maxHeight = null;
                sub.previousElementSibling.classList.remove('active-accordion');
            });

            if (!isOpen) {
                submenu.style.maxHeight = submenu.scrollHeight + "px";
                header.classList.add('active-accordion');
            }
        });
    });

    // Highlight active menu item on scroll
    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 60)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (current && link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
                
                // Open parent accordion automatically
                const parentSubmenu = link.closest('.nav-submenu');
                if (parentSubmenu && !parentSubmenu.style.maxHeight) {
                    parentSubmenu.style.maxHeight = parentSubmenu.scrollHeight + "px";
                    parentSubmenu.previousElementSibling.classList.add('active-accordion');
                }
            }
        });

        // Show/Hide Scroll to Top Button
        if (scrollTopBtn) {
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                scrollTopBtn.style.display = "block";
            } else {
                scrollTopBtn.style.display = "none";
            }
        }
    });

    // Scroll to Top Logic
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
