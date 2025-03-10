import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { AI_PROMPT } from "./AIPrompt";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./FirebaseConfig.jsx"; // verifying if the `db` is imported
import { useNavigate } from "react-router-dom";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

// Function to generate a formatted prompt with user input <--> 
export const generatePrompt = (formData) => {
  if (!formData?.destination || !formData?.noOfDays || !formData?.travelWith || !formData?.budget) {
    console.error("Missing required trip information.");
    return null;
  }

  return AI_PROMPT
    .replace("{location}", formData.destination)
    .replace("{totalDays}", formData.noOfDays)
    .replace("{traveler}", formData.travelWith)
    .replace("{budget}", formData.budget);
};

//  Function to send the generated prompt to the AI model
export const getTripPlan = async (formData, navigate) => {
  const finalPrompt = generatePrompt(formData);
  
  if (!finalPrompt) {
    return { error: "Invalid trip details. Please complete all fields." };
  }

  try {
    console.log("🚀 Sending Prompt to AI: ", finalPrompt);

    const chatSession = model.startChat({
      generationConfig,
      history: [{ role: "user", parts: [{ text: finalPrompt }] }],
    });

    const result = await chatSession.sendMessage(finalPrompt);
    const responseText = await result.response.text();

    console.log("🤖 AI Response: ", responseText);

    // Saves the AI-generated trip plan in Firebase
    await SaveAiTrip(formData, responseText, navigate);

    return responseText;
  } catch (error) {
    console.error("❌ Error in AI Model:", error);
    return { error: "Failed to generate trip. Please try again later." };
  }
};

// Function to Save AI-generated Trip to Firebase
const SaveAiTrip = async (formData, TripData, navigate) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.email) {
      console.error("User not logged in.");
      return;
    }

    const docId = Date.now().toString(); // Unique ID for each trip //helps in routing as well

    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user.email,
      id: docId,
      createdAt: new Date(),
    });

    console.log("Trip saved to Firestore:", docId);
    navigate(`/view-trip/${docId}`)   //connects out create trips navigation to AI.jsx and lead to dynamic routing 

      } catch (error) {
    console.error("❌ Error saving trip:", error);
  }
};

//////////////////////////////Alternative approach try out : ..................... without react router 

    // // navigate('/view-trip/' +docId) react hooks can only be used inside react functional components 
    // console.log("✅ Trip saved to Firestore:", docId);

    // const tripUrl = `${window.location.origin}/view-trip/${docId}`;
    // console.log("🌍 Opening new tab:", tripUrl);

    // // ✅ Open in new tab with security headers
    // const newTab = window.open(tripUrl, "_blank", "noopener,noreferrer");

    // // 🔹 If pop-up is blocked, alert the user
    // if (!newTab || newTab.closed || typeof newTab.closed === "undefined") {
    //   alert("Pop-up blocked! Please allow pop-ups for this site.");
    // }
    
//   } catch (error) {
//     console.error("❌ Error saving trip:", error);
//   }
// };


/////////////////////////firebase contents  '
//Feb 15 - going further on view-trip display + till now showing up in firebase and in console the ai gemini api keys 
// //feb14 commit - start of creating the trip details page>> 
// the main web ai part of the project to display the ai generated trips, and itineries for user !

// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { AI_PROMPT } from "./AIPrompt"; // ✅ Fixed import path
// import { doc, setDoc } from "firebase/firestore";

// const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
// const genAI = new GoogleGenerativeAI(apiKey);

// const [loading,setLoading]=useState(false);

// const model = genAI.getGenerativeModel({
//   model: "gemini-1.5-flash",
// });

// const generationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 40,
//   maxOutputTokens: 8192,
//   responseMimeType: "application/json",
// };

// // 🔹 Function to generate a formatted prompt with user input
// export const generatePrompt = (formData) => {
//   if (!formData?.destination || !formData?.noOfDays || !formData?.travelWith || !formData?.budget) {
//     console.error("Missing required trip information.");
//     setLoading(true);
//     return null;
//   }

//   return AI_PROMPT
//     .replace("{location}", formData.destination)
//     .replace("{totalDays}", formData.noOfDays)
//     .replace("{traveler}", formData.travelWith)
//     .replace("{budget}", formData.budget);

//     // setLoading(false);
//     // SaveAiTrip(result?.response?.text())
// };

// // 🔹 Function to send the generated prompt to the AI model
// export const getTripPlan = async (formData) => {
//   const finalPrompt = generatePrompt(formData);
  
//   if (!finalPrompt) {
//     return { error: "Invalid trip details. Please complete all fields." };
//   }

//   try {
//     console.log("🚀 Sending Prompt to AI: ", finalPrompt); // ✅ Log Prompt for Debugging
    
//     const chatSession = model.startChat({
//       generationConfig,
//       history: [{ role: "user", parts: [{ text: finalPrompt }] }],
//     });

//     const result = await chatSession.sendMessage(finalPrompt);
//     const responseText = await result.response.text();

//     console.log("🤖 AI Response: ", responseText); // ✅ Log AI Response
//     return responseText;
//   } catch (error) {
//     console.error("❌ Error in AI Model:", error);
//     return { error: "Failed to generate trip. Please try again later." };
//   }
// };
//////////////////////////////////////////////////////////////////////////////