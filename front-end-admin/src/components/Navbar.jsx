import { Outlet, Link } from "react-router-dom";
import logo from '../assets/react.svg';
export default function Navbar(){
    function handleLogout(e){
        e.preventHandler();
    }
    return <>
         <nav className='navbar navbar-expand-lg navbar-dark bg-dark fixed-top' style={{paddingRight:'50px', paddingLeft: '50px'}}>
            <img src={logo} className='navbar-logo' style={{width: '75px', height: '75px'}}></img>
            <Link className="navbar-brand" to="/" style={{paddingLeft: '10px'}}>Admin Control</Link>
            <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                <div className="navbar-nav me-auto mb-2 mb-lg-0">
                        <Link to='/'  className='btn btn-outline-primary' type='button' style={{marginRight:'10px', color:"white"}}>Lihat Barbershop</Link> 
                        <Link to='/add-barbershop' className='btn btn-outline-info' type='button' style={{marginRight:'10px'}}>Tambah Barbershop</Link>
                        <Link to='/scan' className='btn btn-outline-danger' type='button' style={{marginRight:'10px'}}>Scan</Link>
                        <Link to='/list-antrian' className='btn btn-outline-warning' type='button' style={{marginRight:'10px'}}>List Antrian</Link>
                </div> 
            </div>
          
            {/* <div>
                {
                    !localStorage.access_token ? <Link to="/login" className="btn btn-success" type="button">Login</Link> : <Link onClick={handleLogout} className="btn btn-danger" type="button">Logout</Link>
                }
            </div> */}
        </nav>
        <Outlet/>
    </>
}