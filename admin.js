// Central Academy School - Admin CMS System
// Full-featured admin panel with content management capabilities

class AdminCMS {
    constructor() {
        this.isLoggedIn = false;
        this.currentPage = 'dashboard';
        this.contentData = {};
        this.events = [];
        this.mediaFiles = [];
        this.init();
    }

    init() {
        this.loadStoredData();
        this.initLogin();
        this.initNavigation();
        this.initContentEditor();
        this.initEventManager();
        this.initMediaLibrary();
        this.initRoutineManager();
        this.initContactManager();
    }

    // Authentication System
    initLogin() {
        const loginForm = document.getElementById('admin-login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const username = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                
                // Simple authentication (in production, use secure backend)
                if (username === 'CASadmin' && password === 'CAS1401JankiSinha') {
                    this.isLoggedIn = true;
                    this.showDashboard();
                    this.saveToStorage('admin_session', { loggedIn: true, timestamp: Date.now() });
                } else {
                    alert('Invalid credentials. Please try again.');
                }
            });
        }

        // Check for existing session
        const session = this.getFromStorage('admin_session');
        if (session && session.loggedIn && (Date.now() - session.timestamp) < 3600000) {
            this.isLoggedIn = true;
            this.showDashboard();
        }

        // Logout functionality
        const logoutBtn = document.getElementById('admin-logout');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.logout();
            });
        }
    }

    showDashboard() {
        document.getElementById('admin-login-modal').style.display = 'none';
        document.getElementById('admin-dashboard').classList.remove('hidden');
        this.showPage('dashboard');
    }

    logout() {
        this.isLoggedIn = false;
        localStorage.removeItem('admin_session');
        document.getElementById('admin-login-modal').style.display = 'flex';
        document.getElementById('admin-dashboard').classList.add('hidden');
    }

    // Navigation System
    initNavigation() {
        const navLinks = document.querySelectorAll('.sidebar-nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                if (link.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    const page = link.getAttribute('href').substring(1);
                    this.showPage(page);
                    this.updateActiveNav(link);
                }
            });
        });
    }

    updateActiveNav(activeLink) {
        document.querySelectorAll('.sidebar-nav a').forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    showPage(pageName) {
        // Hide all content sections
        document.querySelectorAll('[id$="-content"]').forEach(section => {
            section.style.display = 'none';
        });

        // Show selected section
        const targetSection = document.getElementById(pageName + '-content');
        if (targetSection) {
            targetSection.style.display = 'block';
            targetSection.classList.add('fade-in');
        }

        // Update page title
        const titles = {
            dashboard: 'Dashboard',
            content: 'Content Editor',
            events: 'Event Manager',
            media: 'Media Library',
            routine: 'Routine Manager',
            contact: 'Contact Information',
            settings: 'Settings'
        };
        
        const pageTitle = document.getElementById('page-title');
        if (pageTitle) {
            pageTitle.textContent = titles[pageName] || 'Dashboard';
        }

        this.currentPage = pageName;
        this.loadPageContent(pageName);
    }

    loadPageContent(pageName) {
        switch(pageName) {
            case 'dashboard':
                this.loadDashboard();
                break;
            case 'content':
                this.loadContentEditor();
                break;
            case 'events':
                this.loadEventManager();
                break;
            case 'media':
                this.loadMediaLibrary();
                break;
            case 'routine':
                this.loadRoutineManager();
                break;
            case 'contact':
                this.loadContactManager();
                break;
            case 'about':
                this.loadAboutManager();
                break;
        }
    }

    // Dashboard
    loadDashboard() {
        const dashboardContent = document.getElementById('dashboard-content');
        if (dashboardContent) {
            dashboardContent.innerHTML = `
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <div class="card bg-white p-6 rounded-lg shadow-sm">
                        <div class="flex items-center">
                            <div class="p-3 rounded-full bg-orange-100 text-orange-600">
                                <i class="fas fa-file-alt text-2xl"></i>
                            </div>
                            <div class="ml-4">
                                <h3 class="text-lg font-semibold text-gray-700">Total Pages</h3>
                                <p class="text-2xl font-bold text-gray-900">6</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="card bg-white p-6 rounded-lg shadow-sm">
                        <div class="flex items-center">
                            <div class="p-3 rounded-full bg-blue-100 text-blue-600">
                                <i class="fas fa-calendar-alt text-2xl"></i>
                            </div>
                            <div class="ml-4">
                                <h3 class="text-lg font-semibold text-gray-700">Active Events</h3>
                                <p class="text-2xl font-bold text-gray-900">${this.events.length}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="card bg-white p-6 rounded-lg shadow-sm">
                        <div class="flex items-center">
                            <div class="p-3 rounded-full bg-green-100 text-green-600">
                                <i class="fas fa-images text-2xl"></i>
                            </div>
                            <div class="ml-4">
                                <h3 class="text-lg font-semibold text-gray-700">Media Files</h3>
                                <p class="text-2xl font-bold text-gray-900">${this.mediaFiles.length}</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div class="card bg-white p-6 rounded-lg shadow-sm">
                        <h3 class="text-lg font-semibold text-gray-700 mb-4">Quick Actions</h3>
                        <div class="space-y-3">
                            <button onclick="adminCMS.showPage('content')" class="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                                <i class="fas fa-edit text-orange-600 mr-3"></i>Edit Homepage Content
                            </button>
                            <button onclick="adminCMS.showPage('events')" class="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                                <i class="fas fa-calendar-plus text-blue-600 mr-3"></i>Add New Event
                            </button>
                            <button onclick="adminCMS.showPage('media')" class="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                                <i class="fas fa-upload text-green-600 mr-3"></i>Upload Media
                            </button>
                            <button onclick="adminCMS.showPage('about')" class="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                                <i class="fas fa-user-tie text-purple-600 mr-3"></i>Edit About Section
                            </button>
                        </div>
                    </div>
                    
                    <div class="card bg-white p-6 rounded-lg shadow-sm">
                        <h3 class="text-lg font-semibold text-gray-700 mb-4">Recent Activity</h3>
                        <div class="space-y-3">
                            <div class="flex items-center p-3 bg-gray-50 rounded-lg">
                                <i class="fas fa-info-circle text-blue-500 mr-3"></i>
                                <span class="text-sm text-gray-600">System initialized successfully</span>
                            </div>
                            <div class="flex items-center p-3 bg-gray-50 rounded-lg">
                                <i class="fas fa-check-circle text-green-500 mr-3"></i>
                                <span class="text-sm text-gray-600">Admin panel loaded</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    // Content Editor
    initContentEditor() {
        this.contentData = this.getFromStorage('content_data') || {
            heroTitle: 'CENTRAL ACADEMY SCHOOL',
            heroSubtitle: 'SIMDEGA',
            heroTagline1: 'Excellence in Education',
            heroTagline2: 'Nurturing Young Minds',
            aboutTitle: 'About Our School',
            aboutContent: 'Central Academy School is committed to providing quality education...'
        };
    }

    loadContentEditor() {
        const content = document.getElementById('content-content');
        if (content) {
            content.innerHTML = `
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <h3 class="text-lg font-semibold text-gray-700 mb-6">Homepage Content Editor</h3>
                    
                    <div class="space-y-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Hero Title</label>
                            <input type="text" id="hero-title" value="${this.contentData.heroTitle}" 
                                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Hero Subtitle</label>
                            <input type="text" id="hero-subtitle" value="${this.contentData.heroSubtitle}" 
                                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Tagline 1</label>
                            <input type="text" id="hero-tagline1" value="${this.contentData.heroTagline1}" 
                                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Tagline 2</label>
                            <input type="text" id="hero-tagline2" value="${this.contentData.heroTagline2}" 
                                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                        </div>
                        
                        <div class="flex space-x-4">
                            <button onclick="adminCMS.saveContent()" class="btn-primary text-white px-6 py-2 rounded-lg">
                                <i class="fas fa-save mr-2"></i>Save Changes
                            </button>
                            <button onclick="adminCMS.previewChanges()" class="bg-gray-500 text-white px-6 py-2 rounded-lg">
                                <i class="fas fa-eye mr-2"></i>Preview
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    saveContent() {
        this.contentData = {
            heroTitle: document.getElementById('hero-title').value,
            heroSubtitle: document.getElementById('hero-subtitle').value,
            heroTagline1: document.getElementById('hero-tagline1').value,
            heroTagline2: document.getElementById('hero-tagline2').value
        };
        
        this.saveToStorage('content_data', this.contentData);
        alert('Content saved successfully!');
    }

    previewChanges() {
        window.open('index.html', '_blank');
    }

    // Event Manager
    initEventManager() {
        this.events = this.getFromStorage('events') || [
            {
                id: 1,
                title: 'Independence Day Celebration',
                date: '2024-08-15',
                description: 'Annual Independence Day celebration with cultural programs',
                image: 'independence day1.jpeg'
            },
            {
                id: 2,
                title: 'Teachers Day Celebration',
                date: '2024-09-05',
                description: 'Celebrating our beloved teachers',
                image: 'teachers day1.jpg'
            }
        ];
    }

    loadEventManager() {
        const content = document.getElementById('events-content');
        if (content) {
            content.innerHTML = `
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <div class="flex justify-between items-center mb-6">
                        <h3 class="text-lg font-semibold text-gray-700">Event Manager</h3>
                        <button onclick="adminCMS.showAddEventModal()" class="btn-primary text-white px-4 py-2 rounded-lg">
                            <i class="fas fa-plus mr-2"></i>Add Event
                        </button>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        ${this.events.map(event => `
                            <div class="border rounded-lg p-4">
                                <img src="${event.image}" alt="${event.title}" class="w-full h-32 object-cover rounded mb-3">
                                <h4 class="font-semibold text-gray-800 mb-2">${event.title}</h4>
                                <p class="text-sm text-gray-600 mb-2">${event.date}</p>
                                <p class="text-sm text-gray-700 mb-3">${event.description}</p>
                                <div class="flex space-x-2">
                                    <button onclick="adminCMS.editEvent(${event.id})" class="bg-blue-500 text-white px-3 py-1 rounded text-sm">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button onclick="adminCMS.deleteEvent(${event.id})" class="bg-red-500 text-white px-3 py-1 rounded text-sm">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Add Event Modal -->
                <div id="add-event-modal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <h3 class="text-lg font-semibold text-gray-700 mb-4">Add New Event</h3>
                        <form id="add-event-form">
                            <div class="space-y-4">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Event Title</label>
                                    <input type="text" id="event-title" required class="w-full px-3 py-2 border border-gray-300 rounded-lg">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Event Date</label>
                                    <input type="date" id="event-date" required class="w-full px-3 py-2 border border-gray-300 rounded-lg">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                    <textarea id="event-description" rows="3" required class="w-full px-3 py-2 border border-gray-300 rounded-lg"></textarea>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                                    <input type="text" id="event-image" placeholder="e.g., independence day1.jpeg" class="w-full px-3 py-2 border border-gray-300 rounded-lg">
                                </div>
                            </div>
                            <div class="flex space-x-4 mt-6">
                                <button type="submit" class="btn-primary text-white px-4 py-2 rounded-lg">Add Event</button>
                                <button type="button" onclick="adminCMS.hideAddEventModal()" class="bg-gray-500 text-white px-4 py-2 rounded-lg">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            `;
            
            // Add event form handler
            document.getElementById('add-event-form').addEventListener('submit', (e) => {
                e.preventDefault();
                this.addEvent();
            });
        }
    }

    showAddEventModal() {
        document.getElementById('add-event-modal').classList.remove('hidden');
    }

    hideAddEventModal() {
        document.getElementById('add-event-modal').classList.add('hidden');
    }

    addEvent() {
        const newEvent = {
            id: Date.now(),
            title: document.getElementById('event-title').value,
            date: document.getElementById('event-date').value,
            description: document.getElementById('event-description').value,
            image: document.getElementById('event-image').value || 'school_building.jpg'
        };
        
        this.events.push(newEvent);
        this.saveToStorage('events', this.events);
        this.hideAddEventModal();
        this.loadEventManager();
        alert('Event added successfully!');
    }

    editEvent(id) {
        const event = this.events.find(e => e.id === id);
        if (event) {
            const newTitle = prompt('Edit Event Title:', event.title);
            if (newTitle && newTitle !== event.title) {
                event.title = newTitle;
                this.saveToStorage('events', this.events);
                this.loadEventManager();
                alert('Event updated successfully!');
            }
        }
    }

    deleteEvent(id) {
        if (confirm('Are you sure you want to delete this event?')) {
            this.events = this.events.filter(e => e.id !== id);
            this.saveToStorage('events', this.events);
            this.loadEventManager();
            alert('Event deleted successfully!');
        }
    }

    // Media Library
    initMediaLibrary() {
        this.mediaFiles = [
            'school_building.jpg',
            'school_park.jpg',
            'school_logo_color.png',
            'independence day1.jpeg',
            'teachers day1.jpg',
            'yoga day1.jpeg',
            'science exhibition1.JPG'
        ];
    }

    loadMediaLibrary() {
        const content = document.getElementById('media-content');
        if (content) {
            content.innerHTML = `
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <div class="flex justify-between items-center mb-6">
                        <h3 class="text-lg font-semibold text-gray-700">Media Library</h3>
                        <button onclick="adminCMS.showUploadModal()" class="btn-primary text-white px-4 py-2 rounded-lg">
                            <i class="fas fa-upload mr-2"></i>Upload File
                        </button>
                    </div>
                    
                    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        ${this.mediaFiles.map(file => `
                            <div class="border rounded-lg p-2">
                                <img src="${file}" alt="${file}" class="w-full h-24 object-cover rounded mb-2">
                                <p class="text-xs text-gray-600 truncate">${file}</p>
                                <button onclick="adminCMS.copyImageUrl('${file}')" class="mt-1 bg-blue-500 text-white px-2 py-1 rounded text-xs w-full">
                                    Copy URL
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
    }

    copyImageUrl(filename) {
        navigator.clipboard.writeText(filename).then(() => {
            alert('Image URL copied to clipboard!');
        });
    }

    // Routine Manager
    loadRoutineManager() {
        const content = document.getElementById('routine-content');
        if (content) {
            content.innerHTML = `
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <h3 class="text-lg font-semibold text-gray-700 mb-6">Routine Manager</h3>
                    <p class="text-gray-600">Routine management functionality coming soon!</p>
                </div>
            `;
        }
    }

    // Contact Manager
    loadContactManager() {
        const content = document.getElementById('contact-content');
        if (content) {
            content.innerHTML = `
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <h3 class="text-lg font-semibold text-gray-700 mb-6">Contact Information</h3>
                    <p class="text-gray-600">Contact information management coming soon!</p>
                </div>
            `;
        }
    }

    // About Section Manager
    loadAboutManager() {
        const aboutData = this.getFromStorage('about_data') || {
            principalName: 'Mrs. Janki Sinha',
            principalTitle: 'Director & Principal',
            principalDescription: 'Mrs. Janki Sinha founded Central Academy School in 2012 with a vision to provide quality education to the children of Simdega. With over a decade of experience in education, she has been instrumental in shaping the school\'s philosophy and ensuring academic excellence.',
            principalImage: 'school_logo_color.png'
        };

        const content = document.getElementById('about-content');
        if (content) {
            content.innerHTML = `
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <h3 class="text-lg font-semibold text-gray-700 mb-6">About Section Manager</h3>
                    
                    <div class="space-y-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Principal Name</label>
                            <input type="text" id="principal-name" value="${aboutData.principalName}" 
                                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Principal Title</label>
                            <input type="text" id="principal-title" value="${aboutData.principalTitle}" 
                                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Principal Description</label>
                            <textarea id="principal-description" rows="4" 
                                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">${aboutData.principalDescription}</textarea>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Principal Image</label>
                            <input type="text" id="principal-image" value="${aboutData.principalImage}" 
                                   placeholder="Enter image filename (e.g., principal.jpg)"
                                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                            <p class="text-xs text-gray-500 mt-1">Upload image to Media Library first, then enter filename here</p>
                        </div>
                        
                        <div class="flex space-x-4">
                            <button onclick="adminCMS.saveAboutData()" class="btn-primary text-white px-6 py-2 rounded-lg">
                                <i class="fas fa-save mr-2"></i>Save Changes
                            </button>
                            <button onclick="adminCMS.previewAbout()" class="bg-gray-500 text-white px-6 py-2 rounded-lg">
                                <i class="fas fa-eye mr-2"></i>Preview
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    saveAboutData() {
        const aboutData = {
            principalName: document.getElementById('principal-name').value,
            principalTitle: document.getElementById('principal-title').value,
            principalDescription: document.getElementById('principal-description').value,
            principalImage: document.getElementById('principal-image').value
        };
        
        this.saveToStorage('about_data', aboutData);
        alert('About section data saved successfully!');
    }

    previewAbout() {
        window.open('about.html', '_blank');
    }

    // Storage Management
    saveToStorage(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    getFromStorage(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }

    loadStoredData() {
        this.contentData = this.getFromStorage('content_data') || {};
        this.events = this.getFromStorage('events') || [];
    }
}

// Initialize Admin CMS when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.adminCMS = new AdminCMS();
});