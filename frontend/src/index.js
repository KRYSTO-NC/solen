import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import './assets/styles/index.css'
// import "bootstrap/dist/css/bootstrap.min.css";
import './assets/styles/bootstrap.custom.css'
import App from './App'
import PrivateRoute from './components/PrivateRoute'
import LoginScreen from './screens/LoginScreen'

import UserListScreen from './screens/admin/UserListScreen'
import AdminRoute from './components/AdminRoute'
import EditUserScreen from './screens/admin/EditUserScreen'
import ProfileScreen from './screens/ProfileScreen'
import InstallationListScreen from './screens/InstallationListScreen'
import InstallationEditScreen from './screens/InstallationEditScreen'
import InstallationDetailsScreen from './screens/InstallationDetailsScreen'

import ContactsScreen from './screens/ContactsScreen'
import ContactDetailsScreen from './screens/ContactDetailsScreen'
import InterventionsScreen from './screens/InterventionsScreen'
import SolenProductScreen from './screens/SolenProductScreen'
import SolenServicesScreen from './screens/SolenServicesScreen'
import SimulationGuide from './screens/admin/SimulationGuide/SimulationGuide'
import SimulationsListScreen from './screens/SimulationsListScreen'
import MaintenanceSimulation from './screens/MaintenanceSimulations.jsx'
import InterventionDetails from './screens/InterventionDetails'
import InstallationDetailsEEC from './screens/InstallationDetailsEEC'
import InstallationDetailsDimenc from './screens/InstallationDetailsDimenc'
import InstallationDetailsConformite from './screens/InstallationDetailsConformite'
import InstallationDetailsEnercal from './screens/InstallationDetailsEnercal'
import Dashboard from './screens/Dashboard'


const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<LoginScreen />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/contacts" element={<ContactsScreen />} />
        <Route path="/contact/:id" element={<ContactDetailsScreen />}></Route>
        <Route path="/installations" element={<InstallationListScreen />} />
        <Route path="/interventions" element={<InterventionsScreen />} />
        <Route path="/produits-solen" element={<SolenProductScreen />} />
        <Route path="/services-solen" element={<SolenServicesScreen />} />
        <Route path="/simulations-maintenances" element={<MaintenanceSimulation/>} />
        <Route path="/intervention/:id" element={<InterventionDetails/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
       
        
        <Route
          path="/simulations-installations"
          element={<SimulationGuide />}
        />
        <Route
          path="/simulations-interventions"
          element={<SimulationGuide />}
        />
        <Route path="/simulations-liste" element={<SimulationsListScreen />} />

        <Route
          path="/installations/:pageNumber"
          element={<InstallationListScreen />}
        ></Route>
        <Route
          path="/installation/:id"
          element={<InstallationDetailsScreen />}
        ></Route>
        <Route
          path="/details/:id/EEC"
          element={<InstallationDetailsEEC />}
        ></Route>
        <Route
          path="/details/:id/Dimenc"
          element={<InstallationDetailsDimenc />}
        ></Route>
        <Route
          path="/details/:id/Conformite"
          element={<InstallationDetailsConformite />}
        ></Route>
        <Route
          path="/details/:id/Enercal"
          element={<InstallationDetailsEnercal />}
        ></Route>
        <Route
          path="/installation/:id/edit"
          element={<InstallationEditScreen />}
        ></Route>
        <Route path="/profile" element={<ProfileScreen />}></Route>
      </Route>

      <Route path="" element={<AdminRoute />}>
        {/* <Route path="/admin/user/:id/edit" element={<EditUserScreen />}></Route> */}

        <Route path="/admin/userlist" element={<UserListScreen />}></Route>
        <Route path="/admin/user/:id/edit" element={<EditUserScreen />}></Route>
      </Route>
    </Route>,
  ),
)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  </React.StrictMode>,
)
