// WhatsApp Integration
const whatsappNumber = '971582424005'; // Replace with actual WhatsApp number
const whatsappModal = document.getElementById('whatsappModal');
const whatsappModalClose = document.getElementById('whatsappModalClose');
const whatsappCustomMessage = document.getElementById('whatsappCustomMessage');
const whatsappSendCustom = document.getElementById('whatsappSendCustom');

// WhatsApp quick message handlers
document.querySelectorAll('.whatsapp-quick-msg').forEach(btn => {
    btn.addEventListener('click', function() {
        const message = this.getAttribute('data-message');
        openWhatsApp(message);
    });
});

// WhatsApp modal handlers
document.querySelector('.whatsapp-btn').addEventListener('click', function(e) {
    e.preventDefault();
    whatsappModal.classList.add('active');
});

whatsappModalClose.addEventListener('click', function() {
    whatsappModal.classList.remove('active');
});

whatsappModal.addEventListener('click', function(e) {
    if (e.target === whatsappModal) {
        whatsappModal.classList.remove('active');
    }
});

whatsappSendCustom.addEventListener('click', function() {
    const customMessage = whatsappCustomMessage.value.trim();
    if (customMessage) {
        openWhatsApp(customMessage);
    } else {
        showNotification('Please enter a message first', 'error');
    }
});

function openWhatsApp(message) {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    whatsappModal.classList.remove('active');
    whatsappCustomMessage.value = '';
}

// Chatbot Integration
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotContainer = document.getElementById('chatbotContainer');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotMinimize = document.getElementById('chatbotMinimize');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');
const chatbotTyping = document.getElementById('chatbotTyping');
const chatNotification = document.getElementById('chatNotification');

// Chatbot responses database
const chatbotResponses = {
    greetings: [
        "Hello! Welcome to Rabb Businesses. How can I assist you today?",
        "Hi there! I'm here to help you learn about our consultancy services.",
        "Welcome! What would you like to know about Rabb Businesses?"
    ],
    services: {
        general: "We offer 5 main consultancy services:\n• Business Management\n• Marketing Management\n• HR Management\n• E-commerce Management\n• Quality Management\n\nWhich service interests you most?",
        business: "Our Business Management consultancy includes strategic planning, operational optimization, and performance improvement to drive sustainable growth. Would you like to know more details or get a quote?",
        marketing: "Our Marketing Management services cover data-driven strategies, campaign management, and brand positioning to maximize your market reach. We help businesses grow their customer base effectively.",
        hr: "Our HR Management consultancy provides talent acquisition, policy development, training, and compliance support to build high-performing teams. We ensure 100% UAE labor law compliance.",
        ecommerce: "We provide end-to-end e-commerce solutions including platform setup, digital marketing, and logistics integration. Perfect for businesses looking to expand online.",
        quality: "Our Quality Management services include KPI dashboards, quality systems implementation, and audit support to ensure operational excellence and customer satisfaction."
    },
    contact: "You can reach us through:\n📧 Email: info@rabbbusinesses.ae\n📞 Phone: +971-058-2424005\n💬 WhatsApp: Click the WhatsApp button\n📍 Location: UAE\n\nWould you like me to help you get a personalized quote?",
    quote: "I'd be happy to help you get a quote! Please provide:\n• Your company name\n• Service you're interested in\n• Brief description of your needs\n\nOr you can fill out our contact form for a detailed consultation.",
    about: "Rabb Businesses is the UAE's trusted partner in business transformation. Our mission is to empower businesses with innovative consultancy solutions across management, marketing, HR, e-commerce, and quality measurement.",
    default: "I understand you're asking about our services. Let me help you with that! You can ask me about:\n• Our services\n• Getting a quote\n• Contact information\n• About our company\n\nWhat would you like to know?"
};

// Chatbot event listeners
chatbotToggle.addEventListener('click', function() {
    chatbotContainer.classList.toggle('active');
    chatNotification.style.display = 'none';
    if (chatbotContainer.classList.contains('minimized')) {
        chatbotContainer.classList.remove('minimized');
    }
});

chatbotClose.addEventListener('click', function() {
    chatbotContainer.classList.remove('active');
});

chatbotMinimize.addEventListener('click', function() {
    chatbotContainer.classList.toggle('minimized');
});

chatbotSend.addEventListener('click', sendMessage);
chatbotInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Quick option handlers
document.querySelectorAll('.quick-option').forEach(btn => {
    btn.addEventListener('click', function() {
        const message = this.getAttribute('data-message');
        addUserMessage(message);
        processMessage(message);
        this.parentElement.style.display = 'none';
    });
});

function sendMessage() {
    const message = chatbotInput.value.trim();
    if (message) {
        addUserMessage(message);
        chatbotInput.value = '';
        processMessage(message);
    }
}

function addUserMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'user-message';
    messageElement.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-user"></i>
        </div>
        <div class="message-content">
            <p>${message}</p>
        </div>
    `;
    chatbotMessages.appendChild(messageElement);
    scrollToBottom();
}

function addBotMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'bot-message';
    messageElement.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="message-content">
            <p>${message.replace(/\n/g, '<br>')}</p>
        </div>
    `;
    chatbotMessages.appendChild(messageElement);
    scrollToBottom();
}

