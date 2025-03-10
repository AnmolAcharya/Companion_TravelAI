export const AI_PROMPT = `
Generate a travel plan for location: {location}, 
for {totalDays} days for {traveler} with a {budget} budget.

Provide a structured JSON output. 
Always follow this exact format:

{
  "Hotels": [
    {
      "Name": "Hotel Name",
      "Address": "Hotel Address",
      "Price": "Price in USD",
      "Image URL": "Image link",
      "Geo Coordinates": "Lat, Long",
      "Rating": "Hotel Rating",
      "Description": "Brief description"
    }
  ],
  "Itinerary": [
    {
      "Place Name": "Location Name",
      "Details": "Brief description",
      "Image URL": "Image link",
      "Geo Coordinates": "Lat, Long",
      "Ticket Pricing": "Entry fee details",
      "Rating": "Location rating",
      "Travel Time": "Time taken"
    }
  ]
}

Ensure all responses are **always formatted exactly as above**. Do NOT return "travelPlan". Do NOT use different keys. The structure must be **identical every time**.
`;


// Older prompt -> Interfered with the firebase/firestore database 
// --------------> some followed correct structure whereas others did not causing lack of display of info (hotels/itineries...) 

// export const AI_PROMPT = `Generate a travel plan for location: {location}, 
// for {totalDays} days for a {traveler} with a {budget} budget. 
// Provide a list of:
//   - Hotels (Name, Address, Price, Image URL, Geo Coordinates, Rating, Description)
//   - Itinerary (Place Name, Details, Image URL, Geo Coordinates, Ticket Pricing, Rating, Travel Time)

// Format everything in JSON format.`;
