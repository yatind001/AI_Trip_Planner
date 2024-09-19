import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import CreateTrip from './create_trip/index.jsx';
import './index.css';
import Header from './components/ui/custom/Header.jsx';
import { Toaster } from 'sonner';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ViewTrip from './view_trip/[tripId]/index.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/create_trip',
    element: <CreateTrip />,
  },
  {
    path: '/view_trip/:tripId',
    element: <ViewTrip/>,
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
    <Header />
    <Toaster/>
    <RouterProvider router={router} />
    </GoogleOAuthProvider>;
  </StrictMode>,
);
