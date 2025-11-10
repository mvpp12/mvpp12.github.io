# Personal Portfolio Website

A modern, responsive personal portfolio website built with Bootstrap 5, featuring a clean design and smooth animations.

## 🚀 Features

- **Responsive Design**: Works perfectly on all devices (desktop, tablet, mobile)
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Bootstrap 5**: Latest Bootstrap framework for consistent styling
- **Font Awesome Icons**: Beautiful icons throughout the site
- **Smooth Scrolling**: Enhanced navigation experience
- **Interactive Elements**: Hover effects, animations, and transitions
- **SEO Friendly**: Proper HTML structure and meta tags
- **Fast Loading**: Optimized CSS and JavaScript

## 📁 Project Structure

```
Personal portfolio/
├── index.html          # Main HTML file
├── styles.css          # Custom CSS styles
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## 🛠️ Setup Instructions

### 1. Clone or Download
- Download all files to your local machine
- Or clone this repository if it's on GitHub

### 2. Customize Your Information
Edit the `index.html` file and replace the following placeholders:

#### Personal Information
- **Name**: Replace "Your Name" with your actual name
- **Title**: Change "Full Stack Developer" to your profession
- **Description**: Update the hero section description
- **About Section**: Modify the about me content
- **Contact Info**: Update email, phone, and location

#### Profile Image
Replace the placeholder image URL:
```html
<img src="https://via.placeholder.com/400x400/007bff/ffffff?text=Your+Photo" 
     alt="Profile Picture" class="img-fluid rounded-circle shadow-lg">
```

#### Skills Section
Update the skills with your actual technologies:
- Modify the skill names and progress percentages
- Change the Font Awesome icons to match your technologies
- Add or remove skill cards as needed

#### Projects Section
Replace the sample projects with your actual work:
- Update project titles and descriptions
- Replace placeholder images with your project screenshots
- Update the technology badges
- Add your project links (GitHub, live demo)

#### Contact Section
Update your contact information:
- Email address
- Phone number
- Location
- Social media links (GitHub, LinkedIn, Twitter, Instagram)

### 3. Customize Colors and Styling
Edit `styles.css` to match your brand:

#### Primary Colors
```css
/* Change these color values */
.btn-primary {
    background: linear-gradient(45deg, #007bff, #0056b3);
}

.section-title::after {
    background: linear-gradient(45deg, #007bff, #0056b3);
}
```

#### Hero Section Background
```css
.hero-section {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### 4. Add Your Projects
For each project, update:
- Project title
- Description
- Technologies used
- Project image
- Links to live demo and GitHub repository

### 5. Test Your Website
- Open `index.html` in your web browser
- Test all navigation links
- Check responsiveness on different screen sizes
- Verify all animations and interactions work properly

## 🎨 Customization Options

### Adding New Sections
1. Create a new section in `index.html`
2. Add corresponding navigation link
3. Style the section in `styles.css`
4. Add any JavaScript functionality in `script.js`

### Changing Animations
Modify animation properties in `styles.css`:
```css
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
```

### Adding a Contact Form
1. Add a form element in the contact section
2. Include form validation in `script.js`
3. Connect to a backend service or email service

## 📱 Responsive Breakpoints

The website uses Bootstrap's responsive breakpoints:
- **Mobile**: < 576px
- **Tablet**: 576px - 768px
- **Desktop**: > 768px

## 🌐 Deployment Options

### GitHub Pages
1. Push your code to a GitHub repository
2. Go to repository Settings > Pages
3. Select source branch (usually `main`)
4. Your site will be available at `https://username.github.io/repository-name`

### Netlify
1. Drag and drop your project folder to Netlify
2. Or connect your GitHub repository
3. Your site will be deployed automatically

### Vercel
1. Import your GitHub repository to Vercel
2. Deploy with zero configuration
3. Get a custom domain and SSL certificate

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Internet Explorer 11+

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio. If you make improvements, consider submitting a pull request!

## 📞 Support

If you have any questions or need help customizing your portfolio, feel free to reach out!

---

**Happy coding! 🚀**



