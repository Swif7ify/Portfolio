# 🚀 Earl Romeo Ordovez - Portfolio

A modern, responsive portfolio website built with Vue.js and Vite, showcasing my projects, skills, and professional experience as a Full-Stack Developer and Game Developer.

![Portfolio Preview](https://img.shields.io/badge/Portfolio-Live-brightgreen)
![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?logo=vue.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-Latest-646CFF?logo=vite&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-Animation-88CE02?logo=greensock&logoColor=white)

## ✨ Features

-   **🎨 Modern Design**: Clean, professional interface with smooth animations
-   **📱 Fully Responsive**: Optimized for desktop, tablet, and mobile devices
-   **🌟 Interactive Animations**: GSAP-powered smooth scrolling and transitions
-   **📧 Contact Form**: EmailJS integration for direct communication
-   **🎯 Project Showcase**: Interactive project gallery with detailed information
-   **⚡ Fast Performance**: Built with Vite for optimal loading speeds
-   **🎭 Floating Shapes**: Dynamic background animations for visual appeal

## 🛠️ Tech Stack

-   **Frontend**: Vue.js 3 (Composition API)
-   **Build Tool**: Vite
-   **Animations**: GSAP (GreenSock Animation Platform)
-   **Email Service**: EmailJS
-   **Styling**: CSS3 with custom animations
-   **Icons**: Custom SVG icons
-   **Font**: Modern system font stack

## 📁 Project Structure

```
Portfolio/
├── public/
│   ├── Projects/           # Project screenshots
│   ├── myImage/           # Personal images
│   └── resume/            # Resume files
├── src/
│   ├── assets/
│   │   └── app.css        # Main stylesheet
│   ├── components/
│   │   └── FloatingShapes.vue  # Background animations
│   ├── composables/
│   │   └── Toast.js       # Toast notifications
│   ├── App.vue            # Main application component
│   └── main.js            # Application entry point
├── index.html
├── package.json
├── vite.config.mjs
└── README.md
```

## 🚀 Quick Start

### Prerequisites

-   Node.js (v16 or higher)
-   npm or yarn

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/Swif7ify/Portfolio.git
    cd Portfolio
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Start development server**

    ```bash
    npm run dev
    ```

4. **Open in browser**
    ```
    http://localhost:5173
    ```

## 🎯 Sections

### 🏠 Hero Section

-   Personal introduction with animated text
-   Call-to-action buttons
-   Professional statistics counter

### 💼 Featured Projects

-   **BootTek**: Online coding platform
-   **Clashing Grid**: Python multiplayer game
-   **HydroBot Simulator**: 3D underwater robotics simulation
-   **Autonomous Robot Pathfinding**: AI-driven navigation simulator

### 📋 All Projects Modal

Interactive modal showcasing 11+ projects across various categories:

-   **Web Development**: BootTek, SmartPocket, Cartify
-   **Game Development**: Clashing Grid, All In
-   **Robotics**: HydroBot, Autonomous Pathfinding
-   **Automation**: MonkeyType Auto Typer, MCServerhost Automation
-   **Applications**: OCPL Logging, Advanced Calculator

### 👨‍💻 About Section

-   Professional background
-   Technical skills showcase
-   Downloadable resume

### 🔧 Services

-   Web Development
-   Game Development
-   Application Development
-   Automation & DevOps
-   Prototyping

### 📞 Contact

-   Direct email integration via EmailJS
-   Social media links (GitHub, LinkedIn, Facebook)
-   Professional contact information

## 🎨 Design Features

-   **Smooth Scrolling**: GSAP ScrollSmoother implementation
-   **Scroll Animations**: Element animations triggered on scroll
-   **Hover Effects**: Interactive button and card animations
-   **Loading Screen**: Animated name reveal on page load
-   **Floating Background**: Dynamic animated shapes
-   **Responsive Grid**: CSS Grid and Flexbox layouts

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints for:

-   **Desktop**: 1200px and up
-   **Tablet**: 768px - 1199px
-   **Mobile**: 320px - 767px

## 🔧 Configuration

### EmailJS Setup

1. Create an EmailJS account
2. Update service and template IDs in `App.vue`:
    ```javascript
    emailjs.send(
    	"your_service_id",
    	"your_template_id",
    	// ... form data
    	"your_public_key"
    );
    ```

### Adding New Projects

Update the `additionalProjects` array in `App.vue` with:

```javascript
{
  title: "Project Name",
  category: "Category",
  description: "Project description",
  image: "Projects/image.png",
  tags: ["Tech1", "Tech2"],
  link: "https://project-link.com",
  status: "Completed"
}
```

## 🌟 Performance

-   **Lighthouse Score**: 95+ Performance
-   **First Contentful Paint**: < 1.5s
-   **Largest Contentful Paint**: < 2.5s
-   **Cumulative Layout Shift**: < 0.1

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Earl Romeo Ordovez**

-   🌐 Website: [Portfolio](https://swif7ify.github.io/Portfolio/)
-   💼 LinkedIn: [earl-romeo-ordovez](https://linkedin.com/in/earl-romeo-ordovez-a73a36322)
-   🐱 GitHub: [@Swif7ify](https://github.com/Swif7ify)
-   📧 Email: earl.coding@gmail.com

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Swif7ify/Portfolio/issues).

## ⭐ Show your support

Give a ⭐️ if you like this project!

---

**Made with ❤️ by Earl Romeo Ordovez**
