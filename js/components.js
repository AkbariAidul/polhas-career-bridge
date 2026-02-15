// Component Loader - Load reusable HTML components
export async function loadComponent(elementId, componentPath) {
    try {
        // Add cache-busting timestamp
        const cacheBuster = `?v=${Date.now()}`;
        const response = await fetch(componentPath + cacheBuster);
        const html = await response.text();
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = html;
        }
    } catch (error) {
        console.error(`Error loading component ${componentPath}:`, error);
    }
}

// Load all common components
export async function loadCommonComponents() {
    console.log('📦 Loading common components...');
    await Promise.all([
        loadComponent('navbar-container', 'components/navbar.html'),
        loadComponent('footer-container', 'components/footer.html'),
        loadComponent('auth-modal-container', 'components/auth-modal.html')
    ]);
    
    console.log('✅ All components loaded');
    
    // Verify modal exists
    const modal = document.getElementById('auth-modal');
    if (modal) {
        console.log('✅ Auth modal found in DOM');
    } else {
        console.error('❌ Auth modal NOT found in DOM after loading!');
    }
    
    // Highlight active nav link based on current page
    highlightActiveNav();
    
    // Initialize auth after components are loaded
    initializeAuth();
}

// Highlight active navigation link
function highlightActiveNav() {
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('data-page');
        if (linkPage === currentPage) {
            link.classList.remove('text-gray-700');
            link.classList.add('text-blue-600');
        }
    });
}

// Initialize auth functionality after components load
function initializeAuth() {
    // Import and initialize auth from main.js will handle this
    // This ensures auth modal event listeners are attached after DOM is ready
    console.log('✅ Components loaded, dispatching componentsLoaded event');
    const event = new Event('componentsLoaded');
    document.dispatchEvent(event);
}
