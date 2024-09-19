import { AI_PROMPT, SelectBudgetOptions } from '@/constants/options';
import React, { useState, useEffect } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { SelectTravelesList } from '@/constants/options';
import { toast } from 'sonner';
import { chatSession } from '@/service/AIModel';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

function CreateTrip() {
  const [place, setPlace] = useState(); // State for storing place selection
  const [formData, setFormData] = useState({}); // State for storing form data
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false); // Ensure loading is defined
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Effect hook that runs whenever formData changes
  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: async (codeResp) => {
      console.log(codeResp);
      if (codeResp?.access_token) {
        await GetUserProfile(codeResp);
      }
    },
    onError: (error) => console.log("Login Error:", error),
  });

  const onGenerateTrip = async () => {
    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (formData?.noOfDays > 5) {
      toast("Itinerary available for only max 5 days!");
      return;
    }
    if (!formData?.people || !formData?.noOfDays || !formData?.location || !formData?.budget) {
      toast("Please fill all details!");
      return;
    }

    const SaveAiTrip = async (TripData) => {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem('user'));
      const docId = Date.now().toString();

      try {
        console.log('Raw TripData:', TripData); // Log raw TripData for debugging
        
        // Validate and parse TripData safely
        let parsedTripData;
        try {
          parsedTripData = JSON.parse(TripData); // Attempt to parse the JSON
        } catch (jsonError) {
          console.error("Error parsing TripData JSON:", jsonError);
          toast("Failed to parse the generated trip. Please try again.");
          return; // Exit the function if JSON parsing fails
        }

        // Save the parsed data if JSON is valid
        await setDoc(doc(db, "AITrips", docId), {
          userSelection: formData,
          tripData: parsedTripData,
          userEmail: user?.email,
          id: docId,
        });
      } catch (error) {
        console.error("Error saving AI trip:", error);
        toast("An error occurred while saving the trip.");
      } finally {
        setLoading(false);
        navigate('/view_trip/' + docId);
      }
    };

    const finalPrompt = AI_PROMPT
      .replace('{location}', formData?.location?.label || '')
      .replace('{totalDays}', formData?.noOfDays || '')
      .replace('{people}', formData?.people || '')
      .replace('{budget}', formData?.budget || '');

    try {
      const result = await chatSession.sendMessage(finalPrompt);
      console.log(result?.response?.text());
      await SaveAiTrip(result?.response?.text()); // Save the trip data
    } catch (error) {
      console.error("Error generating trip:", error);
      toast("An error occurred while generating the trip.");
    } finally {
      setLoading(false);
    }
  };

  const GetUserProfile = async (tokenInfo) => {
    const accessToken = tokenInfo?.access_token;

    try {
      const response = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
        },
      });

      const userInfo = response.data;
      console.log({
        email: userInfo.email,
        family_name: userInfo.family_name,
        given_name: userInfo.given_name,
        id: userInfo.id,
        name: userInfo.name,
        picture: userInfo.picture,
        verified_email: userInfo.verified_email,
      });
      localStorage.setItem('user', JSON.stringify(userInfo));
      setOpenDialog(false);
      await onGenerateTrip();
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
      <div>
        <h2 className='font-bold text-3xl'>Tell us your travel preferences🏕️🌲</h2>
        <p className='mt-3 text-gray-500 text-xl'>Just provide some basic info!</p>
      </div>

      <div className='mt-10 flex flex-col gap-10'>
        <div>
          <h2 className='text-xl my-3 font-medium'>Destination</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange('location', v);
              },
            }}
          />
        </div>
      </div>

      <div>
        <h2 className='text-xl my-3 font-medium'>How many days?</h2>
        <input
          placeholder='Ex.3'
          type="number"
          onChange={(e) => handleInputChange('noOfDays', e.target.value)}
          style={{ backgroundColor: 'white', borderColor: 'black', borderWidth: '1px' }}
        />
      </div>

      <div>
        <h2 className='text-xl my-3 font-medium'>What is your Budget?</h2>
        <div className='grid grid-cols-3 gap-5 mt:5'>
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange('budget', item.title)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                ${formData?.budget === item.title ? 'border-spacing-10 border-black shadow-lg' : ''}
              `}
            >
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className='text-xl my-3 font-medium'>Who do you plan to travel with on your trip?</h2>
        <div className='grid grid-cols-4 gap-5 mt:5'>
          {SelectTravelesList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange('people', item.people)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                ${formData?.people === item.people ? 'border-spacing-10 border-black shadow-lg' : ''}
              `}
            >
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              <h2 className='text-sm font-bold text-gray-500'>{item.people}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className='my-20 justify-end flex'>
        <button
          disabled={loading}
          onClick={onGenerateTrip}
          style={{ color: 'white' }}
          className="bg-blue-500 hover:bg-blue-600 font-bold py-2 px-4 rounded"
        >
          {loading ? (
            <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' />
          ) : 'Generate Trip'}
        </button>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign In With Google</DialogTitle>
            <DialogDescription>
              <img src="/logo.svg" height={30} width={30} alt="Logo" />
              <h2 className='font-bold text-lg flex mt-7'>Sign In With Google</h2>
              <p>Sign in to the app with Google authentication securely</p>
            </DialogDescription>
            <button className="w-full mt-7 flex gap-4 items-center" onClick={login}>
              <div style={{ color: 'white' }}>
                <FcGoogle className='h-7 w-7' /> Sign In With Google
              </div>
            </button>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
