import { Button } from '@/components/ui/button';
import React from 'react';
import { MdMyLocation } from "react-icons/md";
import { Link } from 'react-router-dom';

function PlaceCardItem({ place }) {
    return (
        <Link to={'https://www.google.com/maps/search/?api=1&query=' + place?.name} target='_blank'>
            <div className='border rounded-xl p-3 mt-2 shadow-md flex gap-5 hover:scale-105 transition-all'>
                <img 
                    src="https://5.imimg.com/data5/SELLER/Default/2023/4/297084137/ZR/MH/GQ/9160165/international-tour-package.jpg"
                    className='w-[130px] h-[130px] rounded-xl' 
                    alt='Place Image'
                />

                <div>
                    <h2 className='font-bold text-lg'>
                        {place?.name || 'Unknown Place'} {/* Place name */}
                    </h2>
                    <p className='text-sm text-gray-400'>{place?.name || 'Unknown Location'}</p> {/* Location */}
                    <p className='text-sm'>{place?.description}</p> {/* Activity details */}
                    
                    <Button size="small"><MdMyLocation /></Button>
                </div>
            </div>
        </Link>
    );
}

export default PlaceCardItem;
