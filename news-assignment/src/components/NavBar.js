import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import '../assets/styles/header.css';
import { BiChevronDown, BiChevronUp, BiMenu, BiX } from "react-icons/bi";

const NavBar = ({ activeTab, setActiveTab }) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [navbarActive, setNavbarActive] = useState(false);
    const location = useLocation();

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        setNavbarActive(false);
    }, [location]);

    const toggleNavbar = () => {
        setNavbarActive(!navbarActive);
    };

    const handleTabClick = (tab, number) => {
        setActiveTab(number);
        const sectionId = `${tab}`;
        const section = document.getElementById(sectionId);
        if (section) {
            setTimeout(() => {
                section.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    };

    return (
        <header className="header sticky">
            <div className='container-nav'>
                <div className="nav__buttons">
                    <ul className={`nav__links ${windowWidth < 1100 && navbarActive ? 'active' : ''}`}>
                        <li className={`nav__item ${location.pathname === '/' ? 'active' : ''}`}>
                            <Link className="nav__link" to={'/'} onClick={() => handleTabClick('home', 1)}>Home</Link>
                        </li>
                        <li className={`nav__item ${location.pathname === '/search' ? 'active' : ''}`}>
                            <Link className="nav__link" to={'/search'}>Search</Link>
                        </li>
                        <li className={`nav__item ${location.pathname === '/settings' ? 'active' : ''}`}>
                            <Link className="nav__link" to={'/settings'}>Settings</Link>
                        </li>
                    </ul>
                    <button className="toggle" onClick={toggleNavbar}>{navbarActive ? <BiX size={24} color="white" />  :  <BiMenu size={24} color="white" />}</button>
                </div>
            </div>
        </header>
    );
};

export default NavBar;