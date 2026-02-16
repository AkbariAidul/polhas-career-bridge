// Component Loader - Load reusable HTML components
export async function loadComponent(elementId, componentPath) {
    try {
        // Add cache-busting timestamp with random number
        const cacheBuster = `?v=${Date.now()}&r=${Math.random()}`;
        const response = await fetch(componentPath + cacheBuster, {
            cache: 'no-store',
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            }
        });
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
        loadComponent('footer-container', 'components/footer.html')
    ]);
    
    console.log('✅ All components loaded');
    
    // Inject auth modal if it doesn't exist
    const { injectAuthModal } = await import('./inject-auth-modal.js');
    injectAuthModal();
    
    // Verify modal exists
    const modal = document.getElementById('auth-modal');
    if (modal) {
        console.log('✅ Auth modal found in DOM');
    } else {
        console.error('❌ Auth modal NOT found in DOM!');
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
    
    // Debug: Check if register-prodi select exists
    setTimeout(() => {
        const prodiSelect = document.getElementById('register-prodi');
        if (prodiSelect) {
            console.log('✅ register-prodi SELECT found:', prodiSelect);
            console.log('   - Display:', window.getComputedStyle(prodiSelect).display);
            console.log('   - Visibility:', window.getComputedStyle(prodiSelect).visibility);
            console.log('   - Opacity:', window.getComputedStyle(prodiSelect).opacity);
            console.log('   - Height:', window.getComputedStyle(prodiSelect).height);
            console.log('   - Options count:', prodiSelect.options.length);
        } else {
            console.error('❌ register-prodi SELECT NOT FOUND!');
        }
    }, 100);
    
    const event = new Event('componentsLoaded');
    document.dispatchEvent(event);
}
