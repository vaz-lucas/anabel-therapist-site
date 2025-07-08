document.addEventListener("DOMContentLoaded", function () {
  const staticCacheName = "site-static-v1";
  const dynamicCacheName = "site-dynamic-v1";

  // Install Event => Adding Static Cache
  self.addEventListener("install", (evt) => {
    evt.waitUntil(
      caches.open(staticCacheName).then((cache) => {
        cache.addAll(assets);
      }),
    );
  });

  // Activate Event => Deleting Old Cache Versions
  self.addEventListener("activate", (evt) => {
    evt.waitUntil(
      caches.keys().then((keys) => {
        return Promise.all(
          keys
            .filter((key) => ![staticCacheName, dynamicCacheName].includes(key))
            .map((key) => caches.delete(key)),
        );
      }),
    );
  });

  // Fetch Events => Caching Fetch Events' Responses
  self.addEventListener("fetch", (evt) => {
    let doSave = false;
    const includeCache = [
      ".svg",
      ".png",
      ".jpg",
      ".webp",
      ".gif",
      ".mp4",
      ".mov",
      ".mp3",
    ];
    includeCache.find((thisWord) => {
      doSave = evt?.request?.url?.includes?.(thisWord);
      return doSave;
    });

    if (!doSave) {
      return evt;
    }

    evt.respondWith(
      caches.match(evt.request).then((cacheRes) => {
        function fetchBrandNew() {
          return fetch(evt.request).then((fetchRes) => {
            return caches.open(dynamicCacheName).then((cache) => {
              cache.put(evt.request.url, fetchRes.clone());
              // check cached items size
              return fetchRes;
            });
          });
        }

        return cacheRes || fetchBrandNew();
      }),
    );
  });

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
});
