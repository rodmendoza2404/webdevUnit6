import React from 'react';
import './BreweryCard.css';

const BreweryCard = ({ brewery }) => {
  const getTypeIcon = (type) => {
    switch (type) {
      case 'micro':
        return '🍺';
      case 'brewpub':
        return '🍽️';
      case 'regional':
        return '🏭';
      case 'contract':
        return '📝';
      case 'proprietor':
        return '👨‍💼';
      case 'nano':
        return '🔬';
      case 'planning':
        return '📝';
      default:
        return '🍻';
    }
  };

  const formatType = (type) => {
    return type ? type.charAt(0).toUpperCase() + type.slice(1) : 'Unknown';
  };

  const getGoogleMapsUrl = (brewery) => {
    if (brewery.latitude && brewery.longitude) {
      return `https://www.google.com/maps/search/?api=1&query=${brewery.latitude},${brewery.longitude}`;
    } else if (brewery.street && brewery.city && brewery.state) {
      const address = `${brewery.street}, ${brewery.city}, ${brewery.state} ${brewery.postal_code}`;
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    }
    return null;
  };

  const mapsUrl = getGoogleMapsUrl(brewery);

  return (
    <div className="brewery-card">
      <div className="brewery-header">
        <h2>{brewery.name}</h2>
        <span className="brewery-type">
          {getTypeIcon(brewery.brewery_type)} {formatType(brewery.brewery_type)}
        </span>
      </div>
      
      <div className="brewery-location">
        <p>
          <strong>Location:</strong> {brewery.city}, {brewery.state}
          {brewery.postal_code && <span> {brewery.postal_code}</span>}
        </p>
        {brewery.street && <p>{brewery.street}</p>}
      </div>
      
      <div className="brewery-contact">
        {brewery.phone && (
          <p>
            <strong>Phone:</strong> {formatPhone(brewery.phone)}
          </p>
        )}
        {brewery.website_url && (
          <a href={brewery.website_url} target="_blank" rel="noopener noreferrer" className="website-link">
            Visit Website
          </a>
        )}
        {mapsUrl && (
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="maps-link">
            View on Map
          </a>
        )}
      </div>
    </div>
  );
};

// Format phone number to (XXX) XXX-XXXX
const formatPhone = (phone) => {
  if (!phone) return '';
  const cleaned = ('' + phone).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  return phone;
};

export default BreweryCard;