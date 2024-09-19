import { Button } from '@/components/ui/button';
import { GetPlaceDetails } from '@/service/GlobalAPI';
import React, { useEffect } from 'react';
import { FiSend } from 'react-icons/fi';

function InfoSection({ trip }) {

    useEffect(() => {
        if (trip) GetPlacePhoto();
    }, [trip]);

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: trip?.userSelection?.location?.label
        };

        const result = await GetPlaceDetails(data).then(resp => {
            console.log(resp.data);
        }).catch(error => {
            console.error("Error fetching place details:", error);
        });
    };

    return (
        <div className='p-4'>
            <img 
                src='https://5.imimg.com/data5/SELLER/Default/2023/4/297084137/ZR/MH/GQ/9160165/international-tour-package.jpg' 
                alt='Tour Package' 
                className='h-[340px] w-full object-cover rounded-xl'
            />

            <div className='mt-4 flex flex-col gap-2'>
                <h2 className='text-2xl font-bold'>
                    {trip?.userSelection?.location?.label || 'Location not available'}
                </h2>
                <div className='flex gap-5'>
                    <h2 className='p-1 px-2 bg-gray-300 rounded-full text-gray-500 '>
                        {trip?.userSelection?.noOfDays || 'N/A'} Day 📆
                    </h2>
                    <h2 className='p-1 px-2 bg-gray-300 rounded-full text-gray-500'>
                        {trip?.userSelection?.budget || 'N/A'} Budget 💰
                    </h2>
                    <h2 className='p-1 px-2 bg-gray-300 rounded-full text-gray-500'>
                        No of Traveller: {trip?.userSelection?.people || 'N/A'} 🧑‍🤝‍🧑
                    </h2>
                </div>
            </div>
            <Button 
                className='mt-4'
                aria-label='Send trip details'
            >
                <FiSend className='h-6 w-6' />
            </Button>
        </div>
    );
}

export default InfoSection;
