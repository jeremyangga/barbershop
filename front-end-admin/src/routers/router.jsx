import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Navbar from "../components/Navbar";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Navbar/>,
        children: [
            {
                path: '',
                element: <Home/>
            }
        ]
    }
]);

export default router;