import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Instagram, Youtube, Linkedin, X } from "lucide-react";

const Footer = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [mapData, setMapData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Weather API configuration (OpenWeatherMap - Free Tier)
  const WEATHER_API_KEY = 'YOUR_OPENWEATHER_API_KEY';
  const LOCATION_LAT = 32.2514; 
  const LOCATION_LON = 76.3310; 

  // MapmyIndia (Mappls) API configuration
  const MAPPLS_API_KEY = 'YOUR_MAPPLS_API_KEY';
  const MAPPLS_CLIENT_ID = 'YOUR_MAPPLS_CLIENT_ID';

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${LOCATION_LAT}&lon=${LOCATION_LON}&appid=${WEATHER_API_KEY}&units=metric`
        );
        
        if (!response.ok) {
          throw new Error('Weather data fetch failed');
        }
        
        const data = await response.json();
        setWeatherData({
          temperature: Math.round(data.main.temp),
          description: data.weather[0].description.charAt(0).toUpperCase() + 
                       data.weather[0].description.slice(1),
          humidity: data.main.humidity,
          windSpeed: data.wind.speed
        });
      } catch (error) {
        console.error('Error fetching weather:', error);
        setWeatherData(null);
      }
    };

    const fetchMapData = async () => {
      try {
        // Mappls Static Map API endpoint
        const mapUrl = `https://apis.mappls.com/advancedmaps/v1/${MAPPLS_API_KEY}/map_style?center=${LOCATION_LAT},${LOCATION_LON}&zoom=15&size=400x200&markers=color:red|${LOCATION_LAT},${LOCATION_LON}&ssf=true`;
        
        // Verify the map URL (this is a simplified example)
        const response = await fetch(mapUrl, {
          headers: {
            'Authorization': `Bearer ${MAPPLS_CLIENT_ID}`,
            'Content-Type': 'image/png'
          }
        });

        if (!response.ok) {
          throw new Error('Map data fetch failed');
        }

        // Assuming the API returns the image directly
        const mapBlob = await response.blob();
        setMapData(URL.createObjectURL(mapBlob));
      } catch (error) {
        console.error('Error fetching map:', error);
        setMapData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeatherData();
    fetchMapData();
  }, []);

  return (
    <footer className="bg-[#01231f] text-white py-12 font-sans" id="contact">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:border-r lg:border-gray-200/10 lg:pr-8">
            <h3 className="text-xl font-bold mb-6">EDM HOSTEL</h3>
            <p className="text-sm leading-relaxed">
              EDM Hostel in Dharamshala offers a peaceful place with modern
              amenities amidst the spiritual ambiance of the sacred town.
              Comfortable rooms, in-house restaurant, and warm hospitality make
              it an ideal choice for pilgrims and tourists seeking a tranquil
              stay near major attractions like the Aghanjar Temple and Triund
              Hill.
            </p>
          </div>

          <div className="lg:border-r lg:border-gray-200/10 lg:pr-8">
            <h3 className="text-xl font-bold mb-6">CONTACT US</h3>
            <ul className="space-y-6 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                <span>
                  EDM Hostel, Upper Dharamkot, Dharamshala, HP. 176219
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span>+91 8091977846</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span>edmhostel@gmail.com</span>
              </li>
            </ul>
          </div>

          <div className="lg:border-r lg:border-gray-200/10 lg:pr-8">
            <h3 className="text-xl font-bold mb-6">WEATHER</h3>
            <div className="text-sm space-y-2">
              <h4 className="text-lg font-semibold">DHARAMSHALA</h4>
              {isLoading ? (
                <p>Loading weather...</p>
              ) : weatherData ? (
                <>
                  <p>{weatherData.description}</p>
                  <p>{weatherData.temperature}°C</p>
                  <p>Humidity: {weatherData.humidity}%</p>
                  <p>Wind: {weatherData.windSpeed} m/s</p>
                </>
              ) : (
                <p>Weather unavailable</p>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6">LOCATION</h3>
            <div className="w-full h-48 bg-gray-700 rounded-lg overflow-hidden">
              {isLoading ? (
                <div className="w-full h-full flex items-center justify-center text-sm">
                  Loading map...
                </div>
              ) : mapData ? (
                <img 
                  src={mapData} 
                  alt="Hostel Location" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-sm">
                  Map unavailable
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Rest of the footer remains the same as in the previous version */}
        <div className="mt-12 pt-8 border-t border-gray-200/10">
          <div className="flex justify-center space-x-6 mb-6">
            <a
              href="https://www.instagram.com/edm_hostel"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="https://www.youtube.com/c/edmhostel"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <Youtube className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/company/edm-hostel"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="https://www.x.com/edm_hostel"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <X className="w-6 h-6" />
            </a>
          </div>

          <p className="text-center text-sm mb-4">© 2024 EDM Hostel</p>

          <div className="flex flex-wrap justify-center items-center gap-4 text-sm">
            <Link 
              to="/policy" 
              className="hover:underline"
              onClick={() => window.scrollTo(0, 0)}
            >
              PRIVACY POLICY
            </Link>
            <div className="flex items-center">
              <span className="mr-2">WEBSITE BY</span>
              <a
                href="https://www.linkedin.com/in/mohin-profile"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline mx-1"
              >
                Mohin
              </a>
              <span className="mx-1">•</span>
              <a
                href="https://www.linkedin.com/in/anant-profile"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline mx-1"
              >
                Anant
              </a>
              <span className="mx-1">•</span>
              <a
                href="https://www.linkedin.com/in/suryansh-profile"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline mx-1"
              >
                Suryansh
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;