import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsAtTop(currentScrollY === 0);
      setIsVisible(currentScrollY <= lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleLogoClick = () => {
    navigate("/");
  };

  const scrollToSection = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      // Close menu first
      setIsMenuOpen(false);

      // Add a delay to ensure menu closing animation completes
      setTimeout(() => {
        // Get updated element position after menu closes
        const headerOffset = window.innerWidth >= 1024 ? 128 : 80; // Adjust offset based on screen size
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }, 300); // Increased delay to account for menu closing animation
    }
  };

  const handleSmoothScroll = async (e, targetId) => {
    e.preventDefault();

    // Handle About Us page navigation
    if (targetId === "./introduction") {
      setIsMenuOpen(false);
      navigate(targetId);
      return;
    }

    const elementId = targetId.replace("#", "");
    const isHomePage = location.pathname === "/";

    if (!isHomePage) {
      // If not on home page, navigate to home first
      await navigate("/");
      // Wait for navigation and render to complete
      setTimeout(() => {
        scrollToSection(elementId);
      }, 300);
    } else {
      // If already on home page, just scroll
      scrollToSection(elementId);
    }
  };

  const menuItems = [
    { label: "EVENTS", href: "#events" },
    { label: "STAY", href: "#stay" },
    { label: "RESTAURANT & BAR", href: "#restrobar" },
    { label: "BLOGS", href: "#blogs" },
    { label: "ABOUT US", href: "./introduction" },
    { label: "CONTACT", href: "#contact" },
  ];

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <>
      <AnimatePresence>
        {!isMenuOpen && (
          <motion.nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${
              !isAtTop ? "bg-black/50 backdrop-blur-sm" : ""
            }`}
            initial={{ y: 0 }}
            animate={{ y: isVisible ? 0 : "-100%" }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-full px-4 md:px-6 lg:px-8">
              <div className="max-w-[1440px] mx-auto flex items-center justify-between h-20 lg:h-32">
                <motion.div
                  className="pointer-events-auto cursor-pointer"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  onClick={handleLogoClick}
                >
                  <img
                    src="/images/logo.png"
                    alt="EDM Logo"
                    className="h-16 lg:h-32 w-auto object-contain"
                  />
                </motion.div>
                <motion.div
                  className="hidden lg:flex items-center"
                  variants={navVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="flex items-center text-lg">
                    {menuItems.map(({ label, href }) => (
                      <motion.a
                        key={label}
                        href={href}
                        onClick={(e) => handleSmoothScroll(e, href)}
                        className="mr-8 text-white hover:text-[#c69947] transition-colors duration-200"
                        variants={itemVariants}
                      >
                        {label}
                      </motion.a>
                    ))}
                  </div>
                  <motion.button
                    variants={itemVariants}
                    className="border-2 border-[#c69947] text-[#c69947] px-6 py-2 text-lg cursor-pointer hover:bg-white hover:text-black transition-colors duration-300"
                  >
                    PLAN YOUR EXPERIENCE WITH US
                  </motion.button>
                </motion.div>
                <div className="lg:hidden flex items-center justify-end pointer-events-auto">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="text-white z-50"
                  >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
                </div>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 w-full h-full bg-black z-40 lg:hidden overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center justify-center min-h-screen py-20 px-4 space-y-6 relative">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-4 right-4 text-white"
              >
                <X size={24} />
              </button>
              {menuItems.map(({ label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  className="text-xl text-white hover:text-[#c69947] transition-colors duration-200"
                  variants={itemVariants}
                  onClick={(e) => handleSmoothScroll(e, href)}
                >
                  {label}
                </motion.a>
              ))}
              <motion.button
                variants={itemVariants}
                className="mt-8 border-2 border-[#c69947] text-[#c69947] px-8 py-3 text-lg hover:bg-[#c69947] hover:text-white transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                PLAN YOUR EXPERIENCE
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navigation;