// import Dashboard from 'views/Dashboard/Dashboard.jsx';
// import Buttons from 'views/Components/Buttons.jsx';
// import GridSystem from 'views/Components/GridSystem.jsx';
// import Panels from 'views/Components/Panels.jsx';
// import SweetAlert from 'views/Components/SweetAlertPage.jsx';
// import Notifications from 'views/Components/Notifications.jsx';
// import Icons from 'views/Components/Icons.jsx';
// import Typography from 'views/Components/Typography.jsx';
// import RegularForms from 'views/Forms/RegularForms.jsx';
import ExtendedForms from '../views/Forms/ExtendedForms.jsx';
// import ValidationForms from 'views/Forms/ValidationForms.jsx';
// import Wizard from 'views/Forms/Wizard/Wizard.jsx';
// import RegularTables from 'views/Tables/RegularTables.jsx';
// import ExtendedTables from 'views/Tables/ExtendedTables.jsx';
// import DataTables from 'views/Tables/DataTables.jsx';
// import GoogleMaps from 'views/Maps/GoogleMaps.jsx';
// import FullScreenMap from 'views/Maps/FullScreenMap.jsx';
// import VectorMap from 'views/Maps/VectorMap.jsx';
// import Charts from 'views/Charts/Charts.jsx';
import Calendar from '../views/Calendar/Calendar.js';
// import UserPage from 'views/Pages/UserPage.jsx';

import EditProfile from '../components/User/edit-profile.js';
import MySchedule from '../components/Schedule/my-schedule.js';
// import BookingRequests from '../components/Booking/booking.js';

import RequestBooking from '../components/Booking/request-booking.js';

import BookingDetail from '../components/Booking/booking-detail.js';
import ProjectInfo from '../components/Project/project-info.js';
import ProjectContacts from '../components/Project/project-contacts.js';
import ProjectContactsAdd from '../components/Project/project-contacts-add.js';
import ProjectResources from '../components/Project/Resources/project-resources.js';
import ProjectResourcesAdd from '../components/Project/Resources/project-resources-add.js';
import Users from '../components/User/users.js';
import Settings from '../components/Settings/Settings.js';

// import pagesRoutes from './pages.jsx';

// var pages = [{ path: "/pages/user-page", name: "User Page", mini: "UP", component: UserPage }].concat(pagesRoutes);

var dashRoutes = [
    { path: "/profile", id: 'profile', name: "Edit Profile", icon: "pe-7s-date", component: EditProfile },
    { path: "/my-schedule", id: 'my-schedule', name: "My Schedule", icon: "pe-7s-date", component: MySchedule },

    { path: "/booking/detail", id: 'booking', name: "Booking Requests", icon: "pe-7s-date", component: BookingDetail },
    { path: "/booking/request", id: 'booking', name: "Booking Requests", icon: "pe-7s-date", component: RequestBooking },
    { path: "/booking", id: 'booking', name: "Booking Requests", icon: "pe-7s-date", component: MySchedule },

    { path: "/project/info", id: 'info', name: "Project Info", icon: "pe-7s-date", component: ProjectInfo },
		{ path: "/project/add", id: 'info', name: "Project Info", icon: "pe-7s-date", component: ProjectInfo },
    { path: "/project/contacts", id: 'contacts', name: "Contacts", icon: "pe-7s-date", component: ProjectContacts },
    { path: "/project/contacts/add", id: 'contacts', name: "Contacts", icon: "pe-7s-date", component: ProjectContactsAdd },
    { path: "/project/resources", id: 'resources', name: "Resources", icon: "pe-7s-date", component: ProjectResources },
		{ path: "/project/resources/add", id: 'resources', name: "Resources", icon: "pe-7s-date", component: ProjectResourcesAdd },
    { path: "/users", id: 'users', name: "Users", icon: "pe-7s-date", component: Users },
    { path: "/calendar", id: 'calendar', name: "Calendar", icon: "pe-7s-date", component: Calendar },
    { path: "/settings", id: 'settings', name: "Settings", icon: "pe-7s-date", component: Settings },

    { redirect: true, path: "/", pathTo: "/my-schedule", name: "My Schedule" }
    // { redirect: true, path: "/", pathTo: "/dashboard", name: "Dashboard" }
];
export default dashRoutes;




