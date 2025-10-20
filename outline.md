# Central Academy School Website - Project Outline

## File Structure
```
/mnt/okcomputer/output/
├── index.html                 # Main landing page with hero section
├── about.html                 # About school and leadership
├── events.html                # Events gallery with filtering
├── routine.html               # Timetable and schedules
├── contact.html               # Contact form and information
├── admin.html                 # Admin dashboard and CMS
├── main.js                    # Main JavaScript functionality
├── resources/                 # Local assets directory
│   ├── school_logo_color.png
│   ├── school_building.jpg
│   ├── school_park.jpg
│   ├── art_craft/             # Art & craft event images
│   ├── independence_day/        # Independence day images
│   ├── science_exhibition/      # Science exhibition images
│   ├── teachers_day/           # Teachers day images
│   ├── yoga_day/              # Yoga day images
│   └── uploads/               # Admin uploaded content
├── interaction.md             # Interaction design documentation
├── design.md                  # Design style guide
├── outline.md                 # This project outline
└── README.md                  # Deployment and usage instructions
```

## Page Breakdown

### 1. index.html - Main Landing Page
**Purpose**: First impression, hero section, quick stats
**Sections**:
- Navigation bar with logo and menu
- Hero section with school building/park background
- School statistics cards (500+ students, 15+ teachers, etc.)
- Quick links to important sections
- Footer with contact information

**Key Features**:
- Animated hero text with stagger effect
- Responsive image carousel
- Interactive statistics counters
- Mobile-optimized layout

### 2. about.html - About School & Leadership
**Purpose**: School history, leadership, mission/vision
**Sections**:
- School introduction and history
- Director & Principal profile (Janki Sinha, established 2012)
- Mission and vision statements
- Facilities showcase (excluding Science Lab and Library per requirements)
- Achievement highlights

**Key Features**:
- Timeline-style layout for history
- Professional photo galleries
- Animated text reveals on scroll
- Accessible content structure

### 3. events.html - Events Gallery
**Purpose**: Showcase school events and activities
**Sections**:
- Event category filters (Upcoming, Past, Art & Craft, Science, Cultural, Yoga Day)
- Image gallery with masonry layout
- Event details modal/lightbox
- Search and filter functionality

**Key Features**:
- Dynamic filtering system
- Lightbox gallery with navigation
- Category-based organization
- Mobile touch gestures

**Event Categories**:
- Art & Craft: 8 images (art and craft1-8)
- Independence Day: 7 images (independence day1-7)
- Science Exhibition: 6 images (science exhibition1-6)
- Teachers Day: 6 images (teachers day1-6)
- Yoga Day: 7 images (yoga day1-7) - added to Past Events

### 4. routine.html - Timetable & Schedules
**Purpose**: Display school schedules and routines
**Sections**:
- General routine (Nursery-2 and 3-8)
- Summer routine variations
- Saturday special schedules
- Printable timetable option

**Key Features**:
- Responsive table layout
- Tabbed interface for different routines
- Mobile horizontal scroll
- Print-friendly styling

**Content**:
```
General routine nur to 2 - 8:40AM - 1:40PM
General Routine 3 to 8 - 8:40AM - 2:00PM
General Saturday time 3 to 8 - 7:30AM - 11:30AM
General Saturday nur to 2 - 7:30AM - 10:40AM
SUMMER ROUTINE nur to 2 - 6:40AM - 10:40AM
Summer routine 3 to 8 - 6:40AM - 11:40AM
Summer time Saturday - 6:40AM - 11:40AM (same as every day)
```

### 5. contact.html - Contact Information
**Purpose**: Contact details, location, inquiry form
**Sections**:
- Contact information display
- Interactive contact form
- Google Maps embed
- Social media links
- Emergency contact numbers

**Key Features**:
- Form validation with real-time feedback
- Google Maps integration
- Social media integration
- Mobile-optimized contact cards

**Contact Details**:
- Phone: 9608508156, 8789508120
- Email: centralacademyschoolsimdega@gmail.com
- Instagram: https://www.instagram.com/simdega_central_academy
- Facebook: https://www.facebook.com/share/1GjhwB5vqu
- Google Maps: https://maps.app.goo.gl/DWiGh3EgZSdC6EbL6

### 6. admin.html - Admin Dashboard & CMS
**Purpose**: Content management system for school staff
**Sections**:
- Secure login interface
- Dashboard with site statistics
- Content editor for all pages
- Media upload and management
- Event management interface
- Routine/timetable editor
- Contact information management
- User management (admin accounts)

**Key Features**:
- Authentication system
- WYSIWYG content editor
- File upload with drag-and-drop
- Image optimization and compression
- Revision history and backup
- Mobile-responsive admin interface

## Technical Implementation

### JavaScript Functionality (main.js)
**Core Features**:
- Navigation and routing
- Image lazy loading and optimization
- Form validation and submission
- Admin authentication and session management
- Content editing and saving
- Event filtering and search
- Contact form processing
- Google Maps integration

**Libraries Used**:
- Anime.js for animations
- Tailwind CSS for styling
- Custom JavaScript for CMS functionality
- Local storage for admin sessions

### Responsive Design
**Breakpoints**:
- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+

**Mobile Optimizations**:
- Touch-friendly interface
- Swipe gestures for galleries
- Optimized image sizes
- Simplified navigation
- Fast loading times

### Performance Features
- Image compression and WebP generation
- Lazy loading for images
- CSS and JavaScript minification
- Browser caching strategies
- Progressive web app features

### Accessibility Features
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- High contrast color ratios
- Screen reader compatibility
- Focus management

## Content Management System

### Admin Features
- **Content Editing**: Edit any text on any page
- **Image Management**: Upload, crop, reorder images
- **Event Management**: Add, edit, delete events with categories
- **Routine Management**: Edit timetable entries
- **Contact Management**: Update contact details and social links
- **User Management**: Admin account creation and management

### Security Features
- Secure login authentication
- Session timeout management
- Input sanitization and validation
- File upload restrictions
- Admin action logging

### Media Management
- Automatic image optimization
- WebP generation with JPEG fallback
- Responsive image sizes
- Alt text management
- Image compression

This comprehensive structure ensures a professional, fully-functional school website with complete content management capabilities, meeting all requirements for performance, accessibility, and user experience.