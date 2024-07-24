document.addEventListener('scroll', function() {
    const aboutSection = document.getElementById('about');
    const gotoTopButton = document.querySelector('.goto-top');

    const aboutSectionTop = aboutSection.getBoundingClientRect().top;
    const aboutSectionHeight = aboutSection.getBoundingClientRect().height;
    const scrollPosition = window.scrollY + window.innerHeight;

    const showButtonPosition = aboutSection.offsetTop + (aboutSectionHeight / 2);

    if (scrollPosition >= showButtonPosition) {
        gotoTopButton.classList.add('show');
    } else {
        gotoTopButton.classList.remove('show');
    }
});

document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    emailjs.sendForm('service_8frxkbn', 'template_lomyfqk', this)
      .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        alert('Thank you, your message has been sent!');
        document.getElementById('contact-form').reset();
      }, function(error) {
        console.log('FAILED...', error);
        alert('Failed to send the message. Please try again later.');
      });
  });