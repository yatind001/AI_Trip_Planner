import React from 'react';
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({ trip }) {
  // Check if tripData and itinerary exist
  if (!trip?.tripData?.itinerary) {
    return <div>No itinerary available</div>;
  }

  return (
    <div>
      <h2 className='font-bold text-lg'>Places to Visit</h2>
      <div>
        {Object.keys(trip.tripData.itinerary).map((dayKey, index) => (
          <div className='mt-5' key={index}>
            <h2 className='font-medium text-md'>Day {index + 1}</h2>
            <div className='grid md:grid-cols-2 p-3 gap-5'>
              {trip.tripData.itinerary[dayKey]?.activities?.map((place, index) => (
                <div key={index}>
                  <h2 className='font-medium text-sm text-orange-600'>{place.time}</h2>
                  <PlaceCardItem place={place} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;
