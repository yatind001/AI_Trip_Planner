import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import InfoSection from '../components/infoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';

function ViewTrip() {

    const { tripId } = useParams();
    const [trip, setTrip] = useState([]);


    useEffect(() => {
        tripId && GetTripData();
    }, [tripId])


    //Use to get trip adata from Firebase
    const GetTripData = async () => {
        const docRef = doc(db, 'AITrips', tripId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document", docSnap.data());
            setTrip(docSnap.data());
        }
        else {
            console.log("No such Document!!");
            toast('No trip Found')
        }

    }



    return (
        <div>
            {/* Information Section */}
            <div className=' md:px-2 lg:px-2'>
                <InfoSection trip={trip}></InfoSection>
            </div>
            {/* Recommended Hotels */}
            <div>
                <Hotels trip={trip}></Hotels>
            </div>

            {/* Daily Plan */}
            <PlacesToVisit trip={trip}></PlacesToVisit>

            {/* Footer */}
            <Footer trip={trip}></Footer>
        </div>
    )
}

export default ViewTrip
