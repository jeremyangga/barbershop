import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Navbar from "../components/Navbar";
import QrScanning from "../pages/Scanner";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Navbar/>,
        children: [
            {
                path: '',
                element: <Home/>,
            },
            {
                path: 'scan',
                element: <QrScanning/>
            }
        ]
    }
]);

export default router;