import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../service/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import About from "./components/About";
import Hotels from "./components/Hotels";
import Itinerary from "./components/Itinery";

function ViewTrip() {
    const { tripId } = useParams();
    const [trip, setTrip] = useState(null); // Initialized it as null (not an array)

    useEffect(() => {
        const fetchTripData = async () => {
            if (!tripId) {
                console.log("❌ No tripId found! Cannot fetch trip data.");
                return;
            }

            console.log(`📡 Fetching trip data for tripId: ${tripId}`);
            const docRef = doc(db, "AITrips", tripId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                console.log("✅ Successfully fetched tripData:", data);
                setTrip(data); 
            } else {
                console.log("❌ No such document in Firestore");
                toast("No trip found!");
            }
        };

        fetchTripData();
    }, [tripId]);

    if (!trip) {
        return <p>Loading trip details...</p>;
    }

    return (
        <div>
            {/* <h2>Viewing Trip ID: {tripId}</h2> */}

            {/* Destination & Travel Details */}
            <About trip={trip} />

            {/* Hotel Recommendations */}
            <Hotels trip={trip} />

            {/* - Itinerary */}

            <Itinerary trip={trip} />
            {/* - Maps (if needed) */}
            {/* - Footer */}
        </div>
    );
}

export default ViewTrip;


//as the dynamic route syntax did not work out directly in the folder 
// i.e view-trip/ [tripId],
//I created it inside the page directly over here with the trip id number mentioned 
//it is handling and routing as needed for a new id everytime 

