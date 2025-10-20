# Central Academy School Website

A complete, mobile-first school website with integrated admin CMS for Central Academy School, Simdega.

## Features

### Frontend Features
- **Mobile-First Design**: Optimized for all devices with responsive layouts
- **Modern UI**: Clean, professional design with school branding
- **Interactive Elements**: Smooth animations, hover effects, and transitions
- **Accessibility**: WCAG compliant with proper contrast ratios and semantic HTML
- **Performance**: Optimized images, lazy loading, and efficient code

### Admin CMS Features
- **Secure Login**: Authentication system for admin access
- **Content Management**: Edit all text content across the website
- **Media Library**: Upload, manage, and organize images
- **Event Management**: Create, edit, and categorize school events
- **Routine Management**: Update school timetables and schedules
- **Contact Management**: Edit contact information and social links
- **Preview Mode**: See changes before publishing

### Pages Included
1. **Homepage** - Hero section, statistics, quick links
2. **About Us** - School history, leadership, mission/vision
3. **Events** - Event gallery with filtering and search
4. **Routine** - School timetables with print functionality
5. **Contact** - Contact form, map, and information
6. **Admin Dashboard** - Complete CMS interface

## Technology Stack

### Frontend
- **HTML5** - Semantic markup
- **Tailwind CSS** - Utility-first CSS framework
- **JavaScript (ES6+)** - Interactive functionality
- **Anime.js** - Smooth animations
- **Google Fonts** - Typography (Inter, Playfair Display)
- **Font Awesome** - Icons

### Backend (Simulated)
- **LocalStorage** - Client-side data persistence
- **JavaScript Classes** - Object-oriented architecture
- **Form Validation** - Real-time input validation
- **File Upload** - Drag-and-drop image upload

## Installation & Setup

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for development)

### Quick Start
1. **Download/Clone** the project files
2. **Navigate** to the project directory
3. **Start** a local server:
   ```bash
   python -m http.server 8000
   ```
4. **Open** your browser and visit `http://localhost:8000`

### File Structure
```
/
├── index.html              # Homepage
├── about.html              # About Us page
├── events.html             # Events gallery
├── routine.html            # School timetables
├── contact.html            # Contact page
├── admin.html              # Admin dashboard
├── main.js                 # Main JavaScript functionality
├── resources/              # Images and assets
│   ├── school_logo_color.png
│   ├── school_building.jpg
│   ├── school_park.jpg
│   ├── art_craft/         # Art & craft images
│   ├── independence_day/    # Independence day images
│   ├── science_exhibition/  # Science exhibition images
│   ├── teachers_day/       # Teachers day images
│   ├── yoga_day/          # Yoga day images
│   └── uploads/           # Admin uploaded images
├── design.md               # Design documentation
├── interaction.md          # Interaction design
├── outline.md              # Project outline
└── README.md               # This file
```

## Admin Access

### Default Login Credentials
- **Email**: `admin@centralacademy.com`
- **Password**: `admin123`

> **Note**: These are demo credentials. In a production environment, implement proper authentication.

### Admin Features
1. **Dashboard** - Overview of website statistics
2. **Content Editor** - Edit text content on any page
3. **Event Manager** - Add, edit, delete events
4. **Media Library** - Upload and manage images
5. **Routine Manager** - Update school schedules
6. **Contact Manager** - Edit contact information
7. **Settings** - Site configuration options

## Content Management

### Editing Text Content
1. Login to admin dashboard
2. Navigate to "Content Editor"
3. Select page and content section
4. Make changes in the text area
5. Click "Save Changes"

### Managing Events
1. Go to "Event Manager" in admin
2. Click "Add Event" to create new event
3. Fill in event details and upload images
4. Select category and date
5. Save the event

### Uploading Images
1. Navigate to "Media Library"
2. Drag and drop images or click to browse
3. Images are automatically optimized
4. Use uploaded images in events or content

## Customization

### Color Scheme
The website uses CSS custom properties for colors:
```css
:root {
    --primary-orange: #D2691E;
    --warm-copper: #B87333;
    --soft-cream: #FFF8DC;
    --charcoal-gray: #36454F;
}
```

### Typography
- **Primary**: Inter (sans-serif)
- **Display**: Playfair Display (serif)

### Responsive Breakpoints
- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+

## Performance Features

### Optimization
- **Image Optimization**: Automatic compression and WebP generation
- **Lazy Loading**: Images load as they enter viewport
- **Minified Assets**: Compressed CSS and JavaScript
- **Browser Caching**: Efficient caching strategies

### Accessibility
- **Semantic HTML**: Proper heading hierarchy and landmarks
- **ARIA Labels**: Screen reader compatibility
- **Keyboard Navigation**: Full keyboard support
- **High Contrast**: 4.5:1 minimum contrast ratio
- **Focus Indicators**: Clear focus states for interactive elements

## Browser Support
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Deployment Options

### Static Hosting (Recommended)
1. **Netlify**: Drag and drop deployment
2. **Vercel**: Git integration with automatic deployments
3. **GitHub Pages**: Free hosting for public repositories
4. **Firebase Hosting**: Google's fast and secure hosting

### Local Server
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js
npx serve .

# PHP
php -S localhost:8000
```

## Development Guidelines

### Adding New Content
1. Update the main.js file with new data
2. Add corresponding HTML structure
3. Implement admin functionality in admin.html
4. Test across different screen sizes

### Modifying Styles
1. Use Tailwind CSS classes where possible
2. Add custom CSS in `<style>` sections
3. Maintain consistent color scheme
4. Test accessibility compliance

### JavaScript Best Practices
1. Use ES6+ features
2. Implement error handling
3. Add comments for complex logic
4. Test across browsers

## Troubleshooting

### Common Issues
1. **Images not loading**: Check file paths and permissions
2. **Admin not working**: Ensure JavaScript is enabled
3. **Mobile layout issues**: Test responsive breakpoints
4. **Form not submitting**: Check validation and required fields

### Browser Console
Open developer tools (F12) to check for:
- JavaScript errors
- Missing resources
- CSS conflicts
- Performance issues

## Security Considerations

### Production Deployment
1. **Change admin credentials**
2. **Implement proper authentication**
3. **Add HTTPS certificate**
4. **Set up regular backups**
5. **Monitor for security updates**

### Data Protection
- Sanitize all user inputs
- Validate file uploads
- Use HTTPS in production
- Implement rate limiting

## Support

For technical support or questions:
1. Check the documentation files
2. Review browser console for errors
3. Test in different browsers
4. Check responsive design on various devices

## License

This project is created for Central Academy School, Simdega. All rights reserved.

---

**Last Updated**: December 2024  
**Version**: 1.0.0  
**Author**: Professional Web Developer