import { Outlet, Link } from "react-router-dom";
import logo from '../assets/react.svg';
export default function Navbar(){
    return <>
         <nav className='navbar navbar-expand-lg navbar-dark bg-dark fixed-top' style={{paddingRight:'50px', paddingLeft: '50px'}}>
            <img src={logo} className='navbar-logo' style={{width: '75px', height: '75px'}}></img>
            <Link className="navbar-brand" to="/" style={{paddingLeft: '10px'}}>Admin Control</Link>
            <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                {/* {
                    !localStorage.access_token ? '' : 
                    <div>
                        <Link to='/upload'  className='btn btn-info' type='button' style={{marginRight:'10px'}}>Upload Video</Link> 
                        <Link to='/my-videos' className='btn btn-light' type='button' style={{marginRight:'10px'}}>My Videos</Link>
                    </div>
                } */}
            </div>
          
            <div>
                {
                    !localStorage.access_token ? <Link to="/login" className="btn btn-success" type="button">Login</Link> : <Link onClick={handleLogout} className="btn btn-danger" type="button">Logout</Link>
                }
            </div>
        </nav>
        <Outlet/>
    </>
}