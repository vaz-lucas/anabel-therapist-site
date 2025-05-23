document.addEventListener('DOMContentLoaded', function() {
    // Navegação suave
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });

    // Menu Hamburguer
    const hamburguer = document.querySelector('.hamburguer');
    const navUL = document.querySelector('nav ul');
    
    hamburguer.addEventListener('click', () => {
        hamburguer.classList.toggle('active');
        navUL.classList.toggle('active');
        
        // Animação do hamburguer para X
        const lines = document.querySelectorAll('.hamburguer .line');
        if (hamburguer.classList.contains('active')) {
            lines[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            lines[1].style.opacity = '0';
            lines[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            lines[0].style.transform = 'rotate(0) translate(0)';
            lines[1].style.opacity = '1';
            lines[2].style.transform = 'rotate(0) translate(0)';
        }
    });

     // Fechar menu ao clicar em um link
     document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                hamburguer.classList.remove('active');
                navUL.classList.remove('active');
                const lines = document.querySelectorAll('.hamburguer .line');
                lines[0].style.transform = 'rotate(0) translate(0)';
                lines[1].style.opacity = '1';
                lines[2].style.transform = 'rotate(0) translate(0)';
            }
        });
    });
    
    // Carrossel de depoimentos
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.nav-dot');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentTestimonial = index;
    }
    
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            showTestimonial(index);
        });
    });
    
    // Auto-rotacionar depoimentos
    setInterval(() => {
        let nextIndex = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(nextIndex);
    }, 5000);
    
    // Validação do formulário
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação simples - na prática, você pode querer algo mais robusto
            const inputs = this.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.style.borderColor = 'red';
                    isValid = false;
                } else {
                    input.style.borderColor = '#ddd';
                }
            });
            
            if (isValid) {
                alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                this.reset();
            } else {
                alert('Por favor, preencha todos os campos obrigatórios.');
            }
        });
    }
});