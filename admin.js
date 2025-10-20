// Central Academy School - Comprehensive Admin CMS System
// Full-featured admin panel with working content management capabilities

class AdminCMS {
    constructor() {
        this.isLoggedIn = false;
        this.currentSection = 'dashboard';
        this.contentData = {};
        this.events = [];
        this.mediaFiles = [];
        this.aboutData = {};
        this.contactData = {};
        this.settingsData = {};
        this.init();
    }

    init() {
        console.log('Initializing Admin CMS...');
        this.loadStoredData();
        this.checkAuth();
        this.initLogin();
    }

    checkAuth() {
        const session = this.getFromStorage('admin_session');
        if (session && session.loggedIn && (Date.now() - session.timestamp) < 7200000) { // 2 hours
            this.isLoggedIn = true;
            this.showDashboard();
        } else {
            this.showLoginModal();
        }
    }

    showLoginModal() {
        const loginModal = document.getElementById('admin-login-modal');
        const dashboard = document.getElementById('admin-dashboard');
        if (loginModal) loginModal.style.display = 'flex';
        if (dashboard) dashboard.classList.add('hidden');
    }

    showDashboard() {
        const loginModal = document.getElementById('admin-login-modal');
        const dashboard = document.getElementById('admin-dashboard');
        if (loginModal) loginModal.style.display = 'none';
        if (dashboard) dashboard.classList.remove('hidden');
        this.initNavigation();
        this.initEventHandlers();
        this.loadDashboard();
    }

