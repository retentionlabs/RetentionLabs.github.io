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

    // Add memory connection lines animation
    function animateMemoryConnections() {
        const memoryNodes = document.querySelectorAll('.memory-node');
        if (!memoryNodes.length) return;

        // Create SVG element for dynamic connections
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.style.position = 'absolute';
        svg.style.top = '0';
        svg.style.left = '0';
        svg.style.pointerEvents = 'none';
        svg.style.zIndex = '5';

        const brainContainer = document.querySelector('.brain-container');
        brainContainer.appendChild(svg);

        // Create connections between nodes
        for (let i = 0; i < memoryNodes.length; i++) {
            for (let j = i + 1; j < memoryNodes.length; j++) {
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('stroke', 'var(--primary-color)');
                line.setAttribute('stroke-width', '1');
                line.setAttribute('opacity', '0.3');
                svg.appendChild(line);

                // Animate connection
                setInterval(() => {
                    const node1 = memoryNodes[i].getBoundingClientRect();
                    const node2 = memoryNodes[j].getBoundingClientRect();
                    const container = brainContainer.getBoundingClientRect();

                    const x1 = node1.left - container.left + node1.width / 2;
                    const y1 = node1.top - container.top + node1.height / 2;
                    const x2 = node2.left - container.left + node2.width / 2;
                    const y2 = node2.top - container.top + node2.height / 2;

                    line.setAttribute('x1', x1);
                    line.setAttribute('y1', y1);
                    line.setAttribute('x2', x2);
                    line.setAttribute('y2', y2);

                    // Pulse effect
                    const opacity = 0.1 + Math.random() * 0.3;
                    line.setAttribute('opacity', opacity.toString());
                }, 1000 + Math.random() * 2000);
            }
        }
    }

    // Initialize memory connections animation
    setTimeout(() => {
        animateMemoryConnections();
    }, 1000);

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
});

// Function to create an interactive memory visualization
function createMemoryVisualization() {
    const container = document.querySelector('.memory-nodes');
    if (!container) return;

    // Create memory nodes
    const nodeCount = 50;
    for (let i = 0; i < nodeCount; i++) {
        const node = document.createElement('div');
        node.classList.add('memory-node');

        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;

        // Random size
        const size = Math.random() * 10 + 5;

        // Random animation delay
        const delay = Math.random() * 5;

        // Style the node
        node.style.cssText = `
            position: absolute;
            left: ${x}%;
            top: ${y}%;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background-color: var(--primary-color);
            opacity: ${Math.random() * 0.5 + 0.1};
            animation: pulse ${Math.random() * 3 + 2}s infinite;
            animation-delay: ${delay}s;
        `;

        container.appendChild(node);
    }

    // Create connections between nodes
    const connections = nodeCount * 2;
    const nodes = document.querySelectorAll('.memory-node');

    for (let i = 0; i < connections; i++) {
        const connection = document.createElement('div');
        connection.classList.add('memory-connection');

        // Random nodes to connect
        const nodeIndex1 = Math.floor(Math.random() * nodeCount);
        let nodeIndex2 = Math.floor(Math.random() * nodeCount);

        // Ensure we don't connect a node to itself
        while (nodeIndex2 === nodeIndex1) {
            nodeIndex2 = Math.floor(Math.random() * nodeCount);
        }

        // Style the connection
        connection.style.cssText = `
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            opacity: ${Math.random() * 0.2 + 0.1};
        `;

        // We'll use SVG for the connection lines
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('stroke', 'var(--primary-color)');
        line.setAttribute('stroke-width', '1');

        // We'll update the line positions in a separate function
        svg.appendChild(line);
        connection.appendChild(svg);
        container.appendChild(connection);

        // Store the node indices for later position updates
        connection.dataset.node1 = nodeIndex1;
        connection.dataset.node2 = nodeIndex2;
    }

    // Function to update connection positions
    function updateConnections() {
        document.querySelectorAll('.memory-connection').forEach(connection => {
            const node1 = nodes[connection.dataset.node1];
            const node2 = nodes[connection.dataset.node2];

            if (!node1 || !node2) return;

            const rect1 = node1.getBoundingClientRect();
            const rect2 = node2.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();

            const x1 = rect1.left - containerRect.left + rect1.width / 2;
            const y1 = rect1.top - containerRect.top + rect1.height / 2;
            const x2 = rect2.left - containerRect.left + rect2.width / 2;
            const y2 = rect2.top - containerRect.top + rect2.height / 2;

            const line = connection.querySelector('line');
            line.setAttribute('x1', x1);
            line.setAttribute('y1', y1);
            line.setAttribute('x2', x2);
            line.setAttribute('y2', y2);
        });
    }

    // Update connections initially and on window resize
    updateConnections();
    window.addEventListener('resize', updateConnections);
}
