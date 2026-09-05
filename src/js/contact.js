// Contact section animations
export function initContact() {
  const form = document.querySelector('form');
  if (!form) return;
  
  // Form label animation on focus
  const inputs = form.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    const label = input.closest('.form-group').querySelector('label');
    if (!label) return;
    
    input.addEventListener('focus', () => {
      gsap.to(label, { y: -20, duration: 0.3 });
    });
    
    input.addEventListener('blur', () => {
      if (!input.value) {
        gsap.to(label, { y: 0, duration: 0.3 });
      }
    });
  });
  
  // Form submit handling
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // In a static site, we'll use a placeholder endpoint
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // POST to placeholder endpoint (Formspree or similar)
    fetch('https://formspree.io/f/your-form-endpoint', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        // Success - show thank you message
        const thankYou = document.createElement('div');
        thankYou.className = 'mt-4 p-4 rounded-lg bg-bg text-fg';
        thankYou.textContent = 'Message sent successfully!';
        form.parentNode.replaceChild(thankYou, form);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      // Show error state
      const errorDiv = document.createElement('div');
      errorDiv.className = 'mt-4 p-4 rounded-lg bg-red-50 text-red-400';
      errorDiv.textContent = 'Error sending message. Please try again.';
      form.parentNode.insertBefore(errorDiv, form.nextSibling);
    });
  });
  
  // Reduced motion fallback
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // No hover effects for inputs
  }
}