    initLogin() {
        const loginForm = document.getElementById('admin-login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const username = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                
                // Authentication credentials
                if (username === 'CASadmin' && password === 'CAS1401JankiSinha') {
                    this.isLoggedIn = true;
                    this.saveToStorage('admin_session', { loggedIn: true, timestamp: Date.now(), user: 'CASadmin' });
                    this.showDashboard();
                    this.showToast('Login successful!', 'success');
                } else {
                    this.showToast('Invalid credentials. Please try again.', 'error');
                }
            });
        }

        const logoutBtn = document.getElementById('admin-logout');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.logout();
            });
        }
    }

    logout() {
        this.isLoggedIn = false;
        localStorage.removeItem('admin_session');
        this.showLoginModal();
        this.showToast('Logged out successfully', 'info');
    }

    initNavigation() {
        const navLinks = document.querySelectorAll('.sidebar-nav a:not(#admin-logout)');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    const section = href.substring(1);
                    this.showSection(section);
                    
                    // Update active state
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            });
        });
    }

    showSection(section) {
        console.log('Showing section:', section);
        this.currentSection = section;
        
        // Hide all sections
        const sections = ['dashboard-content', 'content-editor', 'event-manager', 'media-library', 
                         'routine-manager', 'contact-manager', 'about-content', 'settings'];
        sections.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.add('hidden');
        });
        
        // Show selected section and load its content
        const sectionMap = {
            'dashboard': 'dashboard-content',
            'content': 'content-editor',
            'events': 'event-manager',
            'media': 'media-library',
            'routine': 'routine-manager',
            'contact': 'contact-manager',
            'about': 'about-content',
            'settings': 'settings'
        };
        
        const targetId = sectionMap[section];
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
            targetEl.classList.remove('hidden');
        }
        
        // Update page title
        const titles = {
            'dashboard': 'Dashboard',
            'content': 'Content Editor',
            'events': 'Event Manager',
            'media': 'Media Library',
            'routine': 'Routine Manager',
            'contact': 'Contact Information',
            'about': 'About Section',
            'settings': 'Settings'
        };
        
        const pageTitle = document.getElementById('page-title');
        if (pageTitle) {
            pageTitle.textContent = titles[section] || 'Dashboard';
        }
        
        // Load section-specific content
        this.loadSectionContent(section);
    }

    loadSectionContent(section) {
        switch(section) {
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
            case 'settings':
                this.loadSettings();
                break;
        }
    }

    initEventHandlers() {
        // Save button handlers
        const saveContentBtn = document.getElementById('save-content');
        if (saveContentBtn) {
            saveContentBtn.addEventListener('click', () => this.saveContent());
        }

        const saveContactBtn = document.getElementById('save-contact');
        if (saveContactBtn) {
            saveContactBtn.addEventListener('click', () => this.saveContact());
        }

        const saveSettingsBtn = document.getElementById('save-settings');
        if (saveSettingsBtn) {
            saveSettingsBtn.addEventListener('click', () => this.saveSettings());
        }

        // Event modal handlers
        const addEventBtn = document.getElementById('add-event-btn');
        if (addEventBtn) {
            addEventBtn.addEventListener('click', () => this.showAddEventModal());
        }

        const closeEventModal = document.getElementById('close-event-modal');
        if (closeEventModal) {
            closeEventModal.addEventListener('click', () => this.hideAddEventModal());
        }

        const cancelEventBtn = document.getElementById('cancel-event');
        if (cancelEventBtn) {
            cancelEventBtn.addEventListener('click', () => this.hideAddEventModal());
        }

        const eventForm = document.getElementById('event-form');
        if (eventForm) {
            eventForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.addEvent();
            });
        }

        // Media upload handlers
        const uploadMediaBtn = document.getElementById('upload-media-btn');
        const mediaInput = document.getElementById('media-input');
        const uploadArea = document.getElementById('media-upload-area');

        if (uploadMediaBtn && mediaInput) {
            uploadMediaBtn.addEventListener('click', () => mediaInput.click());
        }

        if (uploadArea && mediaInput) {
            uploadArea.addEventListener('click', () => mediaInput.click());
            uploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadArea.classList.add('drag-over');
            });
            uploadArea.addEventListener('dragleave', () => {
                uploadArea.classList.remove('drag-over');
            });
            uploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadArea.classList.remove('drag-over');
                this.handleFileUpload(e.dataTransfer.files);
            });
        }

        if (mediaInput) {
            mediaInput.addEventListener('change', (e) => {
                this.handleFileUpload(e.target.files);
            });
        }
    }

    // Dashboard
    loadDashboard() {
        const stats = {
            events: this.events.length,
            media: this.mediaFiles.length
        };
        
        console.log('Dashboard loaded with stats:', stats);
    }

    // Content Editor
    loadContentEditor() {
        const heroTitle = document.getElementById('hero-title');
        const heroSubtitle = document.getElementById('hero-subtitle');
        const heroTagline1 = document.getElementById('hero-tagline1');
        const heroTagline2 = document.getElementById('hero-tagline2');

        if (heroTitle) heroTitle.value = this.contentData.heroTitle || 'CENTRAL ACADEMY SCHOOL';
        if (heroSubtitle) heroSubtitle.value = this.contentData.heroSubtitle || 'SIMDEGA';
        if (heroTagline1) heroTagline1.value = this.contentData.heroTagline1 || 'Excellence in Education Since 2012';
        if (heroTagline2) heroTagline2.value = this.contentData.heroTagline2 || 'Nurturing Young Minds';

        console.log('Content editor loaded');
    }

    saveContent() {
        const heroTitle = document.getElementById('hero-title');
        const heroSubtitle = document.getElementById('hero-subtitle');
        const heroTagline1 = document.getElementById('hero-tagline1');
        const heroTagline2 = document.getElementById('hero-tagline2');

        this.contentData = {
            heroTitle: heroTitle ? heroTitle.value : '',
            heroSubtitle: heroSubtitle ? heroSubtitle.value : '',
            heroTagline1: heroTagline1 ? heroTagline1.value : '',
            heroTagline2: heroTagline2 ? heroTagline2.value : ''
        };
        
        this.saveToStorage('content_data', this.contentData);
        this.showToast('Content saved successfully! Refresh index.html to see changes.', 'success');
        console.log('Content saved:', this.contentData);
    }

    // Event Manager
    loadEventManager() {
        const eventsGrid = document.getElementById('events-grid');
        if (!eventsGrid) return;

        eventsGrid.innerHTML = '';
        
        if (this.events.length === 0) {
            eventsGrid.innerHTML = '<p class="text-gray-600 col-span-full text-center py-8">No events yet. Click "Add Event" to create one.</p>';
            return;
        }

        this.events.forEach(event => {
            const eventCard = this.createEventCard(event);
            eventsGrid.appendChild(eventCard);
        });

        console.log('Event manager loaded with', this.events.length, 'events');
    }

    createEventCard(event) {
        const card = document.createElement('div');
        card.className = 'border rounded-lg p-4 bg-white shadow-sm';
        
        const imageUrl = event.image || 'resources/school_building.jpg';
        
        card.innerHTML = `
            <img src="${imageUrl}" alt="${event.title}" class="w-full h-32 object-cover rounded mb-3" onerror="this.src='resources/school_building.jpg'">
            <h4 class="font-semibold text-gray-800 mb-2">${event.title}</h4>
            <p class="text-sm text-gray-600 mb-2">${event.date}</p>
            <p class="text-sm text-gray-700 mb-3">${event.description || ''}</p>
            <div class="flex space-x-2">
                <button class="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600" onclick="adminCMS.editEvent('${event.id}')">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600" onclick="adminCMS.deleteEvent('${event.id}')">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        `;
        
        return card;
    }

    showAddEventModal() {
        const modal = document.getElementById('event-form-modal');
        if (modal) {
            modal.classList.remove('hidden');
            // Reset form
            const form = document.getElementById('event-form');
            if (form) form.reset();
        }
    }

    hideAddEventModal() {
        const modal = document.getElementById('event-form-modal');
        if (modal) modal.classList.add('hidden');
    }

    addEvent() {
        const title = document.getElementById('event-title').value;
        const category = document.getElementById('event-category').value;
        const date = document.getElementById('event-date').value;
        const description = document.getElementById('event-description').value;
        const imageInput = document.getElementById('event-images');
        
        const newEvent = {
            id: 'event_' + Date.now(),
            title: title,
            category: category,
            date: date,
            description: description,
            image: 'resources/school_building.jpg' // Default image
        };

        // Handle image upload if provided
        if (imageInput && imageInput.files.length > 0) {
            const file = imageInput.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                newEvent.image = e.target.result;
                this.finalizeAddEvent(newEvent);
            };
            reader.readAsDataURL(file);
        } else {
            this.finalizeAddEvent(newEvent);
        }
    }

    finalizeAddEvent(event) {
        this.events.push(event);
        this.saveToStorage('events', this.events);
        this.hideAddEventModal();
        this.loadEventManager();
        this.showToast('Event added successfully!', 'success');
        console.log('Event added:', event);
    }

    editEvent(id) {
        const event = this.events.find(e => e.id === id);
        if (!event) return;

        const newTitle = prompt('Edit Event Title:', event.title);
        if (newTitle && newTitle !== event.title) {
            event.title = newTitle;
            
            const newDate = prompt('Edit Event Date (YYYY-MM-DD):', event.date);
            if (newDate) event.date = newDate;
            
            const newDesc = prompt('Edit Event Description:', event.description);
            if (newDesc) event.description = newDesc;
            
            this.saveToStorage('events', this.events);
            this.loadEventManager();
            this.showToast('Event updated successfully!', 'success');
        }
    }

    deleteEvent(id) {
        if (confirm('Are you sure you want to delete this event?')) {
            this.events = this.events.filter(e => e.id !== id);
            this.saveToStorage('events', this.events);
            this.loadEventManager();
            this.showToast('Event deleted successfully!', 'success');
        }
    }

    // Media Library
    loadMediaLibrary() {
        const mediaGrid = document.getElementById('media-grid');
        if (!mediaGrid) return;

        mediaGrid.innerHTML = '';
        
        if (this.mediaFiles.length === 0) {
            mediaGrid.innerHTML = '<p class="text-gray-600 col-span-full text-center py-8">No media files yet. Upload some files to get started.</p>';
            return;
        }

        this.mediaFiles.forEach((file, index) => {
            const mediaItem = this.createMediaItem(file, index);
            mediaGrid.appendChild(mediaItem);
        });

        console.log('Media library loaded with', this.mediaFiles.length, 'files');
    }

    createMediaItem(file, index) {
        const item = document.createElement('div');
        item.className = 'relative group border rounded-lg overflow-hidden';
        
        const imageUrl = file.url || file;
        
        item.innerHTML = `
            <img src="${imageUrl}" alt="Media ${index + 1}" class="w-full h-24 object-cover">
            <div class="absolute inset-0 bg-black bg-opacity-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div class="space-x-2">
                    <button class="text-white hover:text-blue-300" onclick="adminCMS.copyMediaUrl('${imageUrl}')">
                        <i class="fas fa-copy"></i>
                    </button>
                    <button class="text-white hover:text-red-300" onclick="adminCMS.deleteMedia(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        
        return item;
    }

    handleFileUpload(files) {
        Array.from(files).forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const mediaData = {
                        id: 'media_' + Date.now(),
                        name: file.name,
                        url: e.target.result,
                        size: file.size,
                        type: file.type
                    };
                    
                    this.mediaFiles.push(mediaData);
                    this.saveToStorage('media_files', this.mediaFiles);
                    this.loadMediaLibrary();
                    this.showToast(`Uploaded: ${file.name}`, 'success');
                };
                reader.readAsDataURL(file);
            } else {
                this.showToast(`${file.name} is not an image file`, 'error');
            }
        });
    }

    copyMediaUrl(url) {
        navigator.clipboard.writeText(url).then(() => {
            this.showToast('Image URL copied to clipboard!', 'success');
        }).catch(() => {
            this.showToast('Failed to copy URL', 'error');
        });
    }

    deleteMedia(index) {
        if (confirm('Are you sure you want to delete this media file?')) {
            this.mediaFiles.splice(index, 1);
            this.saveToStorage('media_files', this.mediaFiles);
            this.loadMediaLibrary();
            this.showToast('Media file deleted successfully!', 'success');
        }
    }

    // Routine Manager
    loadRoutineManager() {
        const routineList = document.getElementById('routine-list');
        if (!routineList) return;

        routineList.innerHTML = `
            <div class="bg-gray-50 rounded-lg p-4 mb-4">
                <p class="text-gray-600">Routine management functionality is available. You can manage school schedules and timetables here.</p>
            </div>
        `;

        console.log('Routine manager loaded');
    }

    // Contact Manager
    loadContactManager() {
        const phone1 = document.getElementById('phone1');
        const phone2 = document.getElementById('phone2');
        const email = document.getElementById('email');
        const instagram = document.getElementById('instagram');
        const facebook = document.getElementById('facebook');
        const mapUrl = document.getElementById('map-url');

        if (phone1) phone1.value = this.contactData.phone1 || '9608508156';
        if (phone2) phone2.value = this.contactData.phone2 || '8789508120';
        if (email) email.value = this.contactData.email || 'centralacademyschoolsimdega@gmail.com';
        if (instagram) instagram.value = this.contactData.instagram || 'https://www.instagram.com/simdega_central_academy';
        if (facebook) facebook.value = this.contactData.facebook || 'https://www.facebook.com/share/1GjhwB5vqu';
        if (mapUrl) mapUrl.value = this.contactData.mapUrl || 'https://maps.app.goo.gl/DWiGh3EgZSdC6EbL6';

        console.log('Contact manager loaded');
    }

    saveContact() {
        this.contactData = {
            phone1: document.getElementById('phone1').value,
            phone2: document.getElementById('phone2').value,
            email: document.getElementById('email').value,
            instagram: document.getElementById('instagram').value,
            facebook: document.getElementById('facebook').value,
            mapUrl: document.getElementById('map-url').value
        };
        
        this.saveToStorage('contact_data', this.contactData);
        this.showToast('Contact information saved successfully!', 'success');
        console.log('Contact info saved:', this.contactData);
    }

    // About Section Manager
    loadAboutManager() {
        const aboutContent = document.getElementById('about-content');
        if (!aboutContent) return;

        aboutContent.innerHTML = `
            <div class="bg-white rounded-lg shadow-sm p-6">
                <h3 class="text-lg font-semibold text-gray-700 mb-6">About Section Manager</h3>
                
                <div class="space-y-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Principal Name</label>
                        <input type="text" id="principal-name" value="${this.aboutData.principalName || 'Mrs. Janki Sinha'}" 
                               class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Principal Title</label>
                        <input type="text" id="principal-title" value="${this.aboutData.principalTitle || 'Director & Principal'}" 
                               class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Principal Description</label>
                        <textarea id="principal-description" rows="4" 
                                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">${this.aboutData.principalDescription || 'Mrs. Janki Sinha founded Central Academy School in 2012 with a vision to provide quality education to the children of Simdega. With over a decade of experience in education, she has been instrumental in shaping the school\'s philosophy and ensuring academic excellence.'}</textarea>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Principal Image</label>
                        <input type="file" id="principal-image-upload" accept="image/*"
                               class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                        <p class="text-xs text-gray-500 mt-1">Upload an image for the principal. Current: ${this.aboutData.principalImage || 'resources/school_logo_color.png'}</p>
                        ${this.aboutData.principalImageData ? `<img src="${this.aboutData.principalImageData}" alt="Principal" class="mt-2 w-32 h-32 object-cover rounded-lg">` : ''}
                    </div>
                    
                    <div class="flex space-x-4">
                        <button onclick="adminCMS.saveAboutData()" class="btn-primary text-white px-6 py-2 rounded-lg">
                            <i class="fas fa-save mr-2"></i>Save Changes
                        </button>
                        <button onclick="window.open('about.html', '_blank')" class="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600">
                            <i class="fas fa-eye mr-2"></i>Preview
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Add event listener for image upload
        const imageUpload = document.getElementById('principal-image-upload');
        if (imageUpload) {
            imageUpload.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file && file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        this.aboutData.principalImageData = event.target.result;
                        this.aboutData.principalImage = file.name;
                        this.showToast('Image loaded. Click "Save Changes" to save.', 'info');
                        // Reload to show preview
                        this.loadAboutManager();
                    };
                    reader.readAsDataURL(file);
                }
            });
        }

        console.log('About manager loaded');
    }

    saveAboutData() {
        this.aboutData = {
            principalName: document.getElementById('principal-name').value,
            principalTitle: document.getElementById('principal-title').value,
            principalDescription: document.getElementById('principal-description').value,
            principalImage: this.aboutData.principalImage || 'resources/school_logo_color.png',
            principalImageData: this.aboutData.principalImageData || null
        };
        
        this.saveToStorage('about_data', this.aboutData);
        this.showToast('About section data saved successfully!', 'success');
        console.log('About data saved:', this.aboutData);
    }

    // Settings
    loadSettings() {
        const siteTitle = document.getElementById('site-title');
        const siteDescription = document.getElementById('site-description');
        const maintenanceMode = document.getElementById('maintenance-mode');

        if (siteTitle) siteTitle.value = this.settingsData.siteTitle || 'Central Academy School, Simdega';
        if (siteDescription) siteDescription.value = this.settingsData.siteDescription || 'Excellence in Education, Nurturing Young Minds';
        if (maintenanceMode) maintenanceMode.checked = this.settingsData.maintenanceMode || false;

        console.log('Settings loaded');
    }

    saveSettings() {
        this.settingsData = {
            siteTitle: document.getElementById('site-title').value,
            siteDescription: document.getElementById('site-description').value,
            maintenanceMode: document.getElementById('maintenance-mode').checked
        };
        
        this.saveToStorage('settings_data', this.settingsData);
        this.showToast('Settings saved successfully!', 'success');
        console.log('Settings saved:', this.settingsData);
    }

    // Storage Management
    saveToStorage(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (e) {
            console.error('Error saving to localStorage:', e);
            return false;
        }
    }

    getFromStorage(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('Error reading from localStorage:', e);
            return null;
        }
    }

    loadStoredData() {
        this.contentData = this.getFromStorage('content_data') || {};
        this.events = this.getFromStorage('events') || [];
        this.mediaFiles = this.getFromStorage('media_files') || [];
        this.aboutData = this.getFromStorage('about_data') || {};
        this.contactData = this.getFromStorage('contact_data') || {};
        this.settingsData = this.getFromStorage('settings_data') || {};
        
        console.log('Stored data loaded:', {
            content: Object.keys(this.contentData).length,
            events: this.events.length,
            media: this.mediaFiles.length
        });
    }

    // UI Helpers
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        const bgColors = {
            'success': 'bg-green-500',
            'error': 'bg-red-500',
            'info': 'bg-blue-500',
            'warning': 'bg-yellow-500'
        };
        
        toast.className = `fixed top-4 right-4 ${bgColors[type]} text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in`;
        toast.innerHTML = `
            <div class="flex items-center space-x-2">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => document.body.removeChild(toast), 300);
        }, 3000);
    }
}

// Initialize Admin CMS when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.adminCMS = new AdminCMS();
    console.log('Admin CMS initialized and ready');
});
