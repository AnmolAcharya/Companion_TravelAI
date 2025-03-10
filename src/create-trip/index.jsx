import { useEffect, useState } from "react";
import "./create-trip.css";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google"; //Google Auth 
import { jwtDecode } from "jwt-decode"; // decode the Google token

import { getTripPlan } from "../service/AI";
import { AI_PROMPT } from "../service/AIPrompt";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const navigate = useNavigate(); //initialized navigate inside the components
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("");
  const [budget, setBudget] = useState("");
  const [travelWith, setTravelWith] = useState("");
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [user, setUser] = useState(null); //Stores the logged-in user data


  // const router=useNavigate(); // for the dynamic view trip

  // Check if user is already logged in (From Local Storage)
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Google One-Tap Login (Auto-Login) -> Google authentication 2/12/25
  useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => {
      const decodedUser = jwtDecode(credentialResponse.credential);
      setUser(decodedUser);
      localStorage.setItem("user", JSON.stringify(decodedUser)); // Saved the user
      toast.success(`Welcome, Click, Generate Trip to get started Now! 🎉 ${decodedUser.name}!`);
    },
    onError: () => {
      toast.error("Google Login Failed! ❌");
    },
  });

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log("📝 Form Data Updated:", formData);
  }, [formData]);

  // Function to validate & generate the trip
  const onGenerateTrip = async () => {
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (!formData?.destination) {
      toast.error("Please select a destination! 📍");
      return;
    }
    if (!formData?.noOfDays || formData?.noOfDays <= 0) {
      toast.error("Please enter valid trip days! 📆");
      return;
    }
    if (formData?.noOfDays > 90) {
      toast.warning("Trip days should be less than 90! ⏳");
      return;
    }
    if (!formData?.budget) {
      toast.error("Please select a budget! 💰");
      return;
    }
    if (!formData?.travelWith) {
      toast.error("Please select who you are traveling with! 🧳");
      return;
    }

    toast.success(" (LOADING!) Your Trip is generated successfully! 🎉");
    console.log("🚀 Sending Data to AI Model:", formData);

    await getTripPlan(formData, navigate);
  };

  return (
    <div className="create-trip-container">
      <div className="trip-form-content">
        <h1 className="trip-title">Tell us your travel preferences 🏖️ 🌴</h1>
        <p className="trip-subtitle">
          Just provide some basic information, and our trip planner will
          generate a customized itinerary based on your preferences.
        </p>

        <div className="form-group">
          <h2>What is your destination of choice?</h2>
          <div className="destination-input-wrapper">
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
              selectProps={{
                value: selectedPlace,
                onChange: (place) => {
                  setSelectedPlace(place);
                  handleInputChange("destination", place.label);
                },
                placeholder: "Enter a destination...",
                className: "destination-autocomplete",
              }}
            />
            {selectedPlace && (
              <button onClick={() => setSelectedPlace(null)} className="clear-btn">
                ✖
              </button>
            )}
          </div>
        </div>

        <div className="form-group">
          <h2>How many days are you planning your trip?</h2>
          <input
            type="number"
            placeholder="Ex: 3"
            value={days}
            onChange={(e) => {
              setDays(e.target.value);
              handleInputChange("noOfDays", e.target.value);
            }}
            className="days-input"
          />
        </div>

        <div className="form-group">
          <h2>What is Your Budget?</h2>
          <div className="budget-options">
            {["cheap", "moderate", "luxury"].map((option) => (
              <div
                key={option}
                className={`budget-card ${budget === option ? "selected" : ""}`}
                onClick={() => {
                  setBudget(option);
                  handleInputChange("budget", option);
                }}
              >
                <span className="budget-icon">
                  {option === "cheap" ? "💵" : option === "moderate" ? "💰" : "💳"}
                </span>
                <h3>{option.charAt(0).toUpperCase() + option.slice(1)}</h3>
              </div>
            ))}
          </div>
        </div>

        <div className="form-group">
          <h2>Who do you plan on traveling with?</h2>
          <div className="travel-with-options">
            {["solo", "couple", "family", "friends"].map((option) => (
              <div
                key={option}
                className={`travel-card ${travelWith === option ? "selected" : ""}`}
                onClick={() => {
                  setTravelWith(option);
                  handleInputChange("travelWith", option);
                }}
              >
                <span className="travel-icon">
                  {option === "solo"
                    ? "✈️"
                    : option === "couple"
                    ? "🥂"
                    : option === "family"
                    ? "🏠"
                    : "⛵"}
                </span>
                <h3>{option.charAt(0).toUpperCase() + option.slice(1)}</h3>
              </div>
            ))}
          </div>
        </div>

        <button className="generate-trip-btn" onClick={onGenerateTrip}>
          Generate Trip
        </button>

        {/* Google Login Dialog */}
        {openDialog && (
          <div className="google-login-popup">
            <h3>Sign in to generate your trip</h3>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                const decodedUser = jwtDecode(credentialResponse.credential);
                setUser(decodedUser);
                localStorage.setItem("user", JSON.stringify(decodedUser));
                toast.success(`Welcome, ${decodedUser.name}! 🎉`);
                setOpenDialog(false);
              }}
              onError={() => {
                toast.error("Google Login Failed! ❌");
              }}
            />
          </div>
        )}

        <ToastContainer />
      </div>
    </div>
  );
}

export default CreateTrip;


