window.addEventListener("DOMContentLoaded", () => {
  // Animate skills items on scroll into view with staggered effect
  const skillItems = document.querySelectorAll(".skill-item");

  function handleScroll() {
    skillItems.forEach((item, index) => {
      const rect = item.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight - 100) {
        setTimeout(() => {
          item.classList.add("visible");
        }, index * 300);
      }
    });
  }
  
  let isScrolling = false;
  window.addEventListener("scroll", () => {
    if (!isScrolling) {
      window.requestAnimationFrame(() => {
        handleScroll();
        handleScroll2();
        handleProjectsScroll();
        toggleGoToTopButton();
        isScrolling = false;
      });
      isScrolling = true;
    }
  });

  // Initial check in case items are already in view
  handleScroll();

  // slide fade-in Animation for experiance
  const expList = document.querySelectorAll(".Exp-item");
  function handleScroll2() {
    expList.forEach((item, index) => {
      const rect = item.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight - 100) {
        setTimeout(() => {
          item.classList.add("visible");
        }, index * 300);
      }
    });
  }
  // Initial check in case items are already in view
  handleScroll2();

  // Animate project cards on scroll
  const projectItems = document.querySelectorAll("#projects .ProjectLists li");
  function handleProjectsScroll() {
    projectItems.forEach((item, index) => {
      const rect = item.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight - 100) {
        setTimeout(() => {
          item.classList.add("visible");
        }, index * 200);
      }
    });
  }
  // Initial check
  handleProjectsScroll();

  //Show skills carousel with 3D effect
  const carousel = document.querySelector(".showcase-skills");
  const carouselList = carousel.querySelectorAll("li");
  const prevButton = document.querySelector(".carousel-button.prev");
  const nextButton = document.querySelector(".carousel-button.next");

  class Carousel {
    constructor(container, items, prevBtn, nextBtn) {
      this.carouselContainer = container;
      this.carouselItems = [...items];
      this.prevButton = prevBtn;
      this.nextButton = nextBtn;
    }
    UpdateCarousel() {
      this.carouselItems.forEach((el) => {
        el.classList.remove("c1");
        el.classList.remove("c2");
        el.classList.remove("c3");
        el.classList.remove("c4");
        el.classList.remove("c5");
        el.classList.remove("c6");
        el.classList.remove("c7");
        el.classList.remove("c8");
        el.classList.remove("active");
      });

      this.carouselItems.slice(0, 8).forEach((el, index) => {
        el.classList.add(`c${index + 1}`);

        if (index === 3) {
          el.classList.add("active");

          // set CSS variable --progress from data-progress attribute
          const raw = el.getAttribute("data-progress") || "";
          const percent = raw.toString().trim().replace("%", "");
          el.style.setProperty("--progress", percent + "%");

          // animate numeric percentage text
          const p = el.querySelector("p");
          if (p) {
            p.textContent = "0%";
            if (el._percentAnimation)
              cancelAnimationFrame(el._percentAnimation);
            const start = 0;
            const end = parseInt(percent, 10) || 0;
            const duration = 600;
            let startTime = null;

            const step = (timestamp) => {
              if (!startTime) startTime = timestamp;
              const t = Math.min(1, (timestamp - startTime) / duration);
              const value = Math.round(start + (end - start) * t);
              p.textContent = value + "%";
              if (t < 1) {
                el._percentAnimation = requestAnimationFrame(step);
              } else {
                el._percentAnimation = null;
              }
            };

            el._percentAnimation = requestAnimationFrame(step);
          }
        } else {
          // reset non-active cards
          el.style.setProperty("--progress", "0%");
          if (el._percentAnimation) {
            cancelAnimationFrame(el._percentAnimation);
            el._percentAnimation = null;
          }
          const p = el.querySelector("p");
          if (p) {
            const raw = el.getAttribute("data-progress") || "";
            p.textContent = raw.toString().trim();
          }
        }
      });
    }

    setCurrentState(direction) {
      // support either an element or a string flag
      const isNext =
        typeof direction === "string"
          ? direction === "next"
          : direction.classList && direction.classList.contains("next");
      const isPrev =
        typeof direction === "string"
          ? direction === "prev"
          : direction.classList && direction.classList.contains("prev");

      if (isNext) {
        const firstItem = this.carouselItems.shift();
        this.carouselItems.push(firstItem);
      } else if (isPrev) {
        const lastItem = this.carouselItems.pop();
        this.carouselItems.unshift(lastItem);
      }

      this.UpdateCarousel();
    }

    useControls() {
      this.prevButton.addEventListener("click", (e) => {
        e.preventDefault();
        this.setCurrentState(this.prevButton);
      });
      this.nextButton.addEventListener("click", (e) => {
        e.preventDefault();
        this.setCurrentState(this.nextButton);
      });
      // allow keyboard activation when buttons are focused
      this.prevButton.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.setCurrentState(this.prevButton);
        }
      });
      this.nextButton.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.setCurrentState(this.nextButton);
        }
      });

      // global keyboard navigation (left/right arrows)
      document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          this.setCurrentState("prev");
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          this.setCurrentState("next");
        }
      });
    }
  }

  const skillsCarousel = new Carousel(
    carousel,
    carouselList,
    prevButton,
    nextButton
  );
  // Ensure the visual order is synced with the current DOM order, then wire controls
  skillsCarousel.UpdateCarousel();
  skillsCarousel.useControls();


  //Responsive navbar
  const responBars = document.querySelector(".responsive-bars");
  const responLinks = document.querySelectorAll(".Responsive-nav a");
  const responNavbar = document.querySelector(".Responsive-nav");
  let menuOpen = false;

  responBars.addEventListener("click", () => {
    menuOpen = !menuOpen;
    responNavbar.style.height = menuOpen ? "84vh" : "0";
  });

  // close menu when any nav link is clicked
  if (responLinks && responLinks.forEach) {
    responLinks.forEach((link) => {
      link.addEventListener("click", () => {
        menuOpen = false;
        responNavbar.style.height = "0";
        document.querySelector(".responsive-bars svg").classList.remove("active");
      });
    });
  }

  // Go to top button functionality
  const goToTopBtn = document.getElementById("goToTop");
  
  function toggleGoToTopButton() {
    if (window.scrollY > 300) {
      goToTopBtn.classList.add("visible");
    } else {
      goToTopBtn.classList.remove("visible");
    }
  }
  
  goToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  // Form submission handling with animations
  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      // Add submitting state
      contactForm.classList.add("submitting");
      const submitButton = contactForm.querySelector('button[type="submit"]');
      submitButton.disabled = true;
      
      // Hide any previous messages
      formMessage.classList.remove("show", "success", "error");
      
      // Prepare form data
      const formData = new FormData(contactForm);
      
      try {
        const response = await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(formData).toString()
        });
        
        // Remove submitting state
        contactForm.classList.remove("submitting");
        submitButton.disabled = false;
        
        if (response.ok) {
          // Show success message
          formMessage.textContent = "Thank you! Your message has been sent successfully.";
          formMessage.classList.add("success");
          setTimeout(() => {
            formMessage.classList.add("show");
          }, 100);
          
          // Reset form
          contactForm.reset();
          
          // Hide message after 5 seconds
          setTimeout(() => {
            formMessage.classList.remove("show");
          }, 5000);
        } else {
          throw new Error("Form submission failed");
        }
      } catch (error) {
        // Remove submitting state
        contactForm.classList.remove("submitting");
        submitButton.disabled = false;
        
        // Show error message
        formMessage.textContent = "Oops! Something went wrong. Please try again.";
        formMessage.classList.add("error");
        setTimeout(() => {
          formMessage.classList.add("show");
        }, 100);
        
        // Hide message after 5 seconds
        setTimeout(() => {
          formMessage.classList.remove("show");
        }, 5000);
      }
    });
  }
});

//# sourceMappingURL=main.js.map
