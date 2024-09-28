import React, { useRef } from "react";
import { Routes, Route } from "react-router-dom";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import Navbar from "./components/Navbar";
import Hero from "./components/hero";
import VerticalSocialBar from "./components/verticalSocialBar";
import Footer from "./components/footer";
import EventSelector from "./components/eventCard";
import EventDetail from "./components/eventDetail";
import Testimonials from "./components/TestimonialCard";
import RoomDetail from "./pages/roomdetails"
import RoomList from "./pages/roomlist"; // Import RoomList component
import EventDetails from "./pages/eventdetails";
import EventLists from "./pages/eventlist";
import "./App.css";
import AnimatedCursor from "react-animated-cursor";

function App() {
  const containerRef = useRef(null);

  return (
    <LocomotiveScrollProvider
      options={{
        smooth: true,
        // You can add more options here as needed
      }}
      containerRef={containerRef}
    >
      <div className="App" data-scroll-container ref={containerRef}>
        <AnimatedCursor
          innerSize={8}
          outerSize={50}
          innerScale={1}
          outerScale={1.5}
          outerAlpha={0}
          hasBlendMode={true}
          innerStyle={{
            backgroundColor: "#fff",
          }}
          outerStyle={{
            border: "3px solid  #fff",
          }}
        />
        <Navbar />
        <VerticalSocialBar />
        <main data-scroll-section>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <EventSelector />
                  <Testimonials />
                </>
              }
            />
            <Route path="/event/:id" element={<EventDetail />} />
            {/* Add the RoomList route */}
            <Route path="/rooms" element={<RoomList />} />
            <Route path="/rooms/:id" element={<RoomDetail/>} />
            <Route path="/event" element={<EventLists />} />
            <Route path="/events/:id" element={<EventDetails/>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </LocomotiveScrollProvider>
  );
}

export default App;
