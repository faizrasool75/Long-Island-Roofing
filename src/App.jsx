import { useEffect, useRef, useState } from "react";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Our Recent Projects", href: "#recent-projects" },
  { label: "Our Services", href: "#services" },
  { label: "Why Choose", href: "#why-us" },
];

const servicesData = [
  {
    icon: "/assets/svg/service-1.svg",
    title: "Residential Roofing & Repair",
    detail:
      "Emergency patching through complete re-roofs with premium shingles and honest estimates.",
  },
  {
    icon: "/assets/svg/service-2.svg",
    title: "Cedar Roofing & Siding",
    detail:
      "Expert cedar craftsmanship that balances rustic appeal with long-term protection.",
  },
  {
    icon: "/assets/svg/service-3.svg",
    title: "Siding Installation & Repair",
    detail:
      "Seamless siding installs and repairs that refresh curb appeal across Nassau and Suffolk.",
  },
  {
    icon: "/assets/svg/service-4.svg",
    title: "Gutters & Copper Work",
    detail:
      "Custom gutter profiles and copper detailing keep foundations dry and look sharp.",
  },
  {
    icon: "/assets/svg/service-5.svg",
    title: "Chimney Building & Repair",
    detail: "Stacked chimney rebuilds and waterproofing ensure safe, storm-ready vents.",
  },
  {
    icon: "/assets/svg/service-6.svg",
    title: "Flat & Commercial Roofing",
    detail: "CRE, TPO, and EPDM installs with commercial warranties for peace of mind.",
  },
  {
    icon: "/assets/svg/service-7.svg",
    title: "Rubber Roofing",
    detail: "Rubber roofing membranes for low-slope builds that need flexibility and durability.",
  },
  {
    icon: "/assets/svg/service-8.svg",
    title: "Metal Roofing",
    detail: "Modern metal panels that resist wind, hail, and deliver long service life.",
  },
];

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openService, setOpenService] = useState(null);
  const quickQuoteRef = useRef(null);
  const quoteTimerRef = useRef(null);
  const [showModalQuote, setShowModalQuote] = useState(false);
  const [quoteActive, setQuoteActive] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [quoteStatus, setQuoteStatus] = useState({ hero: false, modal: false });

  useEffect(() => {
    let swiperInstance;
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js";
    script.async = true;
    const initSwiper = () => {
      if (window.Swiper) {
        const isMobile = window.matchMedia("(max-width: 639px)").matches;
        swiperInstance = new window.Swiper(".mySwiper", {
          slidesPerView: isMobile ? 1.15 : 3.5,
          spaceBetween: isMobile ? 12 : 24,
          centeredSlides: isMobile,
          loop: true,
          speed: isMobile ? 6000 : 8000,
          autoplay: {
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: !isMobile,
          },
          freeMode: true,
          freeModeMomentum: false,
          grabCursor: true,
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
        });
      }
    };
    script.addEventListener("load", initSwiper);
    document.body.appendChild(script);
    return () => {
      script.removeEventListener("load", initSwiper);
      document.body.removeChild(script);
      if (swiperInstance) {
        swiperInstance.destroy();
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
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("btn-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    buttons.forEach((button) => observer.observe(button));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const revealTargets = document.querySelectorAll(".scroll-reveal, .scroll-reveal-left");
    if (!revealTargets.length) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      revealTargets.forEach((target) => target.classList.add("reveal-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            obs.unobserve(entry.target);
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
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("motion-visible");
            obs.unobserve(entry.target);
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

  const handleQuoteSubmit = (event, options = {}) => {
    event.preventDefault();
    const { closeModal = false, formKey = "hero" } = options;
    const formElement = event.target;
    setQuoteStatus((prev) => ({ ...prev, [formKey]: true }));
    formElement.reset();
    flashQuoteActive();
    if (closeModal) {
      setShowModalQuote(false);
    }
  };

  const handleFooterSubmit = (event) => {
    event.preventDefault();
    flashQuoteActive();
    // Placeholder: handle footer form data submission here.
  };

  const renderQuoteForm = (variant = "hero") => {
    const formKey = variant === "modal" ? "modal" : "hero";
    return (
    <form
      id="quick-quote"
      ref={variant === "hero" ? quickQuoteRef : null}
      className={`w-full max-sm:rounded-xl sm:w-[80%] bg-black sm:bg-black/70 p-8 flex flex-col gap-6 justify-start items-center border-2 transition ${
        quoteActive ? "border-[#7FFF00] shadow-[0_0_25px_rgba(127,255,0,0.55)]" : "border-transparent"
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
      <h2 className="fontMont font-semibold text-2xl sm:text-3xl text-white">
        GET A <span className="text-[#7FFF00]">QUICK</span> QUOTE!
      </h2>
      <input
        type="text"
        placeholder="Full Name"
        className="w-full outline-none border bg-transparent border-transparent text-white border-b-[#7FFF00] py-2 placeholder:fontMont placeholder:text-white placeholder:font-light placeholder:italic"
      />
      <input
        type="number"
        placeholder="Phone Number"
        className="w-full outline-none border bg-transparent border-transparent text-white border-b-[#7FFF00] py-2 placeholder:fontMont placeholder:text-white placeholder:font-light placeholder:italic"
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full outline-none border bg-transparent border-transparent text-white border-b-[#7FFF00] py-2 placeholder:fontMont placeholder:text-white placeholder:font-light placeholder:italic"
      />
      <textarea
        rows="4"
        placeholder="Message"
        className="w-full outline-none border bg-transparent border-transparent text-white border-b-[#7FFF00] py-2 placeholder:fontMont placeholder:text-white placeholder:font-light placeholder:italic"
      ></textarea>
      <button
        type="submit"
        className="fontMont mx-auto text-black font-bold text-sm sm:text-base rounded-xl px-6 py-3 flex justify-center items-center bg-[#7FFF00] hover:bg-white duration-200 ease-in"
      >
        Get a Quote
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

  return (
    <div className="main px-0 sm:px-2 pt-0 pb-0">
      <div
      id="mobileMenu"
        className={`fixed inset-0 h-full w-full bg-black text-white z-[99999] translate-x-full transition-transform duration-300 md:hidden p-6 ${
          mobileMenuOpen ? "translate-x-0" : ""
        }`}
      >
        <div className="flex justify-end items-start">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="w-12 h-12 rounded-full hover:text-black hover:bg-white text-black bg-[#7FFF00] flex sm:hidden justify-center items-center text-2xl"
          >
            <i className="ri-close-line"></i>
          </button>
        </div>
        <ul className="space-y-6 text-lg font-semibold flex h-full flex-col items-center justify-start relative pt-10">
          {navLinks.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="hover:text-[#7CFF00]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <div className="flex flex-col items-center gap-4">
              <button
                type="button"
                onClick={() => {
                  handleQuoteScroll();
                  setMobileMenuOpen(false);
                }}
                className="fontMont mt-12 text-black font-bold text-sm sm:text-base rounded-full px-8 py-3 flex justify-center items-center gap-2 bg-gradient-to-r from-[#7FFF00] to-[#55d500] hover:from-[#6ffb00] hover:to-[#72f201] transition duration-200 ease-in text-base shadow-[0_10px_30px_rgba(127,255,0,0.35)]"
              >
                Get a Quote
                <span className="w-7 h-7 p-2 bg-black flex justify-center rounded-full items-center">
                  <img src="/assets/svg/arrow.svg" alt="" className="w-full h-full object-contain" />
                </span>
              </button>
            <button
              type="button"
              className="mt-4 rounded-full border border-[#7FFF00] bg-transparent px-8 py-3 text-xs font-semibold uppercase tracking-widest text-[#7FFF00] hover:bg-[#7FFF00] hover:text-black transition"
              onClick={() => {
                window.location.href = "tel:+16314840098";
                setMobileMenuOpen(false);
              }}
            >
              Call Now: (631) 484-0098
            </button>
            </div>
          </li>
        </ul>
      </div>

      <header
        className={`w-full flex justify-between items-center fixed top-0 left-0 right-0 px-6 py-3 pt-7 z-[9999] transition-transform duration-300 ${
          navHidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <img src="/assets/images/logo.png" alt="Long Island Construction Plus+" className="w-32 sm:w-52" />
        <div className="hidden sm:flex justtify-start items-center gap-8">
          <div className="navMenu flex justify-start items-center gap-8">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="fontMont font-normal text-base hover:text-[#7FFF00] border border-transparent hover:border-b-[#7FFF00] duration-200 ease-in"
              >
                {item.label}
              </a>
            ))}
          </div>
          <button
            type="button"
            onClick={handleQuoteScroll}
            className="fontMont font-extrabold text-sm sm:text-base rounded-xl px-6 py-3 flex justify-center items-center gap-2 bg-[#7FFF00] hover:bg-black duration-200 ease-in hover:text-[#7FFF00]"
          >
            Get a Quote
            <span className="w-7 h-7 p-2 bg-black flex justify-center rounded-full items-center">
              <img src="/assets/svg/arrow.svg" alt="" className="w-full h-full object-contain" />
            </span>
          </button>
        </div>
        <button
          id="menuBtn"
          onClick={() => setMobileMenuOpen(true)}
          className="w-12 h-12 rounded-full hover:text-[#7FFF00] hover:bg-black text-black bg-[#7FFF00] flex sm:hidden justify-center items-center"
        >
          <i className="ri-menu-3-line text-xl font-extrabold"></i>
        </button>
      </header>

      <div className="hero fade-section bg-no-repeat bg-cover bg-center sm:bg-cover sm:bg-top-left flex-col sm:flex-row w-full min-h-screen pt-24 sm:pt-52 pb-6 sm:pb-16 flex justify-between items-center gap-6 px-4 sm:px-6 relative">
        <div className="w-full sm:w-fit flex flex-col justify-start items-start gap-4 sm:pl-8">
          <h1 className="text-5xl fontNF text-white leading-[1.2] hidden sm:block fade-heading reveal-from-left">
            RESIDENTIAL <span className="font-extrabold">&</span><br />
            COMMERCIAL <br />
            <span className="text-[#7FFF00]">ROOFING</span> <br />
            <span className="text-[#7FFF00]">EXPERTS</span> <br />
            YOU CAN <span className="text-[#7FFF00]">TRUST</span>
          </h1>
          <h1 className="text-[clamp(1.35rem,6vw,1.9rem)] fontNF text-white leading-[1.08] align-middle sm:hidden text-left fade-heading reveal-from-right hero-mobile-heading tracking-tight max-w-[18ch]">
            RESIDENTIAL <span className="font-extrabold">&</span>COMMERCIAL
            <span className="text-[#7FFF00]">ROOFING</span>
            <span className="text-[#7FFF00]">EXPERTS</span> YOU CAN
            <span className="text-[#7FFF00]">TRUST</span>
          </h1>
          <p className="font-light text-white fontMont text-xl hidden sm:block reveal-from-right">
            At <span className="font-semibold">Long Island Construction Plus+</span>, we bring over a <br />
            decade of experience delivering reliable, high-quality <br />
            roofing and exterior solutions for homes and businesses <br />
            across Long Island. Our family-owned team is known for <br />
            honest service, expert craftsmanship, and long-lasting <br />
            results you can count on.
          </p>
          <p className="font-light text-white fontMont text-center text-base sm:hidden reveal-from-left">
            At <span className="font-semibold">Long Island Construction Plus+</span>, we bring over a decade of experience delivering reliable, high-quality roofing and exterior solutions for homes and businesses across Long Island. Our family-owned team is known for honest service, expert craftsmanship, and long-lasting results you can count on.
          </p>
          <button className="fontMont mx-auto text-black font-bold text-sm sm:text-base rounded-xl px-6 py-3 flex justify-center items-center gap-2 bg-[#7FFF00] hover:bg-black duration-200 ease-in hover:text-[#7FFF00] mt-4 pop-in">
            Request Your Free Estimate
            <span className="w-7 h-7 p-2 bg-black flex justify-center rounded-full items-center">
              <img src="/assets/svg/arrow.svg" alt="" className="w-full h-full object-contain" />
            </span>
          </button>
        </div>
        <div className="w-full sm:w-[40%] flex justify-center sm:justify-start items-center">
          {renderQuoteForm("hero")}
        </div>
      </div>

      <div className="w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 px-4 py-10">
        {[
          { icon: "/assets/svg/bannericon-1.svg", label: "SINCE 2012" },
          { icon: "/assets/svg/bannericon-1.svg", label: "Family-Owned" },
          { icon: "/assets/svg/bannericon-3.svg", label: "Licensed & Insured" },
          { icon: "/assets/svg/bannericon-4.svg", label: "Serving Suffolk & Nassau County" },
        ].map((item, idx) => (
          <div
            key={item.label}
            className="info-icon reveal-from-bottom pop-in"
            style={{ animationDelay: `${idx * 0.15}s` }}
          >
            <div className="info-icon-circle">
              <img src={item.icon} alt={item.label} className="h-7 w-7 sm:h-8 sm:w-8" />
            </div>
            <p className="info-icon-title fontMont">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="section-2 fade-section scroll-reveal bg-[#CCE5FF] h-fit sm:h-[80dvh] w-full rounded-3xl flex flex-col sm:flex-row items-center pb-5 sm:pb-0 mb-5 sm:mb-10">
        <div className="w-full sm:w-[50%] h-full">
          <img
            className="w-full h-full object-cover rounded-3xl motion-float"
            src="https://images.pexels.com/photos/5549240/pexels-photo-5549240.jpeg?_gl=1*d6cx0t*_ga*MTAxMzMxNDc4MS4xNzY1NjE2ODY5*_ga_8JE65Q40S6*czE3NjU2MTg5NzMkbzIkZzEkdDE3NjU2MjA2MjUkajIzJGwwJGgw"
            alt=""
            data-float-speed="0.7"
            data-float-amplitude="10"
          />
        </div>
        <div className="flex flex-col gap-5 w-full pt-5 sm:pt-0 sm:w-[50%] justify-center items-center">
          <h2 className="text-[#7FFF00] text-3xl sm:text-4xl font-black uppercase fontNF max-sm:text-center hero-heading-shadow reveal-from-bottom">
            Special Offer
          </h2>
          <h1 className="text-black font-black text-4xl sm:text-7xl fontMont reveal-from-bottom">$2,000 OFF</h1>
          <h4 className="fontMont text-base sm:text-xl reveal-from-bottom">on full roof replacement or full siding projects.</h4>
          <p className="text-black fontMont text-lg italic font-light leading-normal reveal-from-bottom">(Restrictions apply. Ask for details.)</p>
          <button className="fontMont mx-auto text-black font-bold text-sm sm:text-base rounded-xl px-8 py-3 flex justify-center items-center gap-4 bg-[#7FFF00] hover:bg-black duration-200 ease-in hover:text-[#7FFF00] mt-4 pop-in">
            Claim Your Offer Now
            <span className="w-7 h-7 p-2 bg-black flex justify-center rounded-full items-center">
              <img src="/assets/svg/arrow.svg" alt="" className="w-full h-full object-contain" />
            </span>
          </button>
        </div>
      </div>

      <div className="section3 fade-section scroll-reveal" id="services">
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start sm:px-10 max-sm:gap-4">
          <h1 className="fontNF text-[#7FFF00] text-2xl sm:text-4xl uppercase w-full sm:w-[50%] hero-heading-shadow fade-heading is-visible text-center reveal-from-left">
            Our Services
          </h1>
          <p className="text-start text-lg fontMont font-normal w-1/2 hidden sm:block reveal-from-right">
            We specialize in high-quality roofing, siding, and exterior solutions for residential and commercial properties across Long Island.
          </p>
          <p className="text-sm fontMont font-normal sm:hidden text-center reveal-from-right">
            We specialize in high-quality roofing, siding, and exterior solutions for residential and commercial properties across Long Island.
          </p>
        </div>
        <div className="sm:flex mt-4 sm:mt-8 w-full gap-6">
          {[0, 1].map((column) => (
            <div key={column} className="flex w-full flex-col gap-4">
              {servicesData.slice(column * 4, column * 4 + 4).map((service, index) => {
                const serviceIndex = column * 4 + index;
                const isOpen = openService === serviceIndex;
                return (
                  <div
                    key={service.title}
                    className="accordion-item overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenService(isOpen ? null : serviceIndex)}
                      className="accordion-button w-full flex items-center gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left transition-all duration-300 hover:bg-[#f8fbff] group"
                      aria-expanded={isOpen}
                      aria-label={`Toggle ${service.title}`}
                    >
                      <span className="flex-shrink-0 p-2.5 sm:p-3 rounded-full bg-gradient-to-br from-[#CCE5FF] to-[#e8f4ff] shadow-sm group-hover:shadow-md transition-shadow duration-300">
                        <img src={service.icon} alt="" className="h-5 w-5 sm:h-6 sm:w-6" />
                      </span>
                      <span className="flex-1 text-sm sm:text-base font-bold text-black fontMont tracking-tight">
                        {service.title}
                      </span>
                      <svg
                        className={`accordion-chevron flex-shrink-0 w-5 h-5 text-[#007FFF] transition-transform duration-300 ease-in-out ${
                          isOpen ? "rotate-180" : "rotate-0"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div
                      className={`accordion-content overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="px-5 sm:px-6 pb-4 sm:pb-5 pt-1">
                        <div className="pl-0 sm:pl-12 border-l-0 sm:border-l-2 border-[#CCE5FF]">
                          <p className="text-sm sm:text-base fontMont font-normal leading-relaxed text-gray-700">
                            {service.detail}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div
        className="section4 fade-section scroll-reveal h-fit w-full relative px-10 items-start sm:flex mt-4 sm:mt-10 xl:pb-10 overflow-hidden"
        id="why-us"
      >
        <div className="w-full sm:w-[55%] h-full flex gap-2 flex-col items-center sm:items-start py-8">
          <h1 className="text-[#7FFF00] fontNF text-2xl sm:text-4xl uppercase hero-heading-shadow reveal-from-left">Why Choose</h1>
          <h2 className="max-sm:text-center text-black fontMont text-xl sm:text-4xl font-black sm:whitespace-nowrap reveal-from-left">
            Long Island Construction Plus+
          </h2>
          <p className="text-black fontMont text-sm sm:text-base w-full text-center sm:w-[80%] sm:text-start reveal-from-bottom">
            We take pride in providing professional service, honest pricing, and exceptional workmanship for every project.
          </p>
          <div className="mt-4 flex flex-col gap-4 sm:text-start">
            {[
              "Over 10 Years of Experience",
              "Family-Owned & Trusted Locally",
              "Fully Licensed & Insured",
              "Serving All Long Island Areas",
              "Fast, Reliable & Affordable",
            ].map((item) => (
              <div key={item} className="gap-3 flex items-center justify-between w-fit reveal-from-bottom">
                <img src="/assets/svg/tick.svg" alt="" className="w-5" />
                <h3 className="text-black fontMont text-base sm:text-xl font-bold">{item}</h3>
              </div>
            ))}
            <button className="fontMont w-fit text-black font-bold text-sm sm:text-base rounded-xl px-6 py-3 flex justify-center items-center gap-2 bg-[#7FFF00] hover:bg-black duration-200 ease-in hover:text-[#7FFF00] mt-4">
              Request Your Free Estimate
              <span className="w-7 h-7 p-2 bg-black flex justify-center rounded-full items-center">
                <img src="/assets/svg/arrow.svg" alt="" className="w-full h-full object-contain" />
              </span>
            </button>
          </div>
        </div>
        <div className="w-full h-[50dvh] sm:h-[70dvh] sm:w-[45%] items-center pt-5 sm:pt-0 relative">
          <img
            className="w-full h-full object-cover object-top motion-float"
            src="/assets/images/whyChoseSectionbg.png"
            alt=""
            data-float-speed="0.8"
            data-float-amplitude="7"
          />
          <div className="rounded-2xl overflow-hidden absolute -bottom-12 -left-40 hidden sm:block w-[350px] h-[50dvh] xl:h-[35dvh]">
            <img
              className="object-cover object-top w-full h-full xl:scale-125 motion-float"
              src="/assets/images/whyusebanner-new.png"
              alt=""
              data-float-speed="1"
              data-float-amplitude="9"
              data-float-phase="1.2"
            />
          </div>
        </div>
      </div>

      <div
        className="w-full min-h-fit py-12 sm:py-16 pb-16 sm:pb-20 flex flex-col gap-8 sm:gap-12 fade-section scroll-reveal-left"
        id="recent-projects"
      >
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start sm:px-10 max-sm:gap-4">
          <h2 className="text-[#7FFF00] fontNF text-2xl sm:text-4xl text-center hero-heading-shadow reveal-from-left">OUR RECENT PROJECTS</h2>
          <p className="text-lg fontMont font-normal w-1/2 hidden sm:block reveal-from-right">
            Take a look at our latest roofing, siding, and exterior work across Long Island. Each project reflects our dedication to quality and customer satisfaction.
          </p>
          <p className="text-sm fontMont font-normal sm:hidden text-center reveal-from-right">
            Take a look at our latest roofing, siding, and exterior work across Long Island. Each project reflects our dedication to quality and customer satisfaction.
          </p>
        </div>
        <div className="projects-carousel w-full h-[350px] sm:h-[400px] lg:h-[480px] relative reveal-from-bottom overflow-hidden px-4 sm:px-0">
          <div className="swiper mySwiper relative h-full">
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
                <div
                  key={src + idx}
                  className="swiper-slide !h-full"
                >
                  <div className="project-card group">
                    <img 
                      src={src} 
                      alt={`Construction project ${idx + 1}`} 
                      className="project-img"
                      loading="lazy"
                    />
                    <div className="project-overlay"></div>
                  </div>
                </div>
              ))}
            </div>
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

      <div className="w-full min-h-fit py-12 sm:py-16 pb-16 sm:pb-20 flex flex-col gap-8 sm:gap-12 fade-section">
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-[#7FFF00] fontNF text-2xl sm:text-4xl text-center hero-heading-shadow reveal-from-bottom">WHAT OUR CLIENTS SAY</h2>
          <div className="flex items-center gap-2 reveal-from-bottom">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-6 h-6 fill-[#FBBC04]" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
            <span className="fontMont font-bold text-lg sm:text-xl text-black">5.0</span>
            <span className="fontMont text-sm sm:text-base text-gray-600">· 453 reviews on Google</span>
          </div>
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6">
          {[
            {
              name: "Ange D.",
              date: "5 months ago",
              rating: 5,
              image: "https://randomuser.me/api/portraits/women/44.jpg",
              text: "Herman and his crew were terrific! I had received three other estimates in addition to LI Construction, and I am pleased with my selection—prompt, courteous attention throughout the entire project and even afterwards. Herman has returned multiple times to ensure everything is perfect. Highly professional team!",
            },
            {
              name: "Maria S.",
              date: "3 months ago",
              rating: 5,
              image: "https://randomuser.me/api/portraits/women/65.jpg",
              text: "Long Island Construction Plus did an amazing emergency roof replacement for us in Suffolk County. An older house with many leaks. Hermann, the owner was so kind to give us a credit of some of our fix up costs towards the much larger outlay for a new roof. Very honest and fair!",
            },
            {
              name: "Robert K.",
              date: "4 months ago",
              rating: 5,
              image: "https://randomuser.me/api/portraits/men/32.jpg",
              text: "I couldn't be happier with Long Island Construction Plus. Santos came and spent over an hour on my roof with a hose until he discovered where the leak was coming from. He fixed my leak and repaired all the other spots. Honest work at a fair price!",
            },
            {
              name: "Jennifer L.",
              date: "2 months ago",
              rating: 5,
              image: "https://randomuser.me/api/portraits/women/28.jpg",
              text: "Excellent value, honest, on time, great job. Santos reviewed our old roof and gave us a fair price explaining everything that needed to be done. Professional crew worked hard and steadily and finished the job in less than a day. Extremely satisfied!",
            },
            {
              name: "Michael P.",
              date: "6 months ago",
              rating: 5,
              image: "https://randomuser.me/api/portraits/men/54.jpg",
              text: "Outstanding service from start to finish. The team was professional, respectful of our property, and the quality of work exceeded our expectations. They completed our siding project on time and within budget. Highly recommend!",
            },
            {
              name: "Sarah T.",
              date: "1 month ago",
              rating: 5,
              image: "https://randomuser.me/api/portraits/women/72.jpg",
              text: "Herman and his team did a fantastic job on our roof repair. They were prompt, professional, and the workmanship is top-notch. The crew cleaned up everything perfectly. We'll definitely use them again for future projects!",
            },
          ].map((review, idx) => (
            <div
              key={review.name}
              className="testimonial-card bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 flex flex-col gap-4 p-6 transition-all duration-300 reveal-from-bottom"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="reviewer-avatar w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden flex-shrink-0 shadow-md ring-2 ring-white">
                    <img 
                      src={review.image} 
                      alt={review.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="fontMont font-bold text-base text-black">{review.name}</h3>
                    <p className="fontMont text-xs text-gray-500">{review.date}</p>
                  </div>
                </div>
                <svg className="w-5 h-5 flex-shrink-0 fill-[#4285F4]" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(review.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-[#FBBC04]" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="fontMont text-sm sm:text-base text-gray-700 leading-relaxed">{review.text}</p>
            </div>
          ))}
        </div>
        <button 
          onClick={() => window.open('https://www.google.com/maps/place/Long+Island+Construction+Plus', '_blank')}
          className="fontMont mx-auto text-black font-bold text-sm sm:text-base rounded-xl px-6 py-3 flex justify-center items-center gap-2 bg-[#7FFF00] hover:bg-black duration-200 ease-in hover:text-[#7FFF00] mt-4 pop-in"
        >
          Read more on Google
          <span className="w-7 h-7 p-2 bg-black flex justify-center rounded-full items-center">
            <img src="/assets/svg/arrow.svg" alt="" className="w-full h-full object-contain" />
          </span>
        </button>
      </div>

      <div
        className="w-full flex flex-col justify-start items-center rounded-3xl gap-8 text-white py-10"
        style={{
          backgroundImage: "url('/assets/images/footerBeforeBanner.png')",
          backgroundPosition: "bottom",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h2 className="text-2xl sm:text-4xl fontNF text-center reveal-from-bottom">
          READY TO GET <span className="text-[#7FFF00]">STARTED?</span>
        </h2>
        <p className="text-lg fontMont font-light w-1/2 hidden sm:block text-center reveal-from-bottom">
          Contact our expert roofing team today and ask for your <span className="font-semibold text-[#7FFF00]">FREE ESTIMATE.</span> <br />
          We'll respond quickly to schedule your on-site inspection.
        </p>
        <p className="text-sm fontMont font-normal sm:hidden text-center reveal-from-bottom">
          Take a look at our latest roofing, siding, and exterior work across Long Island. Each project reflects our dedication to quality and customer satisfaction.
        </p>
        <div className="w-full flex gap-6 flex-col sm:flex-row justify-center items-center">
          <button className="fontMont text-black font-bold text-sm sm:text-base rounded-xl px-6 py-3 flex justify-center items-center gap-2 bg-[#7FFF00] hover:bg-black duration-200 ease-in hover:text-[#7FFF00] mt-4 pop-in">
            Request Your Free Estimate
            <span className="w-7 h-7 p-2 bg-black flex justify-center rounded-full items-center">
              <img src="/assets/svg/arrow.svg" alt="" className="w-full h-full object-contain" />
            </span>
          </button>
          <button className="fontMont text-white font-bold text-sm sm:text-base rounded-xl px-6 py-3 flex justify-center items-center gap-2 bg-transparent hover:bg-[#ffffff] duration-200 ease-in hover:text-black mt-4 border border-[#7FFF00] hover:border-transparent pop-in">
            Call Now: (631) 484-0098
            <span className="w-7 h-7 p-2 bg-black flex justify-center rounded-full items-center">
              <img src="/assets/svg/arrow.svg" alt="" className="w-full h-full object-contain" />
            </span>
          </button>
        </div>
      </div>

      <div className="flex flex-col mt-8">
        <div className="footer bg-[#007FFF] flex sm:flex-row flex-col w-full justify-between rounded-tr-3xl rounded-tl-3xl pt-8 px-4 sm:px-10">
          <div className="flex flex-col gap-1 w-full sm:w-[30%] text-white fontMont text-sm py-6">
            <img className="w-[80%] pb-8" src="/assets/images/logo.png" alt="" />
            {[
              { icon: "/assets/svg/phone.svg", label: "(631) 484-0098" },
              { icon: "/assets/svg/map.svg", label: "Serving Suffolk County & Nassau County" },
              { icon: "/assets/svg/email.svg", label: "liconstructionplus@gmail.com" },
              { icon: "/assets/svg/time.svg", label: "Monday – Saturday | 8:00 AM – 6:00 PM" },
            ].map((item) => (
              <div key={item.label} className="flex gap-4">
                <img src={item.icon} alt="" />
                <h1>{item.label}</h1>
              </div>
            ))}
          </div>
          <div className="w-full sm:w-[20%] text-white fontMont text-sm flex flex-col gap-3 capitalize sm:pl-10 py-6">
            <h1 className="uppercase font-black text-2xl sm:text-base">Quick links</h1>
            {["Home", "About us", "Our services", "Why Choose us", "get a Quote"].map((link) => (
              <p key={link} className="text-sm sm:text-base">
                {link}
              </p>
            ))}
          </div>
          <div className="w-full sm:w-1/2 flex flex-col max-sm:px-2 items-start justify-start py-6 max-sm:border max-sm:border-white max-sm:rounded-2xl">
            <h1 className="fontNF text-sm sm:text-lg uppercase text-white font-black leading-none max-sm:text-center">
              Request Your Free Estimate Today!
            </h1>
            <p className="text-[3vw] sm:text-[0.8vw] text-white fontMont max-sm:mt-4 max-sm:text-center">
              Get a no-obligation quote from our expert roofing and siding team. Fast, reliable, and trusted by homeowners across Long Island.
            </p>
            <form
              onSubmit={handleFooterSubmit}
              className="overflow-hidden w-full items-center flex flex-col justify-between items-center pt-4"
            >
              <div className="w-full flex flex-col sm:flex-row sm:justify-between max-sm:gap-6">
                <input
                  className="w-full sm:w-[30%] outline-none border bg-transparent border-transparent text-white border-b-[#7FFF00] py-2 placeholder:fontMont placeholder:text-white placeholder:font-light placeholder:italic"
                  type="text"
                  placeholder="Full Name"
                />
                <input
                  className="w-full sm:w-[30%] outline-none border bg-transparent border-transparent text-white border-b-[#7FFF00] py-2 placeholder:fontMont placeholder:text-white placeholder:font-light placeholder:italic"
                  type="number"
                  placeholder="Phone Number"
                />
                <input
                  className="w-full sm:w-[30%] outline-none border bg-transparent border-transparent text-white border-b-[#7FFF00] py-2 placeholder:fontMont placeholder:text-white placeholder:font-light placeholder:italic"
                  type="email"
                  placeholder="Email"
                />
              </div>
              <textarea
                rows="2"
                placeholder="Message"
                className="w-full outline-none max-sm:mt-4 border bg-transparent border-transparent text-white border-b-[#7FFF00] py-2 placeholder:fontMont placeholder:text-white placeholder:font-light placeholder:italic"
              ></textarea>
              <button
                type="submit"
                className="bg-[#7FFF00] px-4 py-1 mt-5 rounded-3xl fontMont font-bold uppercase text-sm hover:text-[#7FFF00] hover:bg-black transition-all duration-300"
              >
                Get a Quote
              </button>
            </form>
          </div>
        </div>

        <div className="bg-[#007FFF] pb-5 h-fit w-full text-sm text-white fontMont flex flex-col sm:flex-row justify-evenly pt-5">
          <p className="text-xs max-sm:text-center">Privacy Policy | Your Privacy Choices</p>
          <p className="text-xs max-sm:text-center">
            © 2025 Long Island Construction Plus+. All Rights Reserved. <span className="text-[#7FFF00]">Web Design</span> By Latin Branding
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;

