// import React from "react";
// import { Link } from "react-router-dom"; // Import Link
// import "./navbar.css";
// import logoImage from "../assets/logo.png";

// function Navigation() {
//   return (
//     <nav
//       className="navigation"
//       data-scroll
//       data-scroll-sticky
//       data-scroll-target=".App"
//     >
//       <div className="logo">
//         <img src={logoImage} alt="Logo" />
//       </div>
//       <div className="nav-links">
//         <a href="#locations">LOCATIONS</a>
//         <a href="#about">ABOUT</a>
//         <a href="#shop">SHOP</a>
//         <a href="#contact">CONTACT</a>
//         {/* Use Link for internal routing to the room booking page */}
//         <Link to="/rooms" className="reserve-button">
//           BOOK A ROOM!
//         </Link>
//       </div>
//     </nav>
//   );
// }

// export default Navigation;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import logoImage from "../assets/logo.png";

function Navigation() {
  const navigate = useNavigate();

  const handleBookRoom = () => {
    // Check if the user is logged in
    const isLoggedIn = false; // Replace this with your actual authentication check

    if (isLoggedIn) {
      // If logged in, navigate to the room booking page
      navigate("/rooms");
    } else {
      // If not logged in, navigate to the login page
      navigate("/login");
    }
  };

  return (
    <nav
      className="navigation"
      data-scroll
      data-scroll-sticky
      data-scroll-target=".App"
    >
      <div className="logo">
        <img src={logoImage} alt="Logo" />
      </div>
      <div className="nav-links">
        <a href="#locations">LOCATIONS</a>
        <a href="#about">ABOUT</a>
        <a href="#shop">SHOP</a>
        <a href="#contact">CONTACT</a>
        <button onClick={handleBookRoom} className="reserve-button">
          BOOK A ROOM!
        </button>
      </div>
    </nav>
  );
}

export default Navigation;
