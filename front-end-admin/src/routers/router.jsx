import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Navbar from "../components/Navbar";
import QrScanning from "../pages/Scanner";
import AddBarbershop from "../pages/AddBarbershop";
import LihatAntrian from "../pages/LihatAntrian";

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
            },
            {
                path: 'add-barbershop',
                element: <AddBarbershop/>
            },
            {
                path: 'list-antrian',
                element: <LihatAntrian/>
            }
        ]
    }
]);

export default router;