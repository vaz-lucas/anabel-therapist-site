document.addEventListener("DOMContentLoaded", function () {
  // Navegação suave
  document.querySelectorAll("nav a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    });
  });

  // Menu Hamburguer
  const hamburguer = document.querySelector(".hamburguer");
  const navUL = document.querySelector("nav ul");

  hamburguer.addEventListener("click", () => {
    hamburguer.classList.toggle("active");
    navUL.classList.toggle("active");

    // Animação do hamburguer para X
    const lines = document.querySelectorAll(".hamburguer .line");
    if (hamburguer.classList.contains("active")) {
      lines[0].style.transform = "rotate(-45deg) translate(-5px, 6px)";
      lines[1].style.opacity = "0";
      lines[2].style.transform = "rotate(45deg) translate(-5px, -6px)";
    } else {
      lines[0].style.transform = "rotate(0) translate(0)";
      lines[1].style.opacity = "1";
      lines[2].style.transform = "rotate(0) translate(0)";
    }
  });

  // Fechar menu ao clicar em um link
  document.querySelectorAll("nav ul li a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        hamburguer.classList.remove("active");
        navUL.classList.remove("active");
        const lines = document.querySelectorAll(".hamburguer .line");
        lines[0].style.transform = "rotate(0) translate(0)";
        lines[1].style.opacity = "1";
        lines[2].style.transform = "rotate(0) translate(0)";
      }
    });
  });

  // Carrossel de depoimentos
  const testimonials = document.querySelectorAll(".testimonial");
  const dots = document.querySelectorAll(".nav-dot");
  let currentTestimonial = 0;

  function showTestimonial(index) {
    testimonials.forEach((testimonial) =>
      testimonial.classList.remove("active"),
    );
    dots.forEach((dot) => dot.classList.remove("active"));

    testimonials[index].classList.add("active");
    dots[index].classList.add("active");
    currentTestimonial = index;
  }

  dots.forEach((dot) => {
    dot.addEventListener("click", function () {
      const index = parseInt(this.getAttribute("data-index"));
      showTestimonial(index);
    });
  });

  // Auto-rotacionar depoimentos
  setInterval(() => {
    let nextIndex = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(nextIndex);
  }, 5000);

  // FAQ

  const question = document.querySelectorAll(".question");
  const answer = document.querySelectorAll(".answer");
  const arrow = document.querySelectorAll(".arrow");

  for (let i = 0; i < question.length; i++) {
    question[i].addEventListener("click", () => {
      answer[i].classList.toggle("answer-opened");
      arrow[i].classList.toggle("arrow-rotated");
    });
  }

  // Carousel

  const teamMembers = [
    { name: "Emily Kim", role: "Founder" },
    { name: "Michael Steward", role: "Creative Director" },
    { name: "Emma Rodriguez", role: "Lead Developer" },
    { name: "Julia Gimmel", role: "UX Designer" },
    { name: "Lisa Anderson", role: "Marketing Manager" },
    { name: "James Wilson", role: "Product Manager" },
  ];

  const cards = document.querySelectorAll(".card");
  const dotz = document.querySelectorAll(".dot");
  const memberName = document.querySelector(".member-name");
  const memberRole = document.querySelector(".member-role");
  const leftArrow = document.querySelector(".nav-arrow.left");
  const rightArrow = document.querySelector(".nav-arrow.right");
  let currentIndex = 0;
  let isAnimating = false;

  function updateCarousel(newIndex) {
    if (isAnimating) return;
    isAnimating = true;

    currentIndex = (newIndex + cards.length) % cards.length;

    cards.forEach((card, i) => {
      const offset = (i - currentIndex + cards.length) % cards.length;

      card.classList.remove(
        "center",
        "left-1",
        "left-2",
        "right-1",
        "right-2",
        "hidden",
      );

      if (offset === 0) {
        card.classList.add("center");
      } else if (offset === 1) {
        card.classList.add("right-1");
      } else if (offset === 2) {
        card.classList.add("right-2");
      } else if (offset === cards.length - 1) {
        card.classList.add("left-1");
      } else if (offset === cards.length - 2) {
        card.classList.add("left-2");
      } else {
        card.classList.add("hidden");
      }
    });

    dotz.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex);
    });

    memberName.style.opacity = "0";
    memberRole.style.opacity = "0";

    setTimeout(() => {
      memberName.textContent = teamMembers[currentIndex].name;
      memberRole.textContent = teamMembers[currentIndex].role;
      memberName.style.opacity = "1";
      memberRole.style.opacity = "1";
    }, 300);

    setTimeout(() => {
      isAnimating = false;
    }, 800);
  }

  leftArrow.addEventListener("click", () => {
    updateCarousel(currentIndex - 1);
  });

  rightArrow.addEventListener("click", () => {
    updateCarousel(currentIndex + 1);
  });

  dotz.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      updateCarousel(i);
    });
  });

  cards.forEach((card, i) => {
    card.addEventListener("click", () => {
      updateCarousel(i);
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      updateCarousel(currentIndex - 1);
    } else if (e.key === "ArrowRight") {
      updateCarousel(currentIndex + 1);
    }
  });

  let touchStartX = 0;
  let touchEndX = 0;

  document.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  document.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        updateCarousel(currentIndex + 1);
      } else {
        updateCarousel(currentIndex - 1);
      }
    }
  }

  updateCarousel(0);
});
