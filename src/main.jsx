import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;


const script = document.createElement('script');
script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places`;
script.async = true;
script.defer = true;
document.head.appendChild(script);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
