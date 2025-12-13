// DOM Elements
const urlForm = document.getElementById('urlForm');
const urlInput = document.getElementById('urlInput');
const errorMessage = document.getElementById('errorMessage');
const shortenedLinks = document.getElementById('shortenedLinks');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

// Sample data for shortened URLs (simulating API response)
const shortenedURLs = [
    { original: 'https://www.frontendmentor.io', short: 'https://reLink/AitKyk' },
    { original: 'https://twitter.com/frontendmentor', short: 'https://reLink/gxOXp9' },
    { original: 'https://www.linkedin.com/company/frontend-mentor', short: 'https://reLink/gob3X9' }
];

// Initialize with sample data
document.addEventListener('DOMContentLoaded', () => {
    shortenedURLs.forEach(url => {
        createLinkElement(url.original, url.short);
    });
});

// Form Submission
urlForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const url = urlInput.value.trim();

    // Reset error state
    urlInput.classList.remove('error');
    errorMessage.classList.remove('show');

    // Validate URL
    if (!url) {
        showError('Please add a link');
        return;
    }

    if (!isValidUrl(url)) {
        showError('Please enter a valid URL');
        return;
    }

    // Simulate API call
    shortenURL(url);
});

// Validate URL
function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

// Show error message
function showError(message) {
    urlInput.classList.add('error');
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
}

// Simulate URL shortening
function shortenURL(originalUrl) {
    // Show loading state
    const submitBtn = urlForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Shortening...';
    submitBtn.disabled = true;

    // Simulate API delay
    setTimeout(() => {
        // Generate a fake shortened URL
        const randomId = Math.random().toString(36).substring(2, 8);
        const shortUrl = `https://shrt.ly/${randomId}`;

        // Create link element
        createLinkElement(originalUrl, shortUrl);

        // Reset form
        urlInput.value = '';
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1000);
}

// Create and display shortened link element
function createLinkElement(originalUrl, shortUrl) {
    const linkDiv = document.createElement('div');
    linkDiv.className = 'link-result';

    linkDiv.innerHTML = `
    <div class="original-url">${originalUrl}</div>
    <div class="link-actions">
      <div class="shortened-url">${shortUrl}</div>
      <button class="copy-btn">Copy</button>
    </div>
  `;

    // Add animation
    linkDiv.style.animation = 'fadeIn 0.5s ease';

    // Insert at the top
    if (shortenedLinks.firstChild) {
        shortenedLinks.insertBefore(linkDiv, shortenedLinks.firstChild);
    } else {
        shortenedLinks.appendChild(linkDiv);
    }

    // Add copy functionality
    const copyBtn = linkDiv.querySelector('.copy-btn');
    copyBtn.addEventListener('click', () => copyToClipboard(shortUrl, copyBtn));
}

// Copy to clipboard
function copyToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(() => {
        // Visual feedback
        button.textContent = 'Copied!';
        button.classList.add('copied');

        // Reset after 3 seconds
        setTimeout(() => {
            button.textContent = 'Copy';
            button.classList.remove('copied');
        }, 3000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
        alert('Failed to copy to clipboard');
    });
}

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');

    // Animate hamburger to X
    const bars = menuToggle.querySelectorAll('.bar');
    if (navMenu.classList.contains('active')) {
        bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');

        const bars = menuToggle.querySelectorAll('.bar');
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    }
});

// Close mobile menu on resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');

        const bars = menuToggle.querySelectorAll('.bar');
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    }
});

// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });

            // Close mobile menu if open
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
});