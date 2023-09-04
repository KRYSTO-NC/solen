import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import './assets/styles/index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
// import './assets/styles/bootstrap.custom.css'
import App from './App';
import LoginScreen from './screens/LoginScreen';
import InstallationsScreen from './screens/InstallationsScreen';
import InstallationScreen from './screens/InstallationScreen';


const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<LoginScreen/>}/>
      <Route path="/installations" element={<InstallationsScreen/>}/>
      <Route path="/installation/:id" element={<InstallationScreen/>}/>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <RouterProvider router={routes}/>
  </React.StrictMode>
);

