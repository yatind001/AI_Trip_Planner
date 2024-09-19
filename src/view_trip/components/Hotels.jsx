import React from 'react';
import { Link } from 'react-router-dom';

function Hotels({ trip }) {
    return (
        <div>
            <h2 className='font-bold text-lg'>Hotel Recommendation</h2>

            <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-7'>
                {trip?.tripData?.hotels?.map((hotel, index) => (
                    <a 
                        key={index} 
                        href={'https://www.google.com/maps/search/?api=1&query=' +hotel?.name+ ", " +hotel?.address || ''}
                        target='_blank' 
                        rel='noopener noreferrer'
                    >
                        <div className='hover:scale-110 transition-all'>
                            <img 
                                src="https://5.imimg.com/data5/SELLER/Default/2023/4/297084137/ZR/MH/GQ/9160165/international-tour-package.jpg" 
                                className='rounded-lg' 
                                alt={hotel?.hotelName || 'Hotel Image'}
                            />

                            <div className='my-3'>
                                <h2 className='font-medium'>{hotel?.name}</h2>
                                <h2 className='text-xs text-gray-500'>📍{hotel?.address}</h2>
                                <h2 className='text-sm'>💰{hotel?.price}</h2>
                                <h2 className='text-sm'>⭐ {hotel?.hotelRating}</h2>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}

export default Hotels;