function showTyping() {
    chatbotTyping.style.display = 'flex';
    scrollToBottom();
}

function hideTyping() {
    chatbotTyping.style.display = 'none';
}

function scrollToBottom() {
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function processMessage(message) {
    showTyping();
    
    setTimeout(() => {
        hideTyping();
        const response = generateResponse(message.toLowerCase());
        addBotMessage(response);
        
        // Add follow-up quick options based on context
        if (message.toLowerCase().includes('service')) {
            addQuickOptions(['Get Quote', 'Contact Info', 'Tell me more']);
        } else if (message.toLowerCase().includes('quote')) {
            addQuickOptions(['Contact Info', 'Our Services', 'WhatsApp Chat']);
        }
        
    }, 1000 + Math.random() * 1000); // Random delay to simulate thinking
}

function generateResponse(message) {
    // Service-related keywords
    if (message.includes('service') || message.includes('what do you do')) {
        return chatbotResponses.services.general;
    }
    
    if (message.includes('business management') || message.includes('strategic planning')) {
        return chatbotResponses.services.business;
    }
    
    if (message.includes('marketing') || message.includes('brand')) {
        return chatbotResponses.services.marketing;
    }
    
    if (message.includes('hr') || message.includes('human resource') || message.includes('talent')) {
        return chatbotResponses.services.hr;
    }
    
    if (message.includes('ecommerce') || message.includes('e-commerce') || message.includes('online')) {
        return chatbotResponses.services.ecommerce;
    }
    
    if (message.includes('quality') || message.includes('audit')) {
        return chatbotResponses.services.quality;
    }
    
    // Contact-related keywords
    if (message.includes('contact') || message.includes('phone') || message.includes('email') || message.includes('reach')) {
        return chatbotResponses.contact;
    }
    
    // Quote-related keywords
    if (message.includes('quote') || message.includes('price') || message.includes('cost') || message.includes('proposal')) {
        return chatbotResponses.quote;
    }
    
    // About company
    if (message.includes('about') || message.includes('company') || message.includes('who are you')) {
        return chatbotResponses.about;
    }
    
    // Greetings
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
        return chatbotResponses.greetings[Math.floor(Math.random() * chatbotResponses.greetings.length)];
    }
    
    // Default response
    return chatbotResponses.default;
}

function addQuickOptions(options) {
    setTimeout(() => {
        const lastBotMessage = chatbotMessages.querySelector('.bot-message:last-child .message-content');
        const quickOptionsDiv = document.createElement('div');
        quickOptionsDiv.className = 'quick-options';
        quickOptionsDiv.style.marginTop = '10px';
        
        options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'quick-option';
            button.textContent = option;
            button.addEventListener('click', function() {
                addUserMessage(option);
                processMessage(option);
                quickOptionsDiv.style.display = 'none';
            });
            quickOptionsDiv.appendChild(button);
        });
        
        lastBotMessage.appendChild(quickOptionsDiv);
        scrollToBottom();
    }, 500);
}

// Auto-show chatbot notification after 30 seconds
setTimeout(() => {
    if (!chatbotContainer.classList.contains('active')) {
        chatNotification.style.display = 'flex';
        
        // Add a welcome message to chat
        setTimeout(() => {
            addBotMessage("👋 Nee// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all FAQ items
        faqItems.forEach(faqItem => {
            faqItem.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    
    // Simple form validation
    if (!formObject.name || !formObject.email || !formObject.message) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    if (!isValidEmail(formObject.email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate form submission (replace with actual form handling)
    showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
    contactForm.reset();
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 350px;
    `;
    
    const notificationContent = notification.querySelector('.notification-content');
    notificationContent.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
    `;
    
    const closeButton = notification.querySelector('.notification-close');
    closeButton.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    const autoRemove = setTimeout(() => {
        removeNotification(notification);
    }, 5000);
    
    // Close button functionality
    closeButton.addEventListener('click', () => {
        clearTimeout(autoRemove);
        removeNotification(notification);
    });
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes to elements
    const animateElements = document.querySelectorAll('.service-card, .vm-card, .blog-card, .testimonial-card, .job-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.clientHeight;
        
        if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add active state styles for navigation
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #2563eb !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Preloader (optional)
window.addEventListener('load', () => {
    const body = document.body;
    body.classList.add('page-transition');
});

// Service card hover effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.background = 'linear-gradient(135deg, #f8fafc, #e2e8f0)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.background = '#f8fafc';
    });
});

// Blog card click handlers
document.querySelectorAll('.read-more').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        showNotification('Blog post feature coming soon!', 'info');
    });
});

// Social media link tracking (optional analytics)
document.querySelectorAll('.social-links a').forEach(link => {
    link.addEventListener('click', function() {
        const platform = this.href.includes('linkedin') ? 'LinkedIn' : 
                         this.href.includes('instagram') ? 'Instagram' :
                         this.href.includes('facebook') ? 'Facebook' : 'Twitter';
        console.log(`Social media click: ${platform}`);
    });
});

// Typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.style.animationDelay = '0s';
        
        // Optional: Uncomment to enable typing effect
        // setTimeout(() => {
        //     typeWriter(heroTitle, originalText, 50);
        // }, 1000);
    }
});

