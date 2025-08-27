// Initialize Vanta.js background
if (typeof VANTA !== 'undefined' && VANTA.NET) {
  VANTA.NET({
    el: "#vanta-bg",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 2.00,
    color: 0xFFFF8F,
    backgroundColor: 0x000000,
    points: 10.00,
    maxDistance: 30.00,
    spacing: 25.00
  });
}

// Counter animation
document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.counter');
  const speed = 500;

  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');

    function updateCounter() {
      const count = +counter.innerText;
      const increment = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(updateCounter, 20);
      } else {
        counter.innerText = target;
      }
    }

    updateCounter();
  });

  // Initialize elements with opacity 0 for animation
  const animatedElements = document.querySelectorAll('.card-hover, .skill-icon, .timeline-item');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  // Trigger initial reveal
  setTimeout(revealOnScroll, 300);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Scroll-reveal animation
window.addEventListener('scroll', revealOnScroll);

function revealOnScroll() {
  const elements = document.querySelectorAll('.card-hover, .skill-icon, .timeline-item');

  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementPosition < windowHeight - 100) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }
  });
}

  type="text/javascript"
  src="https://counter1.optistats.ovh/private/counter.js?c=28bm6wk2364uqcxrdq1q89lln6uwjmly&down=async"
  

// 1. First verify EmailJS is loaded
if (typeof emailjs === 'undefined') {
  console.error('EmailJS is not loaded!');

  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
  script.onload = initializeEmailJS;
  document.head.appendChild(script);
} else {
  initializeEmailJS();
}

function initializeEmailJS() {
  try {
    emailjs.init({
      publicKey: "t5TurZih_5xLhhN_i",
    });
    console.log('EmailJS initialized successfully');
    setupForm();
  } catch (error) {
    console.error('EmailJS initialization failed:', error);
    showErrorToUser('Failed to initialize email service. Please refresh the page.');
  }
}

function setupForm() {
  const contactForm = document.getElementById('contactForm');
  
  if (!contactForm) {
    console.error('Contact form not found!');
    return;
  }

  contactForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    
    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = 'Sending...';
    submitButton.disabled = true;

    try {
      await sendMessages();
    } catch (error) {
      console.error('Error sending message:', error);
      showErrorToUser('Failed to send message. Please check your connection and try again.');
    } finally {
      // Restore button state
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;
    }
  });
}

async function sendMessages() {
  // Validate inputs first
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    throw new Error('All fields are required');
  }

  if (!isValidEmail(email)) {
    throw new Error('Please enter a valid email address');
  }

  const params = {
    name: name,
    email: email,
    message: message
  };

  console.log('Sending with params:', params);

  try {
    const response = await emailjs.send(
      "service_cmpj63m", 
      "template_x4hf3xl", 
      params
    );

    console.log("SUCCESS!", response);
    showSuccessToUser('Message sent successfully!');
    document.getElementById("contactForm").reset();
  } catch (error) {
    console.error("EmailJS error:", error);
    // More detailed error handling
    if (error.status === 400) {
      throw new Error('Invalid email parameters');
    } else if (error.status === 500) {
      throw new Error('Server error. Please try again later.');
    } else {
      throw new Error('Failed to send message. Please try again.');
    }
  }
}

// Helper functions
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showSuccessToUser(message) {
  // You can replace this with a nicer notification system
  alert(message);
}

function showErrorToUser(message) {
  // You can replace this with a nicer error display
  alert(message);
}

 document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const closeMenu = document.getElementById('close-menu');
    const mobileDrawer = document.getElementById('mobile-drawer');

    // Toggle drawer open
    menuToggle.addEventListener('click', function() {
      mobileDrawer.classList.remove('-translate-x-full');
      document.body.style.overflow = 'hidden';
    });

    // Toggle drawer closed
    closeMenu.addEventListener('click', function() {
      mobileDrawer.classList.add('-translate-x-full');
      document.body.style.overflow = 'auto';
    });

    // Close drawer when clicking on a link
    document.querySelectorAll('#mobile-drawer a').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        // Close drawer
        mobileDrawer.classList.add('-translate-x-full');
        document.body.style.overflow = 'auto';
        
        // Smooth scroll to target
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });

    // Smooth scroll for regular nav links
    document.querySelectorAll('nav a[href^="#"]').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  });