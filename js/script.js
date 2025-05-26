document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('nav ul');
    
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('show');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('show');
        });
    });
    
    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        testimonials[index].classList.add('active');
        currentTestimonial = index;
    }
    
    prevBtn.addEventListener('click', function() {
        let newIndex = currentTestimonial - 1;
        if (newIndex < 0) {
            newIndex = testimonials.length - 1;
        }
        showTestimonial(newIndex);
    });
    
    nextBtn.addEventListener('click', function() {
        let newIndex = currentTestimonial + 1;
        if (newIndex >= testimonials.length) {
            newIndex = 0;
        }
        showTestimonial(newIndex);
    });
    
    // Auto-rotate testimonials
    let testimonialInterval = setInterval(() => {
        let newIndex = currentTestimonial + 1;
        if (newIndex >= testimonials.length) {
            newIndex = 0;
        }
        showTestimonial(newIndex);
    }, 5000);
    
    // Pause auto-rotation on hover
    const testimonialSlider = document.querySelector('.testimonial-slider');
    testimonialSlider.addEventListener('mouseenter', function() {
        clearInterval(testimonialInterval);
    });
    
    testimonialSlider.addEventListener('mouseleave', function() {
        testimonialInterval = setInterval(() => {
            let newIndex = currentTestimonial + 1;
            if (newIndex >= testimonials.length) {
                newIndex = 0;
            }
            showTestimonial(newIndex);
        }, 5000);
    });
    
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            this.classList.toggle('active');
            const answer = this.nextElementSibling;
            
            if (this.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = '0';
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Contact Form Submission
    const contactForm = document.getElementById('businessContactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData.entries());
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', formValues);
            
            // Show success message
            alert('Thank you for your message! We will contact you soon.');
            
            // Reset form
            this.reset();
        });
    }
    
    // Scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.classList.add('scroll-to-top');
    document.body.appendChild(scrollToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
// Add this at the end of your existing script.js file

// WhatsApp Chat Button
const whatsappBtn = document.createElement('a');
whatsappBtn.href = "https://wa.me/971 50 569 5888"; // Replace with your WhatsApp number
whatsappBtn.className = "whatsapp-btn";
whatsappBtn.target = "_blank";
whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
document.body.appendChild(whatsappBtn);

// AI Chat Service
const aiChatBtn = document.createElement('button');
aiChatBtn.className = "ai-chat-btn";
aiChatBtn.innerHTML = '<i class="fas fa-robot"></i>';
document.body.appendChild(aiChatBtn);

const aiChatWindow = document.createElement('div');
aiChatWindow.className = "ai-chat-window";
aiChatWindow.innerHTML = `
    <div class="ai-chat-header">
        <h4>Rabb Businesses AI Assistant</h4>
        <button class="close-chat"><i class="fas fa-times"></i></button>
    </div>
    <div class="ai-chat-body"></div>
    <div class="ai-chat-input">
        <input type="text" placeholder="Ask me anything...">
        <button class="send-btn"><i class="fas fa-paper-plane"></i></button>
    </div>
`;
document.body.appendChild(aiChatWindow);

// Toggle chat window
aiChatBtn.addEventListener('click', function() {
    aiChatWindow.classList.toggle('active');
});

document.querySelector('.close-chat').addEventListener('click', function() {
    aiChatWindow.classList.remove('active');
});

// Add message to chat
function addMessage(content, sender) {
    const chatBody = document.querySelector('.ai-chat-body');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}-message`;
    messageDiv.textContent = content;
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Simple AI response logic
document.querySelector('.send-btn').addEventListener('click', sendMessage);

document.querySelector('.ai-chat-input input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const input = document.querySelector('.ai-chat-input input');
    const message = input.value.trim();
    
    if (message) {
        addMessage(message, 'user');
        input.value = '';
        
        // Simulate AI response
        setTimeout(() => {
            const responses = [
                "Thank you for your question. Our team specializes in business management consultancy and can help you with that.",
                "For HR-related inquiries, we recommend checking our HR consultancy services page.",
                "We offer comprehensive e-commerce solutions. Would you like more information about our packages?",
                "That's a great question! One of our consultants will be able to provide detailed advice on this matter.",
                "We have several resources on our blog that might help answer your question. Would you like me to direct you there?"
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addMessage(randomResponse, 'ai');
        }, 1000);
    }
}

// Initial greeting message
window.addEventListener('load', function() {
    setTimeout(() => {
        addMessage("Hello! I'm the Rabb Businesses AI assistant. How can I help you today?", 'ai');
    }, 1500);
});
