// Central Academy School Website - Main JavaScript
// Author: Professional Web Developer
// Features: Admin CMS, Event Management, Responsive Design

class SchoolWebsite {
    constructor() {
        this.isAdmin = false;
        this.currentUser = null;
        this.events = [];
        this.routines = [];
        this.contactInfo = {};
        this.init();
    }

    init() {
        this.initNavigation();
        this.initAnimations();
        this.initEventGallery();
        this.initContactForm();
        this.initAdminFeatures();
        this.loadContent();
    }

    // Navigation System
    initNavigation() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navToggle && navMenu) {
            // Toggle menu on click
            navToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                navMenu.classList.toggle('active');
            });
            
            // Global function for mobile menu toggle
            window.toggleMobileMenu = () => {
                navMenu.classList.toggle('active');
            };
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                    navMenu.classList.remove('active');
                }
            });
            
            // Close menu when clicking on a link
            const navLinks = navMenu.querySelectorAll('a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                });
            });
            
            // Close menu when window is resized to desktop
            window.addEventListener('resize', () => {
                if (window.innerWidth >= 768) {
                    navMenu.classList.remove('active');
                }
            });
            
            // Close menu when scrolling
            window.addEventListener('scroll', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
            });
        }

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Animation System
    initAnimations() {
        // Hero text animation
        if (document.querySelector('.hero-title')) {
            anime({
                targets: '.hero-title',
                opacity: [0, 1],
                translateY: [50, 0],
                duration: 1000,
                delay: 500,
                easing: 'easeOutExpo'
            });
        }

        // Statistics counter animation
        if (document.querySelector('.stat-number')) {
            this.animateCounters();
        }

        // Scroll animations
        this.initScrollAnimations();
    }

    animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace(/\D/g, ''));
            anime({
                targets: counter,
                innerHTML: [0, target],
                duration: 2000,
                delay: 1000,
                round: 1,
                easing: 'easeOutExpo',
                update: function(anim) {
                    const value = Math.round(anim.animatables[0].target.innerHTML);
                    counter.textContent = counter.textContent.replace(/\d+/, value);
                }
            });
        });
    }

    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    anime({
                        targets: entry.target,
                        opacity: [0, 1],
                        translateY: [30, 0],
                        duration: 800,
                        easing: 'easeOutExpo'
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            el.style.opacity = '0';
            observer.observe(el);
        });
    }

    // Event Gallery System
    initEventGallery() {
        this.loadEvents();
        this.initEventFilters();
        this.initLightbox();
    }

    loadEvents() {
        // Predefined events with images
        this.events = [
            {
                id: 1,
                title: "Art & Craft Exhibition",
                category: "art-craft",
                date: "2024-03-15",
                images: [
                    "yoga day1.jpeg",
                    "yoga day2.jpeg",
                    "yoga day3.jpeg",
                    "yoga day4.jpeg",
                    "yoga day5.jpeg",
                    "yoga day6.jpeg",
                    "yoga day7.jpeg"
                ],
                description: "Creative art and craft exhibition showcasing student talents."
            },
            {
                id: 2,
                title: "Independence Day Celebration",
                category: "cultural",
                date: "2024-08-15",
                images: [
                    "independence day1.jpeg",
                    "independence day2.jpeg",
                    "independence day3.jpeg",
                    "independence day4.jpeg",
                    "independence day5.jpeg",
                    "independence day6.jpeg",
                    "independence day7.jpeg"
                ],
                description: "Patriotic celebration of India's Independence Day."
            },
            {
                id: 3,
                title: "Science Exhibition",
                category: "science",
                date: "2024-02-20",
                images: [
                    "science exhibition1.JPG",
                    "science exhibition2.jpeg",
                    "science exhibition3.jpeg",
                    "science exhibition4.jpeg",
                    "science exhibition5.jpeg",
                    "science exhibition6.jpeg"
                ],
                description: "Innovative science projects and experiments by students."
            },
            {
                id: 4,
                title: "Teachers Day Celebration",
                category: "cultural",
                date: "2024-09-05",
                images: [
                    "teachers day1.jpg",
                    "teachers day2.jpg",
                    "teachers day3.jpg",
                    "teachers day4.jpg",
                    "teachers day5.JPG",
                    "teachers day6.JPG"
                ],
                description: "Celebrating our dedicated teachers and staff."
            },
            {
                id: 5,
                title: "Yoga Day Celebration",
                category: "yoga",
                date: "2024-06-21",
                images: [
                    "yoga day1.jpeg",
                    "yoga day2.jpeg",
                    "yoga day3.jpeg",
                    "yoga day4.jpeg",
                    "yoga day5.jpeg",
                    "yoga day6.jpeg",
                    "yoga day7.jpeg"
                ],
                description: "International Yoga Day celebration with students."
            }
        ];

        this.renderEvents(this.events);
    }

    renderEvents(events) {
        const container = document.querySelector('.events-grid');
        if (!container) return;

        container.innerHTML = '';

        events.forEach(event => {
            const eventCard = this.createEventCard(event);
            container.appendChild(eventCard);
        });

        // Animate cards
        anime({
            targets: '.event-card',
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 600,
            delay: anime.stagger(100),
            easing: 'easeOutExpo'
        });
    }

    createEventCard(event) {
        const card = document.createElement('div');
        card.className = 'event-card bg-white rounded-lg shadow-lg overflow-hidden animate-on-scroll';
        card.innerHTML = `
            <div class="relative">
                <img src="${event.images[0]}" alt="${event.title}" class="w-full h-48 object-cover">
                <div class="absolute top-4 right-4">
                    <span class="category-badge bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        ${this.getCategoryName(event.category)}
                    </span>
                </div>
            </div>
            <div class="p-6">
                <h3 class="text-xl font-bold text-gray-800 mb-2">${event.title}</h3>
                <p class="text-gray-600 mb-4">${event.description}</p>
                <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-500">${this.formatDate(event.date)}</span>
                    <button class="view-event-btn bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors" 
                            data-event-id="${event.id}">
                        View Details
                    </button>
                </div>
            </div>
        `;

        // Add click event for viewing event details
        const viewBtn = card.querySelector('.view-event-btn');
        viewBtn.addEventListener('click', () => this.showEventDetails(event));

        return card;
    }

    getCategoryName(category) {
        const categories = {
            'art-craft': 'Art & Craft',
            'science': 'Science',
            'cultural': 'Cultural',
            'yoga': 'Yoga Day',
            'upcoming': 'Upcoming',
            'past': 'Past Events'
        };
        return categories[category] || category;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    initEventFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.target.dataset.filter;
                this.filterEvents(filter);
                
                // Update active button
                filterButtons.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
    }

    filterEvents(filter) {
        let filteredEvents = this.events;

        if (filter !== 'all') {
            filteredEvents = this.events.filter(event => {
                if (filter === 'past') {
                    return new Date(event.date) < new Date();
                } else if (filter === 'upcoming') {
                    return new Date(event.date) >= new Date();
                } else {
                    return event.category === filter;
                }
            });
        }

        this.renderEvents(filteredEvents);
    }

    showEventDetails(event) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4';
        modal.innerHTML = `
            <div class="bg-white rounded-lg max-w-4xl w-full max-h-full overflow-y-auto">
                <div class="p-6">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-2xl font-bold text-gray-800">${event.title}</h2>
                        <button class="close-modal text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
                    </div>
                    <div class="mb-6">
                        <span class="category-badge bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium mr-2">
                            ${this.getCategoryName(event.category)}
                        </span>
                        <span class="text-gray-600">${this.formatDate(event.date)}</span>
                    </div>
                    <p class="text-gray-700 mb-6">${event.description}</p>
                    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                        ${event.images.map(img => `
                            <img src="${img}" alt="${event.title}" class="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-75 transition-opacity">
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Close modal functionality
        modal.querySelector('.close-modal').addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    initLightbox() {
        // Simple lightbox functionality for images
        document.addEventListener('click', (e) => {
            if (e.target.tagName === 'IMG' && e.target.classList.contains('lightbox')) {
                this.openLightbox(e.target.src, e.target.alt);
            }
        });
    }

    openLightbox(src, alt) {
        const lightbox = document.createElement('div');
        lightbox.className = 'fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50';
        lightbox.innerHTML = `
            <div class="max-w-4xl max-h-full p-4">
                <img src="${src}" alt="${alt}" class="max-w-full max-h-full object-contain">
                <button class="close-lightbox absolute top-4 right-4 text-white text-3xl hover:text-gray-300">&times;</button>
            </div>
        `;

        document.body.appendChild(lightbox);

        lightbox.querySelector('.close-lightbox').addEventListener('click', () => {
            document.body.removeChild(lightbox);
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                document.body.removeChild(lightbox);
            }
        });
    }

    // Contact Form System
    initContactForm() {
        const contactForm = document.querySelector('#contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleContactSubmission(contactForm);
            });
        }

        // Real-time validation
        const formInputs = document.querySelectorAll('.form-input');
        formInputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        switch (field.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
            case 'tel':
                const phoneRegex = /^[\d\s\-\+\(\)]+$/;
                if (!phoneRegex.test(value) || value.length < 10) {
                    isValid = false;
                    errorMessage = 'Please enter a valid phone number';
                }
                break;
            default:
                if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'This field is required';
                }
        }

        this.showFieldValidation(field, isValid, errorMessage);
        return isValid;
    }

    showFieldValidation(field, isValid, message) {
        const errorElement = field.parentNode.querySelector('.field-error');
        
        if (isValid) {
            field.classList.remove('border-red-500');
            field.classList.add('border-green-500');
            if (errorElement) errorElement.textContent = '';
        } else {
            field.classList.remove('border-green-500');
            field.classList.add('border-red-500');
            if (errorElement) errorElement.textContent = message;
        }
    }

    clearFieldError(field) {
        field.classList.remove('border-red-500', 'border-green-500');
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) errorElement.textContent = '';
    }

    handleContactSubmission(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Validate all fields
        const inputs = form.querySelectorAll('.form-input');
        let allValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                allValid = false;
            }
        });

        if (!allValid) {
            this.showFormMessage('Please fix the errors above', 'error');
            return;
        }

        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual endpoint)
        setTimeout(() => {
            this.showFormMessage('Thank you! Your message has been sent successfully.', 'success');
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }

    showFormMessage(message, type) {
        const messageElement = document.createElement('div');
        messageElement.className = `form-message p-4 rounded-lg mb-4 ${
            type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`;
        messageElement.textContent = message;

        const form = document.querySelector('#contact-form');
        form.parentNode.insertBefore(messageElement, form);

        setTimeout(() => {
            messageElement.remove();
        }, 5000);
    }

    // Admin CMS System
    initAdminFeatures() {
        this.checkAdminSession();
        this.initAdminLogin();
        this.initContentEditor();
        this.initMediaUploader();
    }

    checkAdminSession() {
        const adminSession = localStorage.getItem('adminSession');
        if (adminSession) {
            this.isAdmin = true;
            this.currentUser = JSON.parse(adminSession);
            this.showAdminInterface();
        }
    }

    initAdminLogin() {
        const loginForm = document.querySelector('#admin-login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleAdminLogin(loginForm);
            });
        }

        const logoutBtn = document.querySelector('#admin-logout');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.handleAdminLogout());
        }
    }

    handleAdminLogin(form) {
        const formData = new FormData(form);
        const email = formData.get('email');
        const password = formData.get('password');

        // Production credentials
        if (email === 'CASadmin' && password === 'CAS1401JankiSinha') {
            const adminUser = { 
                email: 'CASadmin', 
                name: 'School Administrator',
                loginTime: new Date().toISOString()
            };
            localStorage.setItem('adminSession', JSON.stringify(adminUser));
            this.isAdmin = true;
            this.currentUser = adminUser;
            this.showAdminInterface();
            window.location.href = 'admin.html';
        } else {
            this.showLoginError('Invalid credentials. Please try again.');
        }
    }
    
    showLoginError(message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4';
        errorElement.textContent = message;
        
        const loginForm = document.getElementById('admin-login-form');
        if (loginForm) {
            const existingError = loginForm.parentNode.querySelector('.bg-red-100');
            if (existingError) existingError.remove();
            loginForm.parentNode.insertBefore(errorElement, loginForm);
            
            setTimeout(() => errorElement.remove(), 5000);
        }
    }

    handleAdminLogout() {
        localStorage.removeItem('adminSession');
        this.isAdmin = false;
        this.currentUser = null;
        window.location.href = 'index.html';
    }

    showAdminInterface() {
        // Add admin-specific UI elements
        document.body.classList.add('admin-mode');
        
        // Only add edit buttons if we're on admin page or in admin mode
        if (window.location.pathname.includes('admin.html')) {
            // Add edit buttons to editable content in admin
            const editableElements = document.querySelectorAll('[data-editable]');
            editableElements.forEach(element => {
                const editBtn = document.createElement('button');
                editBtn.className = 'edit-btn absolute top-2 right-2 bg-orange-500 text-white p-2 rounded text-sm';
                editBtn.textContent = 'Edit';
                editBtn.addEventListener('click', () => this.editContent(element));
                element.style.position = 'relative';
                element.appendChild(editBtn);
            });
        }
    }

    initContentEditor() {
        // Initialize WYSIWYG editor for admin
        if (this.isAdmin && window.CKEDITOR) {
            // Initialize CKEditor for editable content areas
        }
    }

    initMediaUploader() {
        const uploadArea = document.querySelector('#media-upload-area');
        if (uploadArea && this.isAdmin) {
            // Initialize drag-and-drop file upload
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
    }

    handleFileUpload(files) {
        Array.from(files).forEach(file => {
            if (file.type.startsWith('image/')) {
                this.uploadImage(file);
            }
        });
    }

    uploadImage(file) {
        // Simulate image upload (replace with actual upload logic)
        const reader = new FileReader();
        reader.onload = (e) => {
            const imageData = {
                id: Date.now(),
                name: file.name,
                url: e.target.result,
                size: file.size,
                type: file.type
            };
            
            // Store in localStorage for demo
            const uploadedImages = JSON.parse(localStorage.getItem('uploadedImages') || '[]');
            uploadedImages.push(imageData);
            localStorage.setItem('uploadedImages', JSON.stringify(uploadedImages));
            
            this.showUploadSuccess(file.name);
        };
        reader.readAsDataURL(file);
    }

    showUploadSuccess(filename) {
        const message = document.createElement('div');
        message.className = 'upload-success bg-green-100 text-green-700 p-4 rounded-lg mb-4';
        message.textContent = `Successfully uploaded: ${filename}`;
        
        const uploadArea = document.querySelector('#media-upload-area');
        uploadArea.parentNode.insertBefore(message, uploadArea);
        
        setTimeout(() => message.remove(), 3000);
    }

    // Content Loading
    loadContent() {
        this.loadContactInfo();
        this.loadRoutines();
    }

    loadContactInfo() {
        // Default contact information
        this.contactInfo = {
            phone1: '9608508156',
            phone2: '8789508120',
            email: 'centralacademyschoolsimdega@gmail.com',
            instagram: 'https://www.instagram.com/simdega_central_academy',
            facebook: 'https://www.facebook.com/share/1GjhwB5vqu',
            mapUrl: 'https://maps.app.goo.gl/DWiGh3EgZSdC6EbL6'
        };

        // Update contact info in the DOM
        this.updateContactDisplay();
    }

    updateContactDisplay() {
        // Update phone numbers
        const phoneElements = document.querySelectorAll('.contact-phone');
        phoneElements.forEach(el => {
            if (el.dataset.phone === '1') el.textContent = this.contactInfo.phone1;
            if (el.dataset.phone === '2') el.textContent = this.contactInfo.phone2;
        });

        // Update email
        const emailElements = document.querySelectorAll('.contact-email');
        emailElements.forEach(el => {
            el.textContent = this.contactInfo.email;
            el.href = `mailto:${this.contactInfo.email}`;
        });

        // Update social links
        const instagramLink = document.querySelector('.instagram-link');
        if (instagramLink) {
            instagramLink.href = this.contactInfo.instagram;
        }

        const facebookLink = document.querySelector('.facebook-link');
        if (facebookLink) {
            facebookLink.href = this.contactInfo.facebook;
        }
    }

    loadRoutines() {
        this.routines = [
            {
                title: 'General Routine (Nursery to Class 2)',
                schedule: '8:40AM - 1:40PM',
                type: 'general',
                classes: 'nursery-2'
            },
            {
                title: 'General Routine (Class 3 to 8)',
                schedule: '8:40AM - 2:00PM',
                type: 'general',
                classes: '3-8'
            },
            {
                title: 'General Saturday (Class 3 to 8)',
                schedule: '7:30AM - 11:30AM',
                type: 'saturday',
                classes: '3-8'
            },
            {
                title: 'General Saturday (Nursery to Class 2)',
                schedule: '7:30AM - 10:40AM',
                type: 'saturday',
                classes: 'nursery-2'
            },
            {
                title: 'Summer Routine (Nursery to Class 2)',
                schedule: '6:40AM - 10:40AM',
                type: 'summer',
                classes: 'nursery-2'
            },
            {
                title: 'Summer Routine (Class 3 to 8)',
                schedule: '6:40AM - 11:40AM',
                type: 'summer',
                classes: '3-8'
            },
            {
                title: 'Summer Saturday (All Classes)',
                schedule: '6:40AM - 11:40AM',
                type: 'summer-saturday',
                classes: 'all'
            }
        ];

        this.renderRoutines();
    }

    renderRoutines() {
        const container = document.querySelector('#routine-container');
        if (!container) return;

        container.innerHTML = '';

        const routineTable = document.createElement('div');
        routineTable.className = 'routine-table bg-white rounded-lg shadow-lg overflow-hidden';
        
        routineTable.innerHTML = `
            <div class="bg-orange-500 text-white p-6">
                <h2 class="text-2xl font-bold">School Timetable</h2>
            </div>
            <div class="p-6">
                <div class="overflow-x-auto">
                    <table class="w-full table-auto">
                        <thead>
                            <tr class="bg-gray-50">
                                <th class="px-4 py-3 text-left font-semibold text-gray-700">Schedule Type</th>
                                <th class="px-4 py-3 text-left font-semibold text-gray-700">Class Group</th>
                                <th class="px-4 py-3 text-left font-semibold text-gray-700">Timing</th>
                            </tr>
                        </thead>
                        <tbody id="routine-tbody">
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        const tbody = routineTable.querySelector('#routine-tbody');
        this.routines.forEach((routine, index) => {
            const row = document.createElement('tr');
            row.className = index % 2 === 0 ? 'bg-white' : 'bg-gray-50';
            row.innerHTML = `
                <td class="px-4 py-3 text-gray-800">${routine.title}</td>
                <td class="px-4 py-3 text-gray-600">${routine.classes}</td>
                <td class="px-4 py-3 text-gray-600 font-medium">${routine.schedule}</td>
            `;
            tbody.appendChild(row);
        });

        container.appendChild(routineTable);
    }

    // Utility Functions
    editContent(element) {
        if (!this.isAdmin) return;
        
        const currentContent = element.textContent;
        const newContent = prompt('Edit content:', currentContent);
        
        if (newContent !== null && newContent !== currentContent) {
            element.textContent = newContent;
            this.saveContentChange(element, newContent);
        }
    }

    saveContentChange(element, content) {
        // Save content change to localStorage or send to server
        const changes = JSON.parse(localStorage.getItem('contentChanges') || '{}');
        changes[element.dataset.editable] = content;
        localStorage.setItem('contentChanges', JSON.stringify(changes));
        
        this.showToast('Content saved successfully!', 'success');
    }

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `fixed top-4 right-4 p-4 rounded-lg text-white z-50 ${
            type === 'success' ? 'bg-green-500' : 
            type === 'error' ? 'bg-red-500' : 'bg-blue-500'
        }`;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 3000);
    }
}

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.schoolWebsite = new SchoolWebsite();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SchoolWebsite;
}cument.addEventListener('DOMContentLoaded', () => {
    window.schoolWebsite = new SchoolWebsite();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SchoolWebsite;
}