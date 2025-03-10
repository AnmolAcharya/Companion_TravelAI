import React from 'react'
// import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import CreateTrip from './create-trip/index.jsx'
import Navbar from './components/Navbar.jsx'

import { GoogleOAuthProvider } from '@react-oauth/google';
import ViewTrip from './view-trip/display.jsx'


const router=createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },
  {
    path:'/create-trip',
    element:( 
      <>
        <Navbar/>
        <CreateTrip/>
      </>
  )
  },

  {
    path: '/view-trip/:tripId', //placing the route
    element: (
      <>
    <Navbar/>
    <ViewTrip/>
    </>

    )
  }

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
    <RouterProvider router={router}/>
    </GoogleOAuthProvider>
  </StrictMode>,
)
