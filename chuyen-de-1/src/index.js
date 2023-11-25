import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.scss';
import './index.css';
import App from './App';
import Login from './components/Login';
import CategoryWarehouse from './components/CategoryWarehouse';
import RegisterAccount from './components/RegisterAccount'
import HomeScreen from './components/HomeScreen';
import UpdateWare from './components/UpdateWare';
import Create from './components/Create';
import ListWarehouseUser from './components/ListWarehouseUser';
import ListPostOwner from './components/owner/ListPostOwner';
import AddPost from './components/owner/AddPost';
import UpdatePost from './components/owner/UpdatePost';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "login",
    element: <Login/>,
  },
  {
    path: "CategoryWarehouse",
    element: <CategoryWarehouse/>,
  },
  {
    path: "registeraccount",
    element: <RegisterAccount/>,
  },
  {
    path: "HomeScreen",
    element: <HomeScreen/>,
  },
  {
    path: "UpdateWare",
    element: <UpdateWare/>,
  },
  {
    path: "Create",
    element: <Create/>,
  },
  {
    path: "ListWarehouseUser",
    element: <ListWarehouseUser/>,
  },
  {
    path: "ListPostOwner",
    element: <ListPostOwner/>,
  },
  {
    path: "AddPost",
    element: <AddPost/>,
  },
  {
    path: "UpdatePost",
    element: <UpdatePost/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
reportWebVitals();
