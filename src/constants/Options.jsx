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
        people: '2 People'
    },
    {
        id: 3,
        title: 'Family',
        desc: 'A fun loving adventurous group',
        icon: '🏡',
        people: '3 to 5 People'
    },
    {
        id: 4,
        title: 'Friends',
        desc: 'A bunch of thrill-seekers',
        icon: '⛺',
        people: '5 to 10 People'
    }
]
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
]

export const AI_PROMPT = 'Generate Travel Plan for Location : {location} for {totalDays} Days for {people} with a {budget} budget, give me hotels options list with hotel name, hotel address, price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with place name, place details, place image url, geo coordinates, ticket pricing, time to travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format.' 