import { useEffect, useRef, useState } from "react";

// Get base URL for assets
const getAssetUrl = (path) => {
  const base = import.meta.env.BASE_URL || '/';
  return `${base}${path.startsWith('/') ? path.slice(1) : path}`;
};

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Our Recent Projects", href: "#recent-projects" },
  { label: "Our Services", href: "#services" },
  { label: "Why Choose", href: "#why-us" },
];

const servicesData = [
  {
    icon: "assets/svg/service-1.svg",
    title: "Residential Roofing & Repair",
    detail:
      "Emergency patching through complete re-roofs with premium shingles and honest estimates.",
  },
  {
    icon: "assets/svg/service-2.svg",
    title: "Cedar Roofing & Siding",
    detail:
      "Expert cedar craftsmanship that balances rustic appeal with long-term protection.",
  },
  {
    icon: "assets/svg/service-3.svg",
    title: "Siding Installation & Repair",
    detail:
      "Seamless siding installs and repairs that refresh curb appeal across Nassau and Suffolk.",
  },
  {
    icon: "assets/svg/service-4.svg",
    title: "Gutters & Copper Work",
    detail:
      "Custom gutter profiles and copper detailing keep foundations dry and look sharp.",
  },
  {
    icon: "assets/svg/service-5.svg",
    title: "Chimney Building & Repair",
    detail: "Stacked chimney rebuilds and waterproofing ensure safe, storm-ready vents.",
  },
  {
    icon: "assets/svg/service-6.svg",
    title: "Flat & Commercial Roofing",
    detail: "CRE, TPO, and EPDM installs with commercial warranties for peace of mind.",
  },
  {
    icon: "assets/svg/service-7.svg",
    title: "Rubber Roofing",
    detail: "Rubber roofing membranes for low-slope builds that need flexibility and durability.",
  },
  {
    icon: "assets/svg/service-8.svg",
    title: "Metal Roofing",
    detail: "Modern metal panels that resist wind, hail, and deliver long service life.",
  },
];

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openService, setOpenService] = useState(null);
  const quickQuoteRef = useRef(null);
  const quoteTimerRef = useRef(null);
  const reviewsTrackRef = useRef(null);
  const swiperRef = useRef(null);
  const testimonialTimerRef = useRef(null);
  const [showModalQuote, setShowModalQuote] = useState(false);
  const [quoteActive, setQuoteActive] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [quoteStatus, setQuoteStatus] = useState({ hero: false, modal: false });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewSrc, setPreviewSrc] = useState(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [testimonialProgress, setTestimonialProgress] = useState(0);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js";
    script.async = true;
    const initSwiper = () => {
      if (window.Swiper) {
        const isMobile = window.matchMedia("(max-width: 639px)").matches;
        swiperRef.current = new window.Swiper(".mySwiper", {
          slidesPerView: isMobile ? 1.15 : 3.5,
          spaceBetween: isMobile ? 12 : 24,
          centeredSlides: isMobile,
          loop: true,
          speed: isMobile ? 6000 : 8000,
          autoplay: {
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
            stopOnLastSlide: false,
            waitForTransition: false,
          },
          freeMode: true,
          freeModeMomentum: false,
          grabCursor: true,
          allowTouchMove: true,
          breakpoints: {
            640: {
              slidesPerView: 2.5,
              spaceBetween: 20,
              centeredSlides: false,
            },
            1024: {
              slidesPerView: 3.5,
              spaceBetween: 24,
              centeredSlides: false,
            },
          },
          on: {
            init: function() {
              // Ensure autoplay starts
              this.autoplay.start();
            },
            click: function() {
              // Restart autoplay on any click
              if (this.autoplay && !this.autoplay.running) {
                this.autoplay.start();
              }
            },
          },
        });
      }
    };
    script.addEventListener("load", initSwiper);
    document.body.appendChild(script);
    return () => {
      script.removeEventListener("load", initSwiper);
      document.body.removeChild(script);
      if (swiperRef.current) {
        swiperRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    const slides = document.querySelectorAll(".scroll-animate");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
        });
      },
      {
        threshold: 0.2,
      }
    );
    slides.forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const headingEls = document.querySelectorAll("h1, h2, h3");
    headingEls.forEach((el) => el.classList.add("fade-heading"));
    const elements = document.querySelectorAll(".fade-section, .fade-heading");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          } else {
            entry.target.classList.remove("is-visible");
          }
        });
      },
      { threshold: 0.2 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => button.classList.add("btn-prep"));
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      buttons.forEach((button) => button.classList.add("btn-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("btn-visible");
          } else {
            entry.target.classList.remove("btn-visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    buttons.forEach((button) => observer.observe(button));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === "Escape" && previewOpen) {
        closePreview();
      }
    };
    if (previewOpen) {
      document.addEventListener("keydown", handleKey);
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  }, [previewOpen]);

  const openPreview = (src) => {
    setPreviewSrc(src);
    setPreviewOpen(true);
    setTimeout(() => setPreviewVisible(true), 30);
    // Ensure Swiper keeps running
    setTimeout(() => {
      if (swiperRef.current && swiperRef.current.autoplay) {
        swiperRef.current.autoplay.start();
      }
    }, 100);
  };

  const closePreview = () => {
    setPreviewVisible(false);
    setTimeout(() => {
      setPreviewOpen(false);
      setPreviewSrc(null);
      // Restart Swiper autoplay if it exists
      if (swiperRef.current && swiperRef.current.autoplay) {
        swiperRef.current.autoplay.start();
      }
    }, 300);
  };

  useEffect(() => {
    const revealTargets = document.querySelectorAll(".scroll-reveal, .scroll-reveal-left");
    if (!revealTargets.length) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      revealTargets.forEach((target) => target.classList.add("reveal-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
          } else {
            entry.target.classList.remove("reveal-visible");
          }
        });
      },
      { threshold: 0.18 }
    );
    revealTargets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const revealElements = document.querySelectorAll(
      ".reveal-from-right, .reveal-from-left, .reveal-from-bottom, .pop-in"
    );
    if (!revealElements.length) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      revealElements.forEach((el) => el.classList.add("motion-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("motion-visible");
          } else {
            entry.target.classList.remove("motion-visible");
          }
        });
      },
      { threshold: 0.18 }
    );
    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const floatElements = document.querySelectorAll(".motion-float");
    if (!floatElements.length) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      floatElements.forEach((el) => {
        el.style.transform = "none";
      });
      return;
    }
    let frameId;
    const animate = (timestamp) => {
      floatElements.forEach((el, index) => {
        const speed = parseFloat(el.dataset.floatSpeed) || 0.6;
        const amplitude = parseFloat(el.dataset.floatAmplitude) || 8;
        const phase = parseFloat(el.dataset.floatPhase) || index * 0.6;
        const drift = Math.max(Math.min(window.scrollY * 0.03, 30), -20);
        const y = Math.sin((timestamp / 1000) * speed + phase) * amplitude + drift;
        const x = Math.cos((timestamp / 1200) * speed + phase) * amplitude * 0.25;
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (quoteTimerRef.current) {
        clearTimeout(quoteTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const shouldHide = window.scrollY > 80;
      setNavHidden((prev) => (prev !== shouldHide ? shouldHide : prev));
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      setNavHidden(false);
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (showModalQuote) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showModalQuote]);

  const flashQuoteActive = () => {
    setQuoteActive(true);
    if (quoteTimerRef.current) {
      clearTimeout(quoteTimerRef.current);
    }
    quoteTimerRef.current = setTimeout(() => setQuoteActive(false), 2200);
  };

  const handleQuoteScroll = () => {
    quickQuoteRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setQuoteStatus((prev) => ({ ...prev, modal: false }));
    setShowModalQuote(true);
    flashQuoteActive();
  };

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    const target = document.querySelector(targetId);
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ 
          behavior: "smooth",
          block: "start"
        });
      }, 100);
    }
  };

  const handleQuoteSubmit = (event, options = {}) => {
    event.preventDefault();
    const { closeModal = false, formKey = "hero" } = options;
    const formElement = event.target;
    Array.from(formElement.elements).forEach((element) => {
      if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
        element.value = element.value.trim();
      }
    });
    if (!formElement.checkValidity()) {
      formElement.reportValidity();
      return;
    }
    setQuoteStatus((prev) => ({ ...prev, [formKey]: true }));
    formElement.reset();
    flashQuoteActive();
    if (closeModal) {
      setShowModalQuote(false);
    }
  };

  const handleFooterSubmit = (event) => {
    event.preventDefault();
    const formElement = event.target;
    Array.from(formElement.elements).forEach((element) => {
      if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
        element.value = element.value.trim();
      }
    });
    if (!formElement.checkValidity()) {
      formElement.reportValidity();
      return;
    }
    setQuoteStatus((prev) => ({ ...prev, footer: true }));
    formElement.reset();
    flashQuoteActive();
  };

  const renderQuoteForm = (variant = "hero", options = {}) => {
    const formKey = variant === "modal" ? "modal" : "hero";
    const formWidth = variant === "modal" ? "max-w-[620px]" : "max-w-[540px]";
    const formBackground =
      variant === "modal"
        ? "bg-gradient-to-br from-black/95 via-black/80 to-black/95"
        : "bg-gradient-to-br from-black/90 via-black/80 to-black/80";
    const inputClass =
      "w-full bg-white/5 border border-white/15 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-white/70 focus:border-[#7FFF00] focus:bg-white/10 transition-all duration-200 outline-none fontMont";
    const textareaClass = `${inputClass} resize-none min-h-[120px]`;
    return (
    <form
      id="quick-quote"
      ref={variant === "hero" ? quickQuoteRef : null}
      className={`w-full ${formWidth} ${formBackground} p-8 sm:p-10 flex flex-col gap-6 justify-start items-center border-2 rounded-[32px] backdrop-blur-xl transition-all duration-300 ${
        quoteActive
          ? "border-[#7FFF00] shadow-[0_0_35px_rgba(127,255,0,0.35)]"
          : "border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
      }`}
      onSubmit={(event) => handleQuoteSubmit(event, { closeModal: false, formKey })}
    >
      {variant === "modal" && (
        <button
          type="button"
          onClick={() => setShowModalQuote(false)}
          className="self-end text-white text-2xl leading-none"
          aria-label="Close quote form"
        >
          ×
        </button>
      )}
      <div className="w-full text-center space-y-2">
        <h2 className="fontMont font-semibold text-2xl sm:text-3xl text-white tracking-tight">
          GET A <span className="text-[#6CB42E]">QUICK</span> QUOTE!
        </h2>
        <p className="text-xs sm:text-sm text-white/70 uppercase tracking-[0.5em]">
          Response guarantee · Fully licensed crew
        </p>
      </div>
      <input
        type="text"
        placeholder="Full Name"
        className={inputClass}
        required
        pattern=".*\S.*"
        title="Please enter your full name."
      />
      <input
        type="tel"
        placeholder="Phone Number"
        className={inputClass}
        required
        pattern="[\d+\-\s\(\)]{7,}"
        title="Please enter a valid phone number."
      />
      <input
        type="email"
        placeholder="Email"
        className={inputClass}
        required
        title="Please enter a valid email address."
      />
      <textarea
        rows="4"
        placeholder="Message"
        className={textareaClass}
        required
        title="Please include a message or project details."
      ></textarea>
        <button
          type="submit"
          className="fontMont mx-auto text-black font-bold text-sm sm:text-base rounded-[28px] px-6 py-3 flex justify-center items-center bg-[#7FFF00] shadow-[0_10px_30px_rgba(127,255,0,0.3)] transition-all duration-200 ease-in hover:bg-gradient-to-r hover:from-[#7FFF00] hover:to-[#55d500] hover:shadow-[0_15px_40px_rgba(127,255,0,0.45)]"
        >
          {options.buttonLabel || "Get a Quote"}
        </button>
      {quoteStatus[formKey] && (
        <p className="text-sm text-[#7FFF00] fontMont text-center" aria-live="polite">
          Awesome! We'll be in contact with you as soon as possible
        </p>
      )}
      {variant === "modal" && (
        <button
          type="button"
          onClick={() => setShowModalQuote(false)}
          className="text-xs text-white underline"
        >
          Close
        </button>
      )}
    </form>
    );
  };

  const testimonials = [
    {
      name: "Ange Dallo",
      initials: "AD",
      date: "5 months ago",
      meta: "5 reviews · 5 photos",
      badge: "Reasonable price",
      rating: 5,
      text: "Herman and his crew were terrific! I had received three other estimates in addition to LI Construction, and I am pleased with my selection—prompt, courteous attention throughout the entire project and even afterwards. Herman has returned a few times to make adjustments for things we could only know after the project was completed. They were on-site for 2 weeks, on time and budget. I am thrilled and have recommended them to others who have also had work done. An entirely new roof down to the studs, new siding and seamless gutters.",
    },
    {
      name: "Matthew Crennan",
      initials: "MC",
      date: "5 months ago",
      meta: "3 reviews · 2 photos",
      rating: 5,
      text: "I have known Herman and his team for over 10 years. After Hurricane Sandy blew off my roof, Herman arrived the next morning to tarp it and his crew replaced the roof a few days later. Since then I've relied on him for every roofing and siding need—from a full siding replacement in 2021 to reroofing and siding my sheds. Herman is professional, punctual, and courteous, and his crew always leaves the job site spotless. I recommend Long Island Construction Plus to anyone.",
    },
    {
      name: "Grace McGuire",
      initials: "GM",
      date: "8 months ago",
      meta: "6 reviews · 4 photos",
      rating: 5,
      text: "Herman and his crew did such a wonderful job making my house beautiful! They worked tirelessly for 3 full days siding the front of my house and even installed a much needed railing on the side of my front steps. I would recommend this company to anyone who wants reliable, beautiful home improvement work!",
    },
    {
      name: "Peter Kassimis",
      initials: "PK",
      date: "6 months ago",
      meta: "8 reviews · 4 photos",
      badge: "Reasonable price",
      rating: 5,
      text: "I had a great experience with George. He gave me estimates, suggestions, and clear timelines. The team installed a new roof, added a portico, replaced skylights, installed a chimney chase, outdoor high hats, a chandelier, new gutters, garage-door molding, a driveway, and fresh stoop and pavers. Rain caused minor delays, but they worked long days and weekends to finish on time.",
    },
    {
      name: "Brigette Renaud",
      initials: "BR",
      date: "2 months ago",
      meta: "Local Guide · 16 reviews",
      badge: "Great price",
      rating: 5,
      text: "Long Island Construction Plus did an amazing emergency roof replacement for us in Suffolk County. Hermann credited part of our repair costs toward the full roof replacement, and the enhanced tiles now protect us from wind and water. The entire job was done in just a couple of days, and they even helped us with dust cleanup inside afterward. We plan to use them for many more jobs.",
    },
    {
      name: "R R",
      initials: "RR",
      date: "1 month ago",
      meta: "7 reviews",
      rating: 5,
      text: "Santos and his crew demo'd 2 large sheds and installed a complete new roof and gutter system on our house. Work was scheduled very quickly and completed to our satisfaction. Santos and team were courteous and professional and very willing to address all of our preferences at a fair price. Will use them again for other projects.",
    },
  ];

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
    setTestimonialProgress(0);
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    setTestimonialProgress(0);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTestimonialProgress(0);
  };

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setTestimonialProgress((prev) => {
        if (prev >= 100) {
          nextTestimonial();
          return 0;
        }
        return prev + 0.5;
      });
    }, 30);

    return () => clearInterval(progressInterval);
  }, []);

  return (
    <div className="main px-0 sm:px-2 pt-0 pb-0">
      {/* Mobile Menu */}
      <div
        id="mobileMenu"
        className={`fixed inset-0 h-full w-full bg-gradient-to-br from-black via-gray-900 to-black text-white z-[99999] transition-all duration-300 md:hidden ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="h-full flex flex-col p-6">
          {/* Mobile Menu Header */}
          <div className="flex justify-between items-center mb-8">
            <img src={getAssetUrl("assets/images/logo.png")} alt="Long Island Construction Plus+" className="w-36" />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-12 h-12 rounded-full hover:rotate-90 text-white bg-[#7FFF00] hover:bg-white hover:text-black flex justify-center items-center text-2xl transition-all duration-300"
              aria-label="Close menu"
            >
              <i className="ri-close-line"></i>
            </button>
          </div>

          {/* Mobile Menu Links */}
          <nav className="flex-1 flex flex-col items-center justify-center">
            <ul className="space-y-6 text-center">
              {navLinks.filter(item => item.label !== "Home").map((item, idx) => (
                <li 
                  key={item.label}
                  className="mobile-menu-item opacity-0"
                  style={{ 
                    animation: mobileMenuOpen ? `fadeInUp 0.4s ease-out ${idx * 0.1}s forwards` : 'none'
                  }}
                >
                  <a
                    href={item.href}
                    className="fontMont text-xl font-semibold text-white hover:text-[#7FFF00] transition-colors duration-200 inline-block"
                    onClick={(e) => handleSmoothScroll(e, item.href)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Mobile Menu CTAs */}
            <div className="flex flex-col items-center gap-4 mt-12 w-full max-w-sm">
              <button
                type="button"
                onClick={() => {
                  handleQuoteScroll();
                  setMobileMenuOpen(false);
                }}
                className="w-full fontMont text-black font-bold text-base rounded-2xl px-8 py-4 flex justify-center items-center gap-3 bg-gradient-to-r from-[#7FFF00] to-[#55d500] hover:from-[#6ffb00] hover:to-[#72f201] transition-all duration-300 shadow-[0_10px_30px_rgba(127,255,0,0.4)]"
              >
                <span>Get a Quote</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              
              <a
                href="tel:+16314840098"
                className="w-full fontMont text-[#7FFF00] font-bold text-base rounded-2xl px-8 py-4 flex justify-center items-center gap-3 bg-transparent border-2 border-[#7FFF00] hover:bg-[#7FFF00] hover:text-black transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>(631) 484-0098</span>
              </a>
            </div>
          </nav>
        </div>
      </div>

      {/* Desktop Header */}
      <header
        className={`w-full flex justify-between items-center fixed top-0 left-0 right-0 px-4 sm:px-6 lg:px-8 py-4 sm:py-5 z-[9999] transition-all duration-300 backdrop-blur-md bg-black/40 border-b border-white/10 ${
          navHidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <a href="#home" onClick={(e) => handleSmoothScroll(e, "#home")}>
          <img
            src={getAssetUrl("assets/images/logo.png")}
            alt="Long Island Construction Plus+"
            className="w-28 sm:w-40 lg:w-48 transition-all duration-200 hover:scale-105"
          />
        </a>

        <div className="hidden md:flex flex-1 justify-center">
          {/* Navigation Menu */}
          <nav className="flex flex-1 justify-center items-center gap-6 lg:gap-8 max-w-[520px] w-full">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className="fontMont font-medium text-sm lg:text-base text-white hover:text-[#7FFF00] transition-all duration-200 relative group text-center"
              >
                <span className="relative z-10">{item.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#7FFF00] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>
        </div>

        <div className="hidden md:flex items-center justify-end">
          {/* CTA Button */}
          <button
            type="button"
            onClick={handleQuoteScroll}
            className="fontMont font-bold text-sm lg:text-base rounded-xl px-5 lg:px-6 py-2.5 lg:py-3 flex items-center gap-2 bg-gradient-to-r from-[#7FFF00] to-[#55d500] hover:from-[#6ffb00] hover:to-[#72f201] text-black transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
          >
            <span>Get a Quote</span>
            <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          id="menuBtn"
          onClick={() => setMobileMenuOpen(true)}
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl hover:text-[#7FFF00] hover:bg-white text-black bg-[#7FFF00] flex md:hidden justify-center items-center transition-all duration-200 hover:scale-105"
          aria-label="Open menu"
        >
          <i className="ri-menu-3-line text-xl font-extrabold"></i>
        </button>
      </header>

      <div
        id="home"
        className="hero-section fade-section relative min-h-screen flex items-center overflow-hidden pt-24 sm:pt-28"
        style={{ width: "100vw", marginLeft: "calc(-50vw + 50%)", marginRight: "calc(-50vw + 50%)" }}
      >
        {/* Background with Overlay */}
        <div className="absolute inset-0 hero-background bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full px-4 sm:px-6 py-16 sm:py-20 lg:py-26">
          <div className="max-w-[1600px] mx-auto">
            <div className="flex flex-col md:flex-row gap-10 md:gap-12 lg:gap-16 items-start justify-between">
              
              {/* Left Side - Hero Content */}
              <div className="w-full md:w-[62%] lg:w-[56%] text-center md:text-left space-y-3 sm:space-y-5">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 reveal-from-left">
                  <div className="w-2 h-2 bg-[#7FFF00] rounded-full animate-pulse" />
                  <span className="fontMont text-xs font-semibold text-white uppercase tracking-wider">
                    Trusted Since 2012
                  </span>
                </div>

                {/* Main Headline */}
                <h1 className="hero-main-heading text-[32px] sm:text-[36px] md:text-[42px] lg:text-[48px] font-bold text-white leading-[1.3] text-center md:text-left opacity-0 animate-fadeInUp" style={{ letterSpacing: '0.02em', wordSpacing: '0' }}>
                  <span className="block mb-2" style={{ letterSpacing: '0.02em' }}>
                    RESIDENTIAL & COMMERCIAL
                  </span>
                  <span className="block mb-2" style={{ letterSpacing: '0.02em' }}>
                    ROOFING EXPERTS <span className="text-[#6CB42E] font-black" style={{ textShadow: '0 2px 6px rgba(0,0,0,0.4)', letterSpacing: '0.02em' }}>Serving In</span>
                  </span>
                  <span className="block text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] font-medium text-white/95" style={{ letterSpacing: '0.01em' }}>
                    Suffolk County & Nassau County
                  </span>
                </h1>

                {/* Subheading */}
                <p className="fontMont text-sm sm:text-base lg:text-lg text-gray-200 leading-relaxed max-w-2xl mx-auto md:mx-0 reveal-from-left">
                  At <span className="font-bold text-white">Long Island Construction Plus+</span>, we bring over a decade of experience delivering reliable, high-quality roofing and exterior solutions for homes and businesses across Long Island.
                </p>

                {/* USPs */}
                <div className="flex flex-wrap justify-center md:justify-start gap-2.5 sm:gap-3 reveal-from-left">
                  {[
                    { icon: "✓", text: "Licensed & Insured" },
                    { icon: "✓", text: "Family-Owned" },
                    { icon: "✓", text: "Free Estimates" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#7FFF00] flex items-center justify-center text-black font-bold text-xs sm:text-sm">
                        {item.icon}
                      </div>
                      <span className="fontMont text-xs sm:text-sm text-white font-medium">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-3.5 justify-center md:justify-start reveal-from-left">
                  <button
                    onClick={handleQuoteScroll}
                    className="group inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#7FFF00] to-[#55d500] hover:from-[#6ffb00] hover:to-[#72f201] text-black font-bold rounded-xl sm:rounded-2xl shadow-[0_10px_40px_rgba(127,255,0,0.4)] hover:shadow-[0_15px_50px_rgba(127,255,0,0.6)] transition-all duration-300 hover:scale-105 fontMont text-sm sm:text-base relative overflow-hidden"
                  >
                    <span className="relative z-10">Get Your Free Estimate</span>
                    <svg className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>

              <a
                href="tel:+16314840098"
                className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white text-[#007FFF] font-bold rounded-xl sm:rounded-2xl transition-all duration-300 fontMont text-sm sm:text-base"
              >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="whitespace-nowrap">(631) 484-0098</span>
                  </a>
                </div>
              </div>

              {/* Right Side - Quote Form */}
              <div className="w-full md:w-[38%] lg:w-[34%] md:ml-6 lg:ml-10 reveal-from-right">
                {renderQuoteForm("hero")}
              </div>

            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-white/60 hover:text-white/90 transition-colors cursor-pointer animate-bounce">
          <span className="fontMont text-xs uppercase tracking-wider">Scroll</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <div className="w-full py-8 sm:py-12 px-4 sm:px-6 bg-gradient-to-b from-white via-gray-50 to-white border-y border-gray-100 fade-section scroll-reveal">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6 sm:mb-8 reveal-from-bottom">
            <p className="fontMont text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-widest mb-2">
              Trusted by Homeowners Across Long Island
            </p>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#007FFF] to-transparent mx-auto" />
          </div>

          <div className="trust-badges-grid grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {[
              {
                icon: (
                  <svg className="w-10 h-10 sm:w-12 sm:h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L3 7V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V7L12 2Z" fill="#007FFF" fillOpacity="0.1" stroke="#007FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 12L11 14L15 10" stroke="#C8000C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
                title: "Licensed & Insured",
                subtitle: "Fully Certified",
              },
              {
                icon: (
                  <svg className="w-10 h-10 sm:w-12 sm:h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" fill="#007FFF" fillOpacity="0.1" stroke="#007FFF" strokeWidth="2"/>
                    <path d="M12 6V12L16 14" stroke="#C8000C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
                title: "Since 2012",
                subtitle: "13+ Years Experience",
              },
              {
                icon: (
                  <svg className="w-10 h-10 sm:w-12 sm:h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" fill="#007FFF" fillOpacity="0.1" stroke="#007FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 22V12H15V22" stroke="#C8000C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
                title: "Family-Owned",
                subtitle: "Local Business",
              },
              {
                icon: (
                  <svg className="w-10 h-10 sm:w-12 sm:h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" fill="#007FFF" fillOpacity="0.1" stroke="#007FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="10" r="3" fill="#C8000C" stroke="#C8000C" strokeWidth="2"/>
                  </svg>
                ),
                title: "Long Island",
                subtitle: "Suffolk & Nassau",
              },
            ].map((badge, idx) => (
              <div
                key={badge.title}
                className="trust-badge-card bg-white rounded-2xl p-5 sm:p-6 border border-gray-200 hover:border-[#007FFF] transition-all duration-300 shadow-sm hover:shadow-lg group reveal-from-bottom"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="flex flex-col items-center text-center gap-3 sm:gap-4">
                  <div className="trust-badge-icon transition-transform duration-300 group-hover:scale-110">
                    {badge.icon}
                  </div>
                  <div>
                    <h3 className="fontMont text-sm sm:text-base font-bold text-gray-900 leading-tight mb-1">
                      {badge.title}
                    </h3>
                    <p className="fontMont text-xs sm:text-sm font-medium text-gray-500">
                      {badge.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 sm:mt-8 text-center reveal-from-bottom">
            <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600 fontMont">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#C8000C]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">A+ Rated</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-gray-300" />
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#C8000C]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">5-Star Reviews</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-gray-300" />
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#C8000C]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Free Estimates</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="special-offer-section fade-section scroll-reveal w-full mb-2 sm:mb-6 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="special-offer-card bg-gradient-to-br from-[#007FFF] via-[#0099FF] to-[#00B8FF] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,127,255,0.3)] border-2 border-white/20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[500px]">
              {/* Content Side - Left */}
              <div className="flex flex-col justify-center items-start p-6 sm:p-8 md:p-10 lg:p-12 text-white order-2 lg:order-1">
                <div className="space-y-3 sm:space-y-4 w-full reveal-from-left">
                  <div className="inline-block">
                    <span className="bg-[#7FFF00] text-black px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs font-bold uppercase tracking-wide fontMont">
                      Limited Time Offer
                    </span>
                  </div>
                  
                  <h2 className="fontNF text-[36px] font-black uppercase leading-tight">
                    Save Big on Your
                    <span className="block text-[#7FFF00] mt-1 text-[36px]">Next Project!</span>
                  </h2>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-white/20">
                    <div className="flex items-baseline gap-2 sm:gap-2.5 flex-wrap">
                      <span className="text-[36px] font-black fontMont text-[#7FFF00] drop-shadow-[0_4px_12px_rgba(127,255,0,0.4)] leading-none">
                        $2,000
                      </span>
                      <span className="text-[36px] font-bold fontMont">OFF</span>
                    </div>
                    <p className="mt-2 sm:mt-3 text-sm sm:text-base md:text-lg fontMont font-medium text-white/90 leading-snug">
                      on full roof replacement or full siding projects
                    </p>
                  </div>

                  <ul className="space-y-2 sm:space-y-2.5">
                    {[
                      "Premium materials included",
                      "Professional installation",
                      "Warranty coverage",
                      "Free on-site consultation"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 sm:gap-2.5">
                        <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#7FFF00] flex items-center justify-center">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="fontMont text-sm sm:text-base md:text-lg font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <button 
                    onClick={handleQuoteScroll}
                    className="group fontMont text-black font-bold text-sm sm:text-base md:text-lg rounded-xl sm:rounded-2xl px-6 sm:px-7 py-3 sm:py-3.5 flex items-center justify-center gap-2 sm:gap-3 bg-[#7FFF00] hover:bg-white transition-all duration-300 shadow-[0_10px_30px_rgba(127,255,0,0.4)] hover:shadow-[0_15px_40px_rgba(255,255,255,0.5)] active:scale-95 sm:hover:scale-105 w-full sm:w-auto touch-manipulation"
                  >
                    <span>Claim Your Offer Now</span>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>

                  <p className="text-xs sm:text-sm text-white/70 italic fontMont leading-relaxed mt-1">
                    * Restrictions apply. Contact us for complete details and eligibility requirements.
                  </p>
                </div>
              </div>

              {/* Image Side - Right */}
              <div className="relative h-[260px] sm:h-[320px] md:h-[360px] lg:h-auto order-1 lg:order-2">
                <div className="absolute inset-0 bg-gradient-to-br from-[#007FFF]/20 to-transparent z-10" />
                <img
                  src="https://lh3.googleusercontent.com/geougc-cs/AMBA38sOaeD4VzG91xTcHN97ZUKsVr_CqSJU82Lv3D6oxNekrw-S7gT7ze3__bQtY4qeeZeu1_pNmORimISXDsOGGoq348y4PzLSlQzqDqIoMbvd-TJYHsljNfJU-L6KITKcoQnkMZzSRg=s3840-w3840-h1890-rw"
                  alt="Featured Roofing Project"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-28 bg-gradient-to-t from-[#007FFF] to-transparent z-10 lg:hidden" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section3 fade-section scroll-reveal py-6 sm:py-10 px-4 sm:px-6" id="services">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-10">
            <h1 className="fontNF text-[#7FFF00] text-[36px] uppercase hero-heading-shadow fade-heading reveal-from-bottom mb-4">
              Our Services
            </h1>
            <p className="fontMont text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed reveal-from-bottom">
              We specialize in high-quality roofing, siding, and exterior solutions for residential and commercial properties across Long Island.
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-[#007FFF] to-[#7FFF00] rounded-full mx-auto mt-6" />
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
            {servicesData.map((service, index) => {
              const isOpen = openService === index;
              return (
                <div
                  key={service.title}
                  className="service-accordion-card bg-white rounded-2xl border-2 border-gray-100 hover:border-[#007FFF]/30 transition-all duration-300 shadow-sm hover:shadow-xl reveal-from-bottom overflow-hidden"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      // Close current if clicking the same one, otherwise open the clicked one (auto-closes others)
                      setOpenService(isOpen ? null : index);
                    }}
                    className="w-full flex items-center gap-3 sm:gap-4 p-5 sm:p-6 text-left group transition-all duration-300"
                    aria-expanded={isOpen}
                    aria-label={`Toggle ${service.title}`}
                  >
                    {/* Icon */}
                    <div className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 ${
                      isOpen 
                        ? 'bg-gradient-to-br from-[#007FFF] to-[#0099FF] shadow-lg' 
                        : 'bg-gradient-to-br from-[#e8f4ff] to-[#CCE5FF] group-hover:from-[#CCE5FF] group-hover:to-[#b3d9ff]'
                    }`}>
                      <img 
                        src={getAssetUrl(service.icon)} 
                        alt="" 
                        className={`h-6 w-6 sm:h-7 sm:w-7 transition-all duration-300 ${
                          isOpen ? 'brightness-0 invert scale-110' : 'scale-100'
                        }`}
                      />
                    </div>

                    {/* Title */}
                    <div className="flex-1 min-w-0">
                      <h3 className={`fontMont text-base sm:text-lg font-bold leading-tight transition-colors duration-300 ${
                        isOpen ? 'text-[#007FFF]' : 'text-gray-900 group-hover:text-[#007FFF]'
                      }`}>
                        {service.title}
                      </h3>
                      {!isOpen && (
                        <p className="fontMont text-xs sm:text-sm text-gray-500 mt-1 line-clamp-1">
                          Click to learn more
                        </p>
                      )}
                    </div>

                    {/* Chevron */}
                    <div className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isOpen 
                        ? 'bg-[#7FFF00] rotate-180' 
                        : 'bg-gray-100 group-hover:bg-[#007FFF]/10'
                    }`}>
                      <svg
                        className={`w-5 h-5 transition-colors duration-300 ${
                          isOpen ? 'text-black' : 'text-[#007FFF]'
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  {/* Accordion Content */}
                  <div
                    className={`service-accordion-content transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                      <div className="pt-3 sm:pt-4 border-t-2 border-gray-100">
                        <p className="fontMont text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
                          {service.detail}
                        </p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuoteScroll();
                          }}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-[#007FFF] text-white rounded-lg hover:bg-[#7FFF00] hover:text-black transition-all duration-200 fontMont text-sm font-semibold shadow-sm hover:shadow-md"
                        >
                          <span>Get a Free Quote</span>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Below Services */}
          <div className="mt-8 sm:mt-12 text-center reveal-from-bottom">
            <p className="fontMont text-gray-600 mb-6 text-sm sm:text-base">
              Don't see what you're looking for? We handle a wide range of roofing and exterior projects.
            </p>
            <button
              onClick={handleQuoteScroll}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#7FFF00] to-[#55d500] hover:from-[#6ffb00] hover:to-[#72f201] text-black font-bold rounded-2xl shadow-[0_10px_30px_rgba(127,255,0,0.3)] hover:shadow-[0_15px_40px_rgba(127,255,0,0.45)] transition-all duration-300 hover:scale-105 fontMont text-sm sm:text-base"
            >
              <span>Request a Custom Quote</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        className="why-choose-section fade-section scroll-reveal pt-4 sm:pt-6 lg:pt-8 pb-6 sm:pb-10 px-4 sm:px-6 overflow-hidden"
        id="why-us"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="fontNF text-[#7FFF00] text-[36px] uppercase hero-heading-shadow reveal-from-bottom mb-3">
              Why Choose
            </h1>
            <h2 className="fontMont text-[36px] font-black text-black mb-4 reveal-from-bottom">
              Long Island Construction Plus+
            </h2>
            <p className="fontMont text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed reveal-from-bottom">
              We take pride in providing professional service, honest pricing, and exceptional workmanship for every project. Here's why homeowners trust us.
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-[#007FFF] to-[#7FFF00] rounded-full mx-auto mt-6" />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 mb-6">
            {/* Left Side - Benefits */}
            <div className="space-y-6 reveal-from-left">
              {[
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  title: "Over 13 Years of Experience",
                  description: "Serving Long Island since 2012 with proven expertise and craftsmanship."
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  ),
                  title: "Family-Owned & Trusted Locally",
                  description: "A local, family business committed to building lasting relationships."
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                  title: "Fully Licensed & Insured",
                  description: "Complete peace of mind with proper licensing and comprehensive insurance."
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                  title: "Serving All Long Island Areas",
                  description: "Comprehensive coverage across Suffolk and Nassau County."
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                  title: "Fast, Reliable & Affordable",
                  description: "Quick response times, dependable service, and honest competitive pricing."
                },
              ].map((benefit, idx) => (
                <div
                  key={benefit.title}
                  className="why-choose-card bg-white rounded-2xl p-5 sm:p-6 border-2 border-gray-100 hover:border-[#007FFF]/30 transition-all duration-300 shadow-sm hover:shadow-lg group reveal-from-left"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="flex items-start gap-3.5">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#007FFF] to-[#0099FF] flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                      {benefit.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="fontMont text-base sm:text-lg font-bold text-gray-900 mb-2">
                        {benefit.title}
                      </h3>
                      <p className="fontMont text-sm sm:text-base text-gray-600 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

            </div>

            {/* Right Side - Images */}
            <div className="relative reveal-from-right">
              <div className="grid grid-cols-1 gap-4 sm:gap-6">
                {/* Image 1 - Main */}
                <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                  <img
                    src={getAssetUrl("assets/images/service_img1.webp")}
                    alt="Professional Roofing Work"
                    className="w-full h-[250px] sm:h-[300px] lg:h-[350px] object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                {/* Image 2 - Secondary */}
                <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                  <img
                    src={getAssetUrl("assets/images/service_img2.webp")}
                    alt="Quality Construction Services"
                    className="w-full h-[250px] sm:h-[300px] lg:h-[350px] object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-br from-[#007FFF] to-[#0099FF] text-white rounded-2xl p-4 sm:p-6 shadow-2xl hidden lg:block">
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-black fontMont mb-1">13+</div>
                  <div className="text-xs sm:text-sm font-medium fontMont uppercase tracking-wide">Years</div>
                </div>
              </div>
            </div>

            <div className="col-span-1 lg:col-span-2 flex justify-center mt-6">
              <button
                onClick={handleQuoteScroll}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#7FFF00] to-[#55d500] hover:from-[#6ffb00] hover:to-[#72f201] text-black font-bold rounded-2xl shadow-[0_10px_30px_rgba(127,255,0,0.3)] hover:shadow-[0_15px_40px_rgba(127,255,0,0.45)] transition-all duration-300 hover:scale-105 fontMont text-sm sm:text-base"
              >
                <span>Request Your Free Estimate</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 mt-10 reveal-from-bottom">
            {[
              { number: "453+", label: "5-Star Reviews" },
              { number: "13+", label: "Years Experience" },
              { number: "100%", label: "Licensed & Insured" },
              { number: "24/7", label: "Customer Support" },
            ].map((stat, idx) => (
              <div
                key={stat.label}
                className="stat-card bg-gradient-to-br from-gray-50 to-white rounded-2xl p-4 sm:p-6 border border-gray-200 text-center hover:shadow-lg transition-all duration-300"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#007FFF] fontMont mb-2">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm font-medium text-gray-600 fontMont uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
                </div>

            <div className="mt-6 reveal-from-left">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { value: "13+ Years", label: "Local craftsmanship", icon: "🛠️" },
                  { value: "2,500+ sq ft", label: "Roofing installed", icon: "🏠" },
                  { value: "4.9★", label: "Google reviews", icon: "⭐" },
                ].map((stat) => (
                  <div
                    key={stat.value}
                    className="rounded-3xl bg-white/90 border border-gray-200 shadow-lg p-5 text-center flex flex-col items-center gap-2"
                  >
                    <span className="text-2xl">{stat.icon}</span>
                    <p className="text-2xl font-semibold text-[#007FFF] fontMont">{stat.value}</p>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
        </div>
      </div>

      <div
        className="recent-projects-section w-full py-6 sm:py-10 lg:py-12 fade-section scroll-reveal bg-gradient-to-b from-gray-50 via-white to-gray-50"
        id="recent-projects"
      >
        {/* Section Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10">
          <div className="text-center reveal-from-bottom">
            <h2 className="text-[#7FFF00] fontNF text-[36px] uppercase hero-heading-shadow mb-4">
              OUR RECENT PROJECTS
            </h2>
            <p className="fontMont text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Take a look at our latest roofing, siding, and exterior work across Long Island. Each project reflects our dedication to quality and customer satisfaction.
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-[#007FFF] to-[#7FFF00] rounded-full mx-auto mt-6" />
          </div>
        </div>

        {/* Full-Width Projects Slider */}
        <div className="w-full reveal-from-bottom mb-8 sm:mb-10">
          <div className="swiper mySwiper">
            <div className="swiper-wrapper">
              {[
                "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSy9W99N9yFvNa-TFHz-IYx-MrLBJNass1ZJCC95of_72lM7gAf9MbWKTjwlX6vhmofg2GurOLmiypPZRSI1Drlc65V9a2GIvo_HDPsmfbB_9ZNqiHeSEqMDd_8zJOnjv3_4Q3qWc4b1Oh8=s680-w680-h510-rw",
                "https://lh3.googleusercontent.com/p/AF1QipMf_zLiMRXDmKuZrMCW2qK1w96qfVXkElj-U7Tg=s680-w680-h510-rw",
                "https://lh3.googleusercontent.com/p/AF1QipPnzDMn1DmXB2cN8t-d-WA3SwmNMcNf1Db8kfz5=s680-w680-h510-rw",
                "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSyUUbdQtTQhS7bpWME8ORL58UD7q8yk52hG9X1MaRwOV-BslgfASIGLWRFfpNfizrbr7tH8qjb376_zSBht0gH9TiWYG55ThkaCmSUtIQEh84g00E-bzLHMijFBxX_Q_I4OZQQC9Q=s680-w680-h510-rw",
                "https://lh3.googleusercontent.com/p/AF1QipPLHRYbvEx-yKbwMZXCmc3Brem_QFih0Plfq-Bp=s680-w680-h510-rw",
                "https://lh3.googleusercontent.com/p/AF1QipNafK3G_UJae-8823LLYQ83obbieGrT4iy3Cq_q=s680-w680-h510-rw",
                "https://lh3.googleusercontent.com/p/AF1QipM63VtAPsHhayfgiy_NEB3s-cEXO1zoC2OBTZI2=s680-w680-h510-rw",
                "https://lh3.googleusercontent.com/p/AF1QipMh08n3FIVLjV6VlEgzLfnSEaisY1R0Xxo-qnxP=s680-w680-h510-rw",
                "https://lh3.googleusercontent.com/p/AF1QipPki_s9qO8zo3CKhVhg_2zRSzC9xd_QZV8lzcy8=s680-w680-h510-rw",
                "https://lh3.googleusercontent.com/p/AF1QipMttlS5SPTPvaNt9i57hC7F5Jzk7Vck3w_cgPv6=s680-w680-h510-rw",
                "https://lh3.googleusercontent.com/p/AF1QipM28ua4X8rYN7kU5FxwikoAGgWpkrHUD68mvMnr=s680-w680-h510-rw",
                "https://lh3.googleusercontent.com/p/AF1QipOk-kfvY4EG8KLXRP30mIh0EHE49uJWgJTNwLXV=s680-w680-h510-rw",
              ].map((src, idx) => (
                <div key={src + idx} className="swiper-slide">
                  <div
                    className="project-slide-card cursor-pointer"
                    role="button"
                    tabIndex={0}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      openPreview(src);
                    }}
                    onKeyDown={(event) => event.key === "Enter" && openPreview(src)}
                  >
                    <img 
                      src={src} 
                      alt={`Construction project ${idx + 1}`} 
                      className="project-slide-img"
                    />
                    <div className="project-slide-overlay" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {previewOpen && (
          <div
            className={`fixed inset-0 z-[11000] flex items-center justify-center pointer-events-auto p-3 sm:p-6 md:p-8 transition-opacity duration-300 ${
              previewVisible ? "opacity-100" : "opacity-0"
            }`}
            onClick={closePreview}
          >
            <div
              className={`relative bg-white rounded-xl sm:rounded-2xl md:rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.12)] sm:shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-3 sm:p-5 md:p-6 w-[95vw] sm:w-auto max-w-[95vw] sm:max-w-[90vw] md:max-w-[85vw] transition-all duration-300 ${
                previewVisible ? "scale-100 opacity-100" : "scale-[0.97] opacity-0"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white hover:bg-gray-100 text-gray-700 hover:text-[#007FFF] text-xl sm:text-2xl font-bold transition-all duration-200 shadow-md hover:shadow-lg z-10 active:scale-95"
                aria-label="Close image preview"
                onClick={closePreview}
              >
                ✕
              </button>
              <div className="w-full flex items-center justify-center">
                <img
                  src={previewSrc}
                  alt="Project preview"
                  className="max-w-full max-h-[70vh] sm:max-h-[75vh] md:max-h-[80vh] rounded-lg sm:rounded-xl md:rounded-2xl object-contain"
                />
              </div>
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center reveal-from-bottom">
            <p className="fontMont text-gray-600 mb-6 text-sm sm:text-base">
              See more of our completed projects and client testimonials
            </p>
            <button
              onClick={() => window.open('https://share.google/9loNOTEDxxyrMeKNl', '_blank')}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#7FFF00] to-[#55d500] hover:from-[#6ffb00] hover:to-[#72f201] text-black font-bold rounded-2xl shadow-[0_10px_30px_rgba(127,255,0,0.3)] hover:shadow-[0_15px_40px_rgba(127,255,0,0.45)] transition-all duration-300 hover:scale-105 fontMont text-sm sm:text-base"
            >
              <span>View All Projects on Google</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {showModalQuote && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 p-4 sm:p-6">
          <div className="w-full max-w-3xl">
            {renderQuoteForm("modal")}
          </div>
        </div>
      )}

      <div className="w-full min-h-fit py-8 sm:py-12 pb-8 sm:pb-14 flex flex-col gap-6 sm:gap-8 fade-section bg-gradient-to-b from-gray-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="flex flex-col items-center gap-4 mb-6 sm:mb-8">
            <div className="reveal-from-bottom">
              <h2 className="text-[#7FFF00] fontNF text-[36px] text-center hero-heading-shadow">WHAT OUR CLIENTS SAY</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#007FFF] to-[#7FFF00] rounded-full mx-auto mt-3" />
            </div>
            <div className="flex items-center gap-2 reveal-from-bottom bg-white px-6 py-3 rounded-full shadow-md border border-gray-100">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 sm:w-6 sm:h-6 fill-[#FBBC04]" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <span className="fontMont font-bold text-lg sm:text-xl text-black">5.0</span>
              <span className="fontMont text-xs sm:text-sm text-gray-500">· 453 reviews on Google</span>
            </div>
          </div>
          <div className="relative">
            <div className="flex items-center justify-between mb-5 sm:mb-6">
              <p className="fontMont text-sm text-gray-600 font-medium">
                {currentTestimonial + 1} of {testimonials.length}
              </p>
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  aria-label="Previous testimonial"
                  onClick={prevTestimonial}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:text-white hover:bg-[#007FFF] hover:border-[#007FFF] transition-all duration-300 shadow-sm hover:shadow-lg active:scale-95"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="Next testimonial"
                  onClick={nextTestimonial}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:text-white hover:bg-[#007FFF] hover:border-[#007FFF] transition-all duration-300 shadow-sm hover:shadow-lg active:scale-95"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="relative overflow-hidden">
              <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}>
                {testimonials.map((review, idx) => (
                <div
                  key={`${review.name}-${idx}`}
                  className="testimonial-card bg-white rounded-2xl sm:rounded-3xl shadow-lg border-2 border-gray-100 flex flex-col gap-5 p-5 sm:p-7 transition-all duration-300 w-full flex-shrink-0"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="reviewer-avatar w-14 h-14 sm:w-16 sm:h-16 rounded-full flex-shrink-0 shadow-lg ring-4 ring-white group-hover:ring-[#007FFF]/10 bg-gradient-to-br from-[#007FFF] to-[#00B8FF] flex items-center justify-center text-white fontNF text-base sm:text-lg transition-all duration-300">
                        {review.initials}
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <h3 className="fontMont font-bold text-base sm:text-lg text-black">{review.name}</h3>
                        <p className="fontMont text-xs text-gray-500">{review.meta}</p>
                        <p className="fontMont text-xs text-gray-400">{review.date}</p>
                      </div>
                    </div>
                    <svg className="w-6 h-6 flex-shrink-0 fill-[#4285F4] opacity-90" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-[#FBBC04]" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  {review.badge && (
                    <span className="self-start inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#ECFDF3] to-[#D1FAE5] text-[#065F46] text-xs fontMont font-semibold shadow-sm border border-[#A7F3D0]/30">
                      <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {review.badge}
                    </span>
                  )}
                  <div className="relative">
                    <div className="absolute -left-1 -top-1 text-[#007FFF]/10 text-4xl fontNF leading-none">"</div>
                    <p className="fontMont text-sm sm:text-base text-gray-700 leading-relaxed pl-4">{review.text}</p>
                  </div>
                </div>
              ))}
              </div>
            </div>

            <div className="mt-6 sm:mt-8">
              <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#007FFF] to-[#00B8FF] rounded-full transition-all duration-75 ease-linear"
                  style={{ width: `${testimonialProgress}%` }}
                />
              </div>
              <div className="flex items-center justify-center gap-2 mt-4">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToTestimonial(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      idx === currentTestimonial 
                        ? 'bg-[#007FFF] w-8' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-6 sm:mt-8">
            <button 
              onClick={() => window.open('https://share.google/9loNOTEDxxyrMeKNl', '_blank')}
              className="fontMont text-black font-bold text-sm sm:text-base rounded-2xl px-8 py-4 flex justify-center items-center gap-3 bg-gradient-to-r from-[#7FFF00] to-[#6ffb00] hover:from-[#6ffb00] hover:to-[#7FFF00] shadow-[0_10px_30px_rgba(127,255,0,0.3)] hover:shadow-[0_15px_40px_rgba(127,255,0,0.45)] transition-all duration-300 hover:scale-105 active:scale-95 pop-in group"
            >
              Read more on Google
              <span className="w-8 h-8 p-2 bg-black group-hover:bg-white flex justify-center rounded-full items-center transition-all duration-300 group-hover:rotate-45">
                <img src={getAssetUrl("assets/svg/arrow.svg")} alt="" className="w-full h-full object-contain group-hover:brightness-0" />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div 
        className="w-full py-12 sm:py-16 md:py-20 fade-section scroll-reveal relative overflow-hidden"
        style={{
          backgroundImage: `url('${getAssetUrl("assets/images/footerBeforeBanner.png")}')`,
          backgroundPosition: "bottom center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100vw",
          marginLeft: "calc(-50vw + 50%)",
          marginRight: "calc(-50vw + 50%)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/50" />
        
        <div className="relative w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch max-w-7xl mx-auto px-4 sm:px-6">
            
            {/* Left Column - CTA Content */}
            <div className="flex flex-col gap-6 sm:gap-8 flex-grow p-6 sm:p-8 md:p-10">
              <div className="flex flex-col gap-6 sm:gap-8 flex-grow">
              <div className="flex flex-col gap-3 reveal-from-bottom">
                <h2 className="fontNF text-[32px] sm:text-[36px] md:text-[40px] font-semibold text-white leading-[1.2] tracking-[0.05em] drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]">
                  READY TO GET <span className="text-[#6CB42E]">STARTED?</span>
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-[#007FFF] to-[#7FFF00] rounded-full" />
              </div>
              
              <p className="fontMont text-sm sm:text-base lg:text-lg text-gray-200 leading-relaxed max-w-2xl reveal-from-bottom">
                Contact our expert roofing team today for your <span className="font-bold text-white">FREE ESTIMATE.</span> We'll respond quickly to schedule your on-site inspection and provide honest, competitive pricing.
              </p>

              <div className="flex flex-col gap-4 mt-2 reveal-from-bottom">
                <a 
                  href="tel:+16314840098"
                  className="group fontMont text-[#007FFF] font-bold text-base sm:text-lg rounded-2xl px-8 py-4 flex justify-center items-center gap-3 bg-white hover:bg-[#007FFF] border-2 border-[#007FFF] hover:border-[#007FFF] transition-all duration-300 shadow-md hover:shadow-xl hover:text-white hover:scale-105"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="relative z-10">Call: (631) 484-0098</span>
                </a>
              </div>

                <div className="flex flex-wrap gap-6 mt-4 pt-6 border-t border-gray-300 reveal-from-bottom">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#7FFF00]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="fontMont text-sm sm:text-base text-white font-medium">Free Estimates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#7FFF00]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="fontMont text-sm sm:text-base text-white font-medium">Licensed & Insured</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#7FFF00]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="fontMont text-sm sm:text-base text-white font-medium">Fast Response</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Hero Quote Form */}
            <div className="cta-form-card bg-transparent rounded-3xl p-0 border-0 reveal-from-bottom flex flex-col">
              {renderQuoteForm("secondary", { buttonLabel: "Get A Free Inspection" })}
            </div>

          </div>
        </div>
      </div>

      <div className="flex flex-col mt-6">
        <div className="footer bg-[#007FFF] rounded-tr-3xl rounded-tl-3xl pt-6 px-4 sm:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 py-6">
            
            {/* Logo & Description */}
            <div className="flex flex-col gap-3 text-white fontMont text-sm">
              <img className="w-[80%] sm:w-[70%] pb-3" src={getAssetUrl("assets/images/logo.png")} alt="Long Island Construction Plus+" />
              <p className="text-sm text-white/90 leading-relaxed">
                Your trusted partner for premium roofing, siding, and construction services across Long Island. Quality workmanship, honest pricing, guaranteed satisfaction.
              </p>
            </div>

            {/* Quick Links */}
            <div className="text-white fontMont text-sm flex flex-col gap-2.5 w-full max-w-[200px] items-start mx-0 sm:mx-auto">
              <h2 className="uppercase font-black text-lg sm:text-base mb-1">Quick Links</h2>
              {[
                { label: "Home", href: "#home" },
                { label: "About Us", href: "#why-us" },
                { label: "Our Services", href: "#services" },
                { label: "Why Choose Us", href: "#why-us" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className="text-sm sm:text-base font-normal hover:text-[#7FFF00] transition-colors duration-200 text-left w-full"
                >
                  {link.label}
                </a>
              ))}
              <a
                key="Get a Quote"
                onClick={(e) => {
                  e.preventDefault();
                  handleQuoteScroll();
                }}
                className="text-sm sm:text-base font-normal hover:text-[#7FFF00] transition-colors duration-200 text-left w-full cursor-pointer"
              >
                Get a Quote
              </a>
            </div>

            {/* Contact Information */}
            <div className="text-white fontMont text-sm flex flex-col gap-2.5">
              <h2 className="uppercase font-black text-lg sm:text-base mb-1">Contact Information</h2>
              {[
                { icon: "assets/svg/phone.svg", label: "(631) 484-0098", type: "phone" },
                { icon: "assets/svg/map.svg", label: "Serving Suffolk County & Nassau County", type: "text" },
                { icon: "assets/svg/email.svg", label: "liconstructionplus@gmail.com", type: "email" },
                { icon: "assets/svg/time.svg", label: "Monday – Saturday | 8:00 AM – 6:00 PM", type: "text" },
              ].map((item) => (
                <div key={item.label} className="flex gap-3 items-start">
                  <img src={getAssetUrl(item.icon)} alt="" className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  {item.type === "phone" ? (
                    <a 
                      href="tel:+16314840098" 
                      className="hover:text-[#7FFF00] transition-colors duration-200 font-normal"
                    >
                      {item.label}
                    </a>
                  ) : item.type === "email" ? (
                    <a 
                      href={`mailto:${item.label}`}
                      className="hover:text-[#7FFF00] transition-colors duration-200 font-normal"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span className="font-normal">{item.label}</span>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>

        <div className="bg-[#007FFF] pb-5 h-fit w-full text-sm text-white fontMont flex flex-col sm:flex-row justify-evenly pt-5">
          <p className="text-xs max-sm:text-center">Privacy Policy | Your Privacy Choices</p>
          <p className="text-xs max-sm:text-center">
            © 2025 Long Island Construction Plus+. All Rights Reserved. <span className="text-[#7FFF00]">Web Design</span> by{" "}
            <a
              href="https://brandedstrong.com"
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-[#7FFF00]"
            >
              Branded Stronge
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;

