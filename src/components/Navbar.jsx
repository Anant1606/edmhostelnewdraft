import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Navigation() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
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
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const menuItems = [
    { label: "EVENTS", href: "#events" },
    { label: "STAY", href: "#stay" },
    { label: "RESTAURANT & BAR", href: "#restrobar" },
    { label: "BLOGS", href: "#blogs" },
    { label: "ABOUT US", href: "#about" },
    { label: "CONTACT", href: "#contact" }
  ];

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          !isAtTop ? "bg-black/50 backdrop-blur-sm" : ""
        }`}
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : "-100%" }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-full px-4 md:px-6 lg:px-8">
          <div className="max-w-[1440px] mx-auto flex items-center justify-between h-24">
            {/* Logo */}
            <motion.div
              className="pointer-events-auto cursor-pointer -ml-4"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onClick={handleLogoClick}
            >
              <img src="/images/logo.png" alt="EDM Logo" className="h-40 w-auto object-contain" />
            </motion.div>

            {/* Desktop Navigation */}
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
                    className="mr-12 text-white hover:text-[#c69947] transition-colors duration-200 whitespace-nowrap"
                    variants={itemVariants}
                  >
                    {label}
                  </motion.a>
                ))}
              </div>
              <motion.button 
                variants={itemVariants}
                className="border-2 border-[#c69947] text-[#c69947] px-6 py-2 text-lg cursor-pointer hover:bg-white hover:text-black transition-colors duration-300 ml-4 whitespace-nowrap"
              >
                PLAN YOUR EXPERIENCE WITH US
              </motion.button>
            </motion.div>

            {/* Mobile Menu Button */}
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

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 w-full h-full bg-black z-40 lg:hidden overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center justify-center min-h-screen py-20 px-4 space-y-6">
              {menuItems.map(({ label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  className="text-xl text-white hover:text-[#c69947] transition-colors duration-200"
                  variants={itemVariants}
                  onClick={() => setIsMenuOpen(false)}
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