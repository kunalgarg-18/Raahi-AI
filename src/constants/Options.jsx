export const SelectTravellersList = [
  {
    id: 1,
    title: 'Just Me',
    desc: 'A sole traveller in exploration',
    icon: '🚶🏽',
    people: '1'
  },
  {
    id: 2,
    title: 'A Couple',
    desc: 'Two travellers in tandem',
    icon: '🍻',
    people: '2'
  },
  {
    id: 3,
    title: 'Family',
    desc: 'A fun loving adventurous group',
    icon: '🏡',
    people: '3-5'
  },
  {
    id: 4,
    title: 'Friends',
    desc: 'A bunch of thrill-seekers',
    icon: '⛺',
    people: '5-10'
  }
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: 'Cheap',
    desc: 'Stay conscious of costs',
    icon: '💵'
  },
  {
    id: 2,
    title: 'Moderate',
    desc: 'Keep cost on the average side',
    icon: '💸'
  },
  {
    id: 3,
    title: 'Luxury',
    desc: "Don't worry about cost",
    icon: '💰'
  }
];

// 🔥 Strong, strict prompt (THIS fixes your empty data issue)
export const AI_PROMPT = `
Generate a travel plan.

Location: {location}
Days: {totalDays}
People: {people}
Budget: {budget}

STRICT RULES:
- Return ONLY valid JSON
- No markdown, no explanation
- Do NOT return empty arrays
- hotelOptions must contain at least 2 hotels
- itinerary must contain exactly {totalDays} days
- each day must contain at least 2 places

FORMAT:
{
  "hotelOptions": [
    {
      "hotelName": "",
      "hotelAddress": "",
      "price": "",
      "rating": "",
      "description": ""
    }
  ],
  "itinerary": [
    {
      "day": 1,
      "plan": [
        {
          "placeName": "",
          "placeDetails": "",
          "timeToTravel": "",
          "ticketPricing": ""
        }
      ]
    }
  ]
}
`;