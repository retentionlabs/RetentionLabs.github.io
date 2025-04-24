document.addEventListener('DOMContentLoaded', () => {
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
    
    // Create memory visualization
    createMemoryVisualization();
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