// Performance optimization: Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
// RABB Logo Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Enhanced particle system
    function createAdditionalParticles() {
        const particleContainer = document.querySelector('.rabb-logo-section .particles');
        if (!particleContainer) return;
        
        // Create more particles dynamically
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = -Math.random() * 10 + 's';
            particle.style.animationDuration = (8 + Math.random() * 4) + 's';
            particleContainer.appendChild(particle);
        }
    }
    
    // Logo container interaction effects
    const logoContainer = document.querySelector('.logo-container');
    if (logoContainer) {
        
        // Mouse enter effect
        logoContainer.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.05)';
            this.style.background = 'rgba(255, 255, 255, 0.15)';
            
            // Add temporary glow effect
            this.style.boxShadow = `
                0 40px 80px rgba(0, 0, 0, 0.4),
                inset 0 1px 0 rgba(255, 255, 255, 0.3),
                0 0 50px rgba(255, 255, 255, 0.2)
            `;
        });
        
        // Mouse leave effect
        logoContainer.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.background = 'rgba(255, 255, 255, 0.1)';
            this.style.boxShadow = `
                0 25px 50px rgba(0, 0, 0, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.2)
            `;
        });
        
        // Click effect
        logoContainer.addEventListener('click', function() {
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                z-index: 1000;
            `;
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    }
    
    // Airplane animation enhancement
    const airplaneIcon = document.querySelector('.airplane-icon');
    if (airplaneIcon) {
        // Add random movement variations
        setInterval(() => {
            const randomX = (Math.random() - 0.5) * 20;
            const randomY = (Math.random() - 0.5) * 10;
            const randomRotate = (Math.random() - 0.5) * 10;
            
            airplaneIcon.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;
            
            setTimeout(() => {
                airplaneIcon.style.transform = 'translate(0, 0) rotate(0deg)';
            }, 1000);
        }, 8000);
    }
    
    // Parallax effect for particles
    function handleParallax() {
        const logoSection = document.querySelector('.rabb-logo-section');
        if (!logoSection) return;
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = logoSection.querySelectorAll('.particle');
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.1 + (index % 3) * 0.05;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
    
    // Text animation on scroll
    function handleTextAnimations() {
        const mainBrand = document.querySelector('.main-brand');
        const tagline = document.querySelector('.tagline');
        
        if (!mainBrand || !tagline) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Stagger the text animations
                    setTimeout(() => {
                        mainBrand.style.animation = 'slideInLeft 1s ease-out, glow 3s infinite alternate ease-in-out 1s';
                    }, 200);
                    
                    setTimeout(() => {
                        tagline.style.animation = 'fadeInUp 1s ease-out';
                    }, 600);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(document.querySelector('.logo-container'));
    }
    
    // Background gradient shift
    function animateBackground() {
        const logoSection = document.querySelector('.rabb-logo-section');
        if (!logoSection) return;
        
        let hue = 250;
        setInterval(() => {
            hue = (hue + 1) % 360;
            const gradient = `linear-gradient(135deg, hsl(${hue}, 70%, 65%) 0%, hsl(${(hue + 30) % 360}, 70%, 60%) 100%)`;
            logoSection.style.background = gradient;
        }, 100);
    }
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            0% {
                width: 0;
                height: 0;
                opacity: 1;
            }
            100% {
                width: 300px;
                height: 300px;
                opacity: 0;
            }
        }
        
        .logo-container {
            position: relative;
            overflow: hidden;
            cursor: pointer;
        }
        
        .particle {
            transition: transform 0.1s ease-out;
        }
    `;
    document.head.appendChild(style);
    
    // Initialize all effects
    createAdditionalParticles();
    handleParallax();
    handleTextAnimations();
    
    // Optional: Uncomment for animated background
    // animateBackground();
    
    // Performance optimization
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateAnimations);
            ticking = true;
        }
    }
    
    function updateAnimations() {
        // Batch DOM updates here if needed
        ticking = false;
    }
    
    // Event listeners
    window.addEventListener('scroll', requestTick);
    window.addEventListener('resize', () => {
        // Handle responsive adjustments
        const logoSection = document.querySelector('.rabb-logo-section');
        if (window.innerWidth <= 768 && logoSection) {
            logoSection.style.height = '50vh';
        }
    });
});

// Export functions for external use
window.RabbLogo = {
    // Method to trigger logo animation
    animate: function() {
        const logoContainer = document.querySelector('.logo-container');
        if (logoContainer) {
            logoContainer.style.animation = 'pulse 0.6s ease-out';
            setTimeout(() => {
                logoContainer.style.animation = 'pulse 4s infinite ease-in-out';
            }, 600);
        }
    },
    
    // Method to change logo colors
    setTheme: function(primaryColor, secondaryColor) {
        const logoSection = document.querySelector('.rabb-logo-section');
        if (logoSection) {
            logoSection.style.background = `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`;
        }
    }
};

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
