import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faMusic, faUsers, faClockFour } from '@fortawesome/free-solid-svg-icons';

const EventCard = ({ event, onSelect, isSelected }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCardClick = () => {
    if (isMobile) {
      setIsFlipped(!isFlipped);
    } else {
      onSelect(event);
    }
  };

  const handleCardHover = () => {
    if (!isMobile) {
      setIsFlipped(!isFlipped);
    }
  };

  const handleSelectClick = (e) => {
    e.stopPropagation(); // Prevent triggering handleCardClick
    onSelect(event);
  };

  return (
    <div
      className={`event-card w-full md:w-1/3 h-[500px] relative cursor-pointer ${isFlipped ? 'flipped' : ''}`}
      onClick={handleCardClick}
      onMouseEnter={handleCardHover}
      onMouseLeave={handleCardHover}
    >
      {/* Front of the Card */}
      <div
        className={`event-front absolute inset-0 bg-cover bg-center transition-transform duration-500 transform-preserve-3d ${isFlipped ? '-rotate-y-180' : ''}`}
        style={{ backgroundImage: `url(${event.event_images[0]?.url})` }} // Using the first image URL
      />
      
      {/* Back of the Card */}
      <div
        className={`event-back absolute inset-0 bg-white p-4 transition-transform duration-500 transform-preserve-3d rotate-y-180 ${isFlipped ? 'rotate-y-0' : ''}`}
      >
        <div className="event-details h-full flex flex-col justify-between">
          <div>
            <h3 className="event-name text-xl font-bold mb-2">{event.event_name}</h3>
            <div className="event-info flex items-center space-x-2 mb-2">
              <div className="event-date flex items-center">
                <FontAwesomeIcon icon={faCalendar} className="mr-1" />
                <span className="text-sm">{new Date(event.event_date).toLocaleDateString()}</span>
              </div>
              <div className="event-time flex items-center">
                <FontAwesomeIcon icon={faClockFour} className="mr-1" />
                <span className="text-sm">{event.event_duration} hours</span>
              </div>
            </div>
            <div className="event-pricing flex justify-between items-center">
              <div className="event-price">
                <span className="text-gray-500 text-sm">Price per Ticket</span>
                <strong className="text-blue-500">Rs {event.event_capacity}</strong> {/* Placeholder, replace as needed */}
              </div>
              <div className="event-capacity flex items-center">
                <FontAwesomeIcon icon={faUsers} className="mr-1" />
                <span className="text-sm">{event.event_capacity} Capacity</span>
              </div>
            </div>
            <div className="event-description mb-4">
              <p className="text-sm">{event.event_description}</p>
            </div>
          </div>

          {/* Select Button */}
          <button
            className={`select-btn ${isSelected ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'} text-white font-medium py-1 px-3 rounded text-sm`}
            onClick={handleSelectClick}
          >
            {isSelected ? 'Selected' : 'Select'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
