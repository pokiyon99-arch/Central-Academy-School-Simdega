# Central Academy School Website - Design Style Guide

## Design Philosophy

### Visual Language
**Educational Excellence with Modern Warmth**: The design embodies academic professionalism while maintaining an approachable, family-friendly atmosphere. We balance institutional credibility with the vibrant energy of a learning environment.

### Color Palette
**Primary Colors** (extracted from school logo):
- **Deep Orange**: `#D2691E` - Primary brand color, warm and inviting
- **Warm Copper**: `#B87333` - Secondary accent, sophisticated tone
- **Soft Cream**: `#FFF8DC` - Background and light sections
- **Charcoal Gray**: `#36454F` - Text and professional elements

**Supporting Colors**:
- **Forest Green**: `#228B22` - Success states, nature elements
- **Sky Blue**: `#87CEEB` - Information, calm sections
- **Pure White**: `#FFFFFF` - Clean backgrounds, cards
- **Light Gray**: `#F5F5F5` - Subtle backgrounds, dividers

### Typography
**Primary Font**: "Inter" - Modern, highly legible sans-serif
- **Display Text**: Inter Bold (700) - Headlines, hero text
- **Body Text**: Inter Regular (400) - Content, descriptions
- **Accent Text**: Inter Medium (500) - Subheadings, labels

**Secondary Font**: "Playfair Display" - Elegant serif for special occasions
- **Formal Headers**: Playfair Display Bold - Awards, certificates
- **Quote Text**: Playfair Display Italic - Testimonials

## Visual Effects & Styling

### Hero Section Design
**Background Treatment**: 
- **Image Composition**: School building and park images blended with soft overlay
- **Gradient Overlay**: Subtle orange-to-cream gradient (opacity: 0.3)
- **Text Treatment**: Large, bold typography with subtle text shadow
- **Animation**: Gentle fade-in on scroll, parallax effect on background

### Interactive Elements
**Buttons & Links**:
- **Primary Button**: Orange background, white text, subtle shadow
- **Secondary Button**: White background, orange border, orange text
- **Hover Effect**: Gentle scale (1.05x) with shadow enhancement
- **Transition**: Smooth 0.3s ease-in-out

**Cards & Containers**:
- **Border Radius**: 12px for modern, friendly appearance
- **Shadow**: Soft drop shadow (0 4px 12px rgba(0,0,0,0.1))
- **Hover State**: Lift effect with increased shadow

### Animation Library Usage
**Anime.js Effects**:
- **Text Animation**: Staggered letter appearance for hero title
- **Card Reveal**: Sequential fade-in for event cards
- **Scroll Triggers**: Elements animate when entering viewport
- **Loading States**: Smooth transitions between content states

**Background Effects**:
- **Particle System**: Subtle floating particles using p5.js (very light)
- **Gradient Flow**: Animated background gradients for sections
- **Image Carousel**: Smooth transitions for hero image rotation

### Layout & Grid System
**Mobile-First Approach**:
- **Breakpoints**: 
  - Mobile: 320px - 768px
  - Tablet: 768px - 1024px  
  - Desktop: 1024px+
- **Grid**: CSS Grid with Tailwind utilities
- **Spacing**: Consistent 8px base unit system
- **Containers**: Max-width 1200px with centered alignment

### Image Treatment
**Hero Images**:
- **Aspect Ratio**: 16:9 for desktop, 4:3 for mobile
- **Processing**: Auto WebP generation with JPEG fallback
- **Loading**: Progressive blur-to-sharp reveal
- **Overlay**: Subtle color filter matching brand palette

**Event Gallery**:
- **Grid Layout**: Masonry-style with consistent gaps
- **Image Ratio**: Maintain original aspect ratios
- **Hover Effect**: Zoom (1.1x) with overlay text
- **Lightbox**: Smooth modal transitions with keyboard navigation

### Accessibility Features
**Visual Accessibility**:
- **Contrast Ratios**: Minimum 4.5:1 for all text
- **Focus Indicators**: Clear orange outline for keyboard navigation
- **Color Independence**: Information never conveyed by color alone
- **Text Scaling**: Support up to 200% browser zoom

## Component Styling

### Navigation
- **Style**: Clean horizontal bar with logo left, menu right
- **Mobile**: Hamburger menu with slide-out panel
- **Active State**: Orange underline for current page
- **Sticky Behavior**: Fixed position with background blur

### Event Cards
- **Layout**: Image top, content bottom with consistent spacing
- **Category Badge**: Small colored tag in top-right corner
- **Date Display**: Prominent date with calendar icon
- **Action Button**: "View Details" with arrow icon

### Timetable Display
- **Table Style**: Clean borders with alternating row colors
- **Time Highlight**: Orange background for current time slot
- **Mobile View**: Horizontal scroll with sticky column headers
- **Print Style**: Optimized layout for printing

### Contact Form
- **Field Styling**: Clean inputs with orange focus borders
- **Validation**: Real-time feedback with green/red indicators
- **Submit Button**: Loading state with spinner animation
- **Success Message**: Green confirmation with checkmark icon

## Technical Implementation

### CSS Architecture
- **Framework**: Tailwind CSS as base
- **Custom Properties**: CSS variables for brand colors
- **Component Classes**: Reusable utility classes
- **Responsive Design**: Mobile-first media queries

### Performance Optimizations
- **Critical CSS**: Inline above-the-fold styles
- **Font Loading**: Font-display: swap for web fonts
- **Image Optimization**: Automatic responsive images
- **Animation Performance**: GPU-accelerated transforms only

This design system creates a cohesive, professional, and welcoming digital presence for Central Academy School that reflects their commitment to educational excellence while being highly functional and accessible to all users.