document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS animation library
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: true,
        offset: 100,
        delay: 100
    });

    // Initialize VANTA.NET background for hero section
    let vantaEffect = null;

    function initVanta() {
        if (vantaEffect) vantaEffect.destroy();

        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
        const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color').trim();

        vantaEffect = VANTA.NET({
            el: '#hero-background',
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200,
            minWidth: 200,
            scale: 1.00,
            scaleMobile: 1.00,
            color: primaryColor,
            backgroundColor: isDark ? '#0f172a' : '#ffffff',
            points: 12,
            maxDistance: 30,
            spacing: 20,
            showDots: true
        });
    }

    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');

    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    // Initialize VANTA after theme is set
    if (document.getElementById('hero-background')) {
        initVanta();
    }

    // Theme toggle event listener
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? null : 'dark';

        if (newTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }

        // Reinitialize VANTA with new theme colors
        if (document.getElementById('hero-background')) {
            setTimeout(initVanta, 300);
        }
    });

    // Language toggle functionality
    const langEnBtn = document.getElementById('lang-en');
    const langKoBtn = document.getElementById('lang-ko');

    langEnBtn.addEventListener('click', () => setLanguage('en'));
    langKoBtn.addEventListener('click', () => setLanguage('ko'));

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll animations
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;

        // Parallax effect for hero section
        if (document.querySelector('.hero')) {
            document.querySelector('.hero').style.backgroundPosition = `center ${scrollPosition * 0.05}px`;
        }
    });

    // Neural network visualization
    createNetworkVisualization();
});


// Create neural network visualization
function createNetworkVisualization() {
    const svg = document.querySelector('.memory-visualization svg');
    if (!svg) return;

    const connectionsGroup = svg.querySelector('.connections');

    // Create random connection lines
    for (let i = 0; i < 30; i++) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');

        // Random start and end points within the circle
        const angle1 = Math.random() * Math.PI * 2;
        const angle2 = Math.random() * Math.PI * 2;
        const radius1 = Math.random() * 60 + 20;
        const radius2 = Math.random() * 60 + 20;

        const x1 = 150 + Math.cos(angle1) * radius1;
        const y1 = 150 + Math.sin(angle1) * radius1;
        const x2 = 150 + Math.cos(angle2) * radius2;
        const y2 = 150 + Math.sin(angle2) * radius2;

        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.setAttribute('stroke', 'url(#gradient1)');
        line.setAttribute('stroke-width', Math.random() * 1.5 + 0.5);
        line.setAttribute('opacity', Math.random() * 0.5 + 0.1);

        // Add animation
        const animateOpacity = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
        animateOpacity.setAttribute('attributeName', 'opacity');
        animateOpacity.setAttribute('values', `${Math.random() * 0.3 + 0.1};${Math.random() * 0.7 + 0.3};${Math.random() * 0.3 + 0.1}`);
        animateOpacity.setAttribute('dur', `${Math.random() * 3 + 2}s`);
        animateOpacity.setAttribute('repeatCount', 'indefinite');

        line.appendChild(animateOpacity);
        connectionsGroup.appendChild(line);
    }

    // Create small nodes (neurons)
    for (let i = 0; i < 20; i++) {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

        // Random position within the main circle
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 80;

        const cx = 150 + Math.cos(angle) * radius;
        const cy = 150 + Math.sin(angle) * radius;

        circle.setAttribute('cx', cx);
        circle.setAttribute('cy', cy);
        circle.setAttribute('r', Math.random() * 3 + 2);
        circle.setAttribute('fill', 'url(#gradient1)');

        // Add pulse animation
        const animateRadius = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
        animateRadius.setAttribute('attributeName', 'r');
        animateRadius.setAttribute('values', `${Math.random() * 2 + 1};${Math.random() * 4 + 3};${Math.random() * 2 + 1}`);
        animateRadius.setAttribute('dur', `${Math.random() * 2 + 1}s`);
        animateRadius.setAttribute('repeatCount', 'indefinite');

        circle.appendChild(animateRadius);
        svg.querySelector('.nodes').appendChild(circle);
    }
}