// import Dashboard from 'views/Dashboard/Dashboard.jsx';
// import Buttons from 'views/Components/Buttons.jsx';
// import GridSystem from 'views/Components/GridSystem.jsx';
// import Panels from 'views/Components/Panels.jsx';
// import SweetAlert from 'views/Components/SweetAlertPage.jsx';
// import Notifications from 'views/Components/Notifications.jsx';
// import Icons from 'views/Components/Icons.jsx';
// import Typography from 'views/Components/Typography.jsx';
// import RegularForms from 'views/Forms/RegularForms.jsx';
// import ExtendedForms from 'views/Forms/ExtendedForms.jsx';
// import ValidationForms from 'views/Forms/ValidationForms.jsx';
// import Wizard from 'views/Forms/Wizard/Wizard.jsx';
// import RegularTables from 'views/Tables/RegularTables.jsx';
// import ExtendedTables from 'views/Tables/ExtendedTables.jsx';
// import DataTables from 'views/Tables/DataTables.jsx';
// import GoogleMaps from 'views/Maps/GoogleMaps.jsx';
// import FullScreenMap from 'views/Maps/FullScreenMap.jsx';
// import VectorMap from 'views/Maps/VectorMap.jsx';
// import Charts from 'views/Charts/Charts.jsx';
// import Calendar from 'views/Calendar/Calendar.jsx';
// import UserPage from 'views/Pages/UserPage.jsx';
//
// import pagesRoutes from './pages.jsx';
//
// var pages = [{ path: "/pages/user-page", name: "User Page", mini: "UP", component: UserPage }].concat(pagesRoutes);
//
// var dashRoutes = [
//     { path: "/dashboard", name: "Dashboard", icon: "pe-7s-graph", component: Dashboard },
//     { collapse: true, path: "/components", name: "Components", state: "openComponents", icon: "pe-7s-plugin", views:[
//         { path: "/components/buttons", name: "Buttons", mini: "B", component: Buttons },
//         { path: "/components/grid-system", name: "Grid System", mini: "GS", component: GridSystem },
//         { path: "/components/panels", name: "Panels", mini: "P", component: Panels },
//         { path: "/components/sweet-alert", name: "Sweet Alert", mini: "SA", component: SweetAlert },
//         { path: "/components/notifications", name: "Notifications", mini: "N", component: Notifications },
//         { path: "/components/icons", name: "Icons", mini: "I", component: Icons },
//         { path: "/components/typography", name: "Typography", mini: "T", component: Typography }]
//     },
//     { collapse: true, path: "/forms", name: "Forms", state: "openForms", icon: "pe-7s-note2", views:
//         [{ path: "/forms/regular-forms", name: "Regular Forms", mini: "RF", component: RegularForms },
//         { path: "/forms/extended-forms", name: "Extended Forms", mini: "EF", component: ExtendedForms },
//         { path: "/forms/validation-forms", name: "Validation Forms", mini: "VF", component: ValidationForms },
//         { path: "/forms/wizard", name: "Wizard", mini: "W", component: Wizard }]
//     },
//     { collapse: true, path: "/tables", name: "Tables", state: "openTables", icon: "pe-7s-news-paper", views:
//         [{ path: "/tables/regular-tables", name: "Regular Tables", mini: "RT", component: RegularTables },
//         { path: "/tables/extended-tables", name: "Extended Tables", mini: "ET", component: ExtendedTables },
//         { path: "/tables/data-tables", name: "Data Tables", mini: "DT", component: DataTables }]
//     },
//     { collapse: true, path: "/maps", name: "Maps", state: "openMaps", icon: "pe-7s-map-marker", views:
//         [{ path: "/maps/google-maps", name: "Google Maps", mini: "GM", component: GoogleMaps },
//         { path: "/maps/full-screen-maps", name: "Full Screen Map", mini: "FSM", component: FullScreenMap },
//         { path: "/maps/vector-maps", name: "Vector Map", mini: "VM", component: VectorMap }]
//     },
//     { path: "/charts", name: "Charts", icon: "pe-7s-graph1", component: Charts },
//     { path: "/calendar", name: "Calendar", icon: "pe-7s-date", component: Calendar },
//     { collapse: true, path: "/pages", name: "Pages", state: "openPages", icon:"pe-7s-gift", views:
//         pages
//     },
//     // { redirect: true, path: "/", pathTo: "/dashboard", name: "Dashboard" }
// ];
// export default dashRoutes;
//
