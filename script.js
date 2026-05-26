// Preloader
const preloader = document.getElementById("preloader");

window.addEventListener("load", () => {
  setTimeout(() => {
    preloader.classList.add("hide");
  }, 700);
});

// Navbar scroll effect
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Mobile menu
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");

  const icon = menuToggle.querySelector("i");
  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-xmark");
});

document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");

    const icon = menuToggle.querySelector("i");
    icon.classList.add("fa-bars");
    icon.classList.remove("fa-xmark");
  });
});

// Reveal on scroll
const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
  revealElements.forEach((element) => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const revealPoint = 120;

    if (elementTop < windowHeight - revealPoint) {
      element.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

// Counter animation
const counters = document.querySelectorAll("[data-count]");
let counterStarted = false;

function animateCounters() {
  if (counterStarted) return;

  const heroTrust = document.querySelector(".hero-trust");
  const heroTrustTop = heroTrust.getBoundingClientRect().top;

  if (heroTrustTop < window.innerHeight - 80) {
    counters.forEach((counter) => {
      const target = Number(counter.getAttribute("data-count"));
      let current = 0;
      const duration = 1600;
      const increment = target / (duration / 16);

      function updateCounter() {
        current += increment;

        if (current < target) {
          counter.innerText = Math.floor(current).toLocaleString();
          requestAnimationFrame(updateCounter);
        } else {
          counter.innerText = target.toLocaleString();
        }
      }

      updateCounter();
    });

    counterStarted = true;
  }
}

window.addEventListener("scroll", animateCounters);
animateCounters();

// Testimonial slider
const testimonials = document.querySelectorAll(".testimonial-card");
const prevBtn = document.getElementById("prevTestimonial");
const nextBtn = document.getElementById("nextTestimonial");
const dotsContainer = document.getElementById("testimonialDots");

let currentTestimonial = 0;

testimonials.forEach((_, index) => {
  const dot = document.createElement("button");
  dot.setAttribute("aria-label", `Go to testimonial ${index + 1}`);

  if (index === 0) {
    dot.classList.add("active");
  }

  dot.addEventListener("click", () => {
    showTestimonial(index);
  });

  dotsContainer.appendChild(dot);
});

const dots = dotsContainer.querySelectorAll("button");

function showTestimonial(index) {
  testimonials.forEach((testimonial) => {
    testimonial.classList.remove("active");
  });

  dots.forEach((dot) => {
    dot.classList.remove("active");
  });

  testimonials[index].classList.add("active");
  dots[index].classList.add("active");
  currentTestimonial = index;
}

nextBtn.addEventListener("click", () => {
  const nextIndex = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(nextIndex);
});

prevBtn.addEventListener("click", () => {
  const prevIndex =
    (currentTestimonial - 1 + testimonials.length) % testimonials.length;

  showTestimonial(prevIndex);
});

setInterval(() => {
  const nextIndex = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(nextIndex);
}, 5000);

// FAQ accordion
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");

  if (item.classList.contains("active")) {
    answer.style.maxHeight = answer.scrollHeight + "px";
  }

  question.addEventListener("click", () => {
    const isActive = item.classList.contains("active");

    faqItems.forEach((faq) => {
      faq.classList.remove("active");
      faq.querySelector(".faq-answer").style.maxHeight = null;
    });

    if (!isActive) {
      item.classList.add("active");
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});

// 3D doctor card hover effect
const doctorCards = document.querySelectorAll(".doctor-card");

doctorCards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateY = ((x / rect.width) - 0.5) * 8;
    const rotateX = ((y / rect.height) - 0.5) * -8;

    card.style.transform = `translateY(-14px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});