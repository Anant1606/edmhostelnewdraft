import React, { useState, useRef, useEffect } from "react";
import ApiService from "../api/apiService"; // Assuming ApiService handles HTTP requests
import EventCard from "./test2"; // Component for individual event cards

const EventSelectionPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [guests, setGuests] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState(null);
  const bookingFormRef = useRef(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await ApiService.get("/api/event/list");

        console.log("API Response:", response); // Debugging log

        if (
          response &&
          response.result &&
          response.result.data &&
          response.result.data.rows
        ) {
          setEvents(response.result.data.rows || []);
        } else {
          setEvents([]);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    if (selectedEvent && bookingFormRef.current) {
      bookingFormRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedEvent]);

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    setGuests(1);
  };

  const calculateTotal = () => {
    const basePrice = selectedEvent?.event_price * guests;
    const taxes = Math.round(basePrice * 0.12);
    const serviceFee = 50;
    return basePrice + taxes + serviceFee;
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (guests <= 0) return;

    setIsSubmitting(true);
    setBookingError(null);

    try {
      // Assuming ApiService has a post method for sending POST requests
      const response = await ApiService.post("/api/event/:id/book", {
        eventId: selectedEvent.event_id,
        guests,
        totalAmount: calculateTotal(),
        customerDetails: {
          // Assuming you'd collect customer details like name, email, etc.
          name: "John Doe", // Example, replace with actual form data
          email: "johndoe@example.com",
        },
      });

      alert(response.data.message); // Notify user about the booking success

      // Optionally, reset state after successful booking
      setSelectedEvent(null);
      setGuests(1);
    } catch (error) {
      console.error("Error submitting booking:", error);
      setBookingError("Failed to submit the booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="event-container">
      <h1 className="text-4xl font-bold text-center mt-8 mb-4">Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {isLoading ? (
          <p>Loading events...</p>
        ) : events.length > 0 ? (
          events.map((event, index) => (
            <EventCard
              key={index}
              event={event}
              onSelect={handleEventSelect}
              isSelected={selectedEvent?.event_name === event.event_name}
            />
          ))
        ) : (
          <p>No events available.</p>
        )}
      </div>

      {selectedEvent && (
        <div ref={bookingFormRef} className="booking-form mt-8">
          <h2 className="text-center font-bold text-xl mb-4">
            Book "{selectedEvent.event_name}"
          </h2>
          <form
            onSubmit={handleBookingSubmit}
            className="bg-gray-800 text-white p-4 rounded-lg max-w-md mx-auto"
          >
            <label>Guests:</label>
            <select value={guests} onChange={(e) => setGuests(Number(e.target.value))}>
              {Array.from({ length: selectedEvent.event_capacity }, (_, i) => i + 1).map(
                (guest) => (
                  <option key={guest} value={guest}>
                    {guest} {guest > 1 ? "Guests" : "Guest"}
                  </option>
                )
              )}
            </select>
            <div>
              <p>Price per guest: ₹{selectedEvent.event_price}</p>
              <p>Taxes: ₹{Math.round(selectedEvent.event_price * 0.12)}</p>
              <p>Service Fee: ₹50</p>
              <p>Total: ₹{calculateTotal()}</p>
            </div>
            {bookingError && <p className="text-red-500">{bookingError}</p>}
            <button
              type="submit"
              disabled={guests <= 0 || isSubmitting}
              className="mt-4 p-2 bg-blue-600 text-white rounded"
            >
              {isSubmitting ? "Booking..." : "Book Now"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EventSelectionPage;
