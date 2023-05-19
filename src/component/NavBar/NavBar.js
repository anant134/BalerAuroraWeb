import './navbarstyle.css';
import { MenuItems } from "./menu";
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
const NavBar = () => {
    const [menunavstate, setMenuNav] = useState(false);
    // const navigate = useNavigate();
    let history = useHistory();
    var booknow = process.env.PUBLIC_URL + "/images/booknow.png";
    var logo2 = process.env.PUBLIC_URL + "/images/logo2.png";
    var logo = process.env.PUBLIC_URL + "/images/logo.png";
    return (
        <>
            <nav className='NavbarItems'>

                <h1 className='navbar-logo' >
                    <img alt=' ' src={logo} style={{ "width": "100px", "height": "90px" }} />

                    <img alt=' ' src={logo2} style={{ "width": "200px", "height": "90px" }} />

                </h1>
                <div className='menu-icons' id="menunav" onClick={() => setMenuNav(!menunavstate)} >
                    <i className={menunavstate === true ? 'fas fa-times' : 'fas fa-bars'}></i>

                </div>
                <ul className={menunavstate === true ? 'nav-menu active' : 'nav-menu'}>
                    {MenuItems.map((item) => {

                        var data = item.title == 'BookNow' ? (

                            <>


                                <Link id={item.id} to={item.url} className={item.cName} >
                                    <img alt=' ' src={booknow} style={{ "width": "50px", "height": "50px" }} />
                                </Link>


                            </>
                        ) : (

                            <>


                                <Link id={item.id} to={item.url} className={item.cName} >
                                    <i className={item.icons}></i> {item.title}</Link>


                            </>
                        );
                        return data;
                    })}
                    {/* <button onClick={() => { navigate("/login") }}>Login</button> */}
                </ul>
            </nav>
        </>
    );
}

export default NavBar;