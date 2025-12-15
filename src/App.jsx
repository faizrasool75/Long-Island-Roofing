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
          slidesPerView: 1,
          spaceBetween: 20,
          loop: true,
          speed: 1200,
          autoplay: isMobile
            ? false
            : {
                delay: 3000,
                disableOnInteraction: false,
              },
          breakpoints: {
            640: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          },
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
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
    <div className="main px-0 sm:px-2 pt-2 pb-0">
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

      <div className="hero fade-section bg-no-repeat bg-contain sm:bg-cover bg-top sm:bg-top-left flex-col sm:flex-row w-full min-h-screen pt-28 sm:pt-52 pb-6 sm:pb-16 flex justify-between items-center gap-6 px-0 sm:px-6 relative">
        <div className="w-fit flex flex-col justify-start items-start gap-4 sm:pl-8">
          <h1 className="text-5xl fontNF text-white leading-[1.2] hidden sm:block fade-heading reveal-from-left">
            RESIDENTIAL <span className="font-extrabold">&</span><br />
            COMMERCIAL <br />
            <span className="text-[#7FFF00]">ROOFING</span> <br />
            <span className="text-[#7FFF00]">EXPERTS</span> <br />
            YOU CAN <span className="text-[#7FFF00]">TRUST</span>
          </h1>
          <h1 className="text-[2rem] fontNF text-white leading-[49px] align-middle sm:hidden text-center fade-heading reveal-from-right hero-mobile-heading">
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

      <div className="w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 px-4 py-10">
        {[
          { icon: "/assets/svg/bannericon-1.svg", label: "SINCE 2012" },
          { icon: "/assets/svg/bannericon-1.svg", label: "Family-Owned" },
          { icon: "/assets/svg/bannericon-3.svg", label: "Licensed & Insured" },
          { icon: "/assets/svg/bannericon-4.svg", label: "Serving Suffolk & Nassau County" },
        ].map((item, idx) => (
          <div
            key={item.label}
            className="info-icon fade-heading pop-in"
            style={{ animationDelay: `${idx * 0.15}s` }}
          >
            <img src={item.icon} alt={item.label} className="mx-auto mb-2 h-8 w-8" />
            <span className="font-bold fontMont text-black text-[0.7rem]">{item.label}</span>
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
                    className="flex flex-col gap-2 rounded-[30px] bg-gradient-to-r from-white to-[#f0f9ff] p-1 shadow-[0_8px_20px_rgba(0,0,0,0.1)]"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenService(isOpen ? null : serviceIndex)}
                      className={`w-full flex items-center gap-4 bg-[#CCE5FF] px-6 py-4 rounded-[28px] transition-all ${
                        isOpen ? "shadow-[0_12px_30px_rgba(0,0,0,0.25)]" : "hover:translate-y-[-2px]"
                      }`}
                      aria-expanded={isOpen}
                    >
                      <span className="p-3 rounded-full bg-white shadow-inner">
                        <img src={service.icon} alt="" className="h-5 w-5 sm:h-6 sm:w-6" />
                      </span>
                      <span className="flex-1 text-left text-sm font-bold uppercase text-black sm:text-base">
                        {service.title}
                      </span>
                      <span
                        className={`accordion-indicator text-xl font-bold ${isOpen ? "rotate-45" : ""}`}
                      >
                        {isOpen ? "×" : "+"}
                      </span>
                    </button>
                    {isOpen && (
                      <p className="px-6 pb-4 text-xs font-normal uppercase leading-relaxed text-[#0c1623]">
                        {service.detail}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div
        className="section4 fade-section scroll-reveal h-fit w-full relative px-10 items-start sm:flex mt-4 sm:mt-10 xl:pb-10"
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
        className="w-full min-h-fit sm:min-h-screen py-8 pb-20 sm:pb-12 flex flex-col gap-12 fade-section scroll-reveal-left"
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
        <div className="crousal w-full h-[50dvh] sm:h-[60dvh] relative reveal-from-bottom">
          <div className="swiper mySwiper relative">
          <div className="swiper-wrapper">
            {[
              "/assets/images/sliderimage-4.png",
              "/assets/images/sliderImage-2.png",
              "/assets/images/sliderimage-3.png",
              "/assets/images/sliderimage-4.png",
              "/assets/images/sliderImage-2.png",
            ].map((src, idx) => (
              <div
                key={src + idx}
                className="swiper-slide !w-full sm:!w-1/4 rounded-[28px] overflow-hidden scroll-animate"
              >
                <div className="slide-card">
                  <img src={src} alt={`Project ${idx + 1}`} className="slide-img" />
                  <div className="slide-overlay">
                    <p className="slide-badge">Project {idx + 1}</p>
                    <h3 className="slide-title">Premium Roofing</h3>
                    <p className="slide-copy">Modern exteriors, lasting craftsmanship.</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>
          <div className="swiper-pagination absolute !-bottom-10 !left-0"></div>
        </div>
      </div>

      {showModalQuote && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 p-4 sm:p-6">
          <div className="w-full max-w-3xl">
            {renderQuoteForm("modal")}
          </div>
        </div>
      )}

      <div className="w-full min-h-screen flex flex-col gap-12 py-6 pb-12 fade-section">
        <h2 className="text-[#7FFF00] fontNF text-2xl sm:text-4xl text-center hero-heading-shadow reveal-from-bottom">WHAT OUR CLIENTS SAY</h2>
        <div className="w-full flex flex-col sm:flex-row justify-between gap-6 items-center">
          {[
            {
              text: "Long Island Construction Plus did an amazing emergency roof replacement for us in Suffolk County in the Spring of this year. An older house with many leaks. We started to try to patch and quickly realized we needed a whole new roof. Hermann, the owner was so kind to give us a credit of some of our fix up costs towards the much larger outlay for a new roof...",
              image: "/assets/images/review-1.png",
            },
            {
              text: "I couldn't be happier with Long Island Construction Plus. I had another roofer come to my house and after five minutes told me I needed a new roof. Santos came and spent over an hour on my roof with a hose until he discovered where the leak was coming from. He fixed my leak and repaired all the other spots...",
              image: "/assets/images/review-2.png",
            },
            {
              text: "Excellent value, honest, on time, great job. Santos reviewed our old roof and gave us a fair price explaining everything that needed to be done. Showed up exactly when he said he would within a week of original estimate, professional crew worked hard and steadily and finished the job in less than a day. extremely satisfied and would recommend for any work.",
              image: "/assets/images/review-3.png",
            },
          ].map((review) => (
            <div
              key={review.image}
              className="w-full sm:w-1/3 h-fit sm:h-[50dvh] rounded-xl shadow-[0_0_15px_#00000040] flex flex-col max-sm:gap-6 justify-between items-start p-5 pop-in motion-float"
              data-float-amplitude="5"
            >
              <p className="text-sm sm:text-base fontMont">{review.text}</p>
              <img src={review.image} alt="" className="w-44" />
            </div>
          ))}
        </div>
        <button className="fontMont mx-auto text-black font-bold text-sm sm:text-base rounded-xl px-6 py-3 flex justify-center items-center gap-2 bg-[#7FFF00] hover:bg-black duration-200 ease-in hover:text-[#7FFF00] mt-4 pop-in">
          Read more at Google
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

