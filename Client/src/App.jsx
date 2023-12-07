// import logo from './logo.svg';

import { Typography } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import './App.css';

// import EditUser from './components/MUI/EditUser';

import {Toaster} from "react-hot-toast"
import ProtectedRoute from './protectedRoutes';
import Home from './screens/Home';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CLIENT_ID } from './Instance';
// import StoreApp from './components/Store App';

function App() {

  const clientid = CLIENT_ID;

  return(
  <>


   <Routes>
   <Route path="/" element={
    <GoogleOAuthProvider clientId={clientid}>
   <Home />
   </GoogleOAuthProvider> 
   } />
   
 

   <Route element={<ProtectedRoute />}>
   </Route>
   
   </Routes>

   <Toaster
  position="top-center"
  reverseOrder={false}
/>

  </>
  )
}

export default App;
