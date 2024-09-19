export const SelectTravelesList=[
    {
        id:1,
        title:"Just Me",
        desc:'A sole travels in exploration',
        icon: '🛫',
        people:'For 1',

    },
    {
        id:2,
        title:"Couple",
        desc:'A sole travels in exploration',
        icon: '🛫',
        people:'2 people',

    },
    {
        id:3,
        title:"Family",
        desc:'mze kro',
        icon: '🛫',
        people:'3-5 people',

    },
    {
        id:4,
        title:"Friends",
        desc:'Bangkok jao',
        icon: '🛫',
        people:'5-10 people',

    },

]


export const SelectBudgetOptions=[
    {
        id:1,
        title:'Cheap',
        desc:'Kanjoos',
        icon: '💸',

    },
    {
        id:2,
        title:'Moderate',
        desc:'Thoda kam Kanjoos',
        icon: '💸',

    },
    {
        id:3,
        title:'Luxury',
        desc:'Baap ka pesa ',
        icon: '💸',

    },

]

export const AI_PROMPT = `
Generate a Travel Plan for Location: {location}, for {totalDays} Days for {people} with a {budget}. 

1. Provide a list of Hotels with the following details:
   - Hotel Name
   - Hotel Address
   - Price
   - Hotel Image URL
   - Geo Coordinates (latitude and longitude)
   - Ticket Pricing
   - Hotel Rating

2. Provide a daily itinerary for {totalDays} days with each day's plan in JSON format.
   - Include activities for each day with:
     - Time
     - Activity Name
     - Description

Return the result in the following JSON format:

{
  "hotels": [
    {
      "name": "Hotel Name",
      "address": "Hotel Address",
      "price": "Hotel Price",
      "imageUrl": "Hotel Image URL",
      "geoCoordinates": {
        "latitude": "Latitude",
        "longitude": "Longitude"
      },
      "ticketPricing": "Ticket Pricing",
      "hotelRating": "Hotel Rating"
    }
  ],
  "itinerary": {
    "day1": {
      "activities": [
        {
          "time": "Activity Time",
          "name": "Activity Name",
          "description": "Activity Description"
        }
      ]
    },
    "day2": {
      "activities": [
        {
          "time": "Activity Time",
          "name": "Activity Name",
          "description": "Activity Description"
        }
      ]
    }
    // Continue for all days
  }
}
`;


// export const AI_PROMPT='Generate Travel Plan for Location : {location}, for {totalDays} Days for {people} with a {budget},firstly give me Hotels options list with Hotel Name, Hotel address, Price, hotel image url, geo coordinates, ticket pricing,hotel rating, Time Travel the location for {totalDays} days with each day plan  in JSON format.' 