import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { GoogleLogin } from '@react-oauth/google';
import logo from '../assets/img/logo.svg';
import navIcon1 from '../assets/img/nav-icon1.svg';
import navIcon2 from '../assets/img/nav-icon2.svg';
import navIcon3 from '../assets/img/nav-icon3.svg';
import { HashLink } from 'react-router-hash-link';
import { BrowserRouter as Router } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

export const NavBar = () => {
  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  }

  const handleGoogleSuccess = (credentialResponse) => {
    try {
      console.log("Google Sign-In Success:", credentialResponse);
      const decoded = jwtDecode(credentialResponse.credential);
      console.log("Decoded token:", decoded);
      setIsSignedIn(true);
      setUserProfile(decoded);
    } catch (error) {
      console.error("Error handling Google sign-in:", error);
    }
  };

  const handleGoogleError = (error) => {
    console.error('Login Failed:', error);
  };

  const handleSignOut = () => {
    try {
      setIsSignedIn(false);
      setUserProfile(null);
      console.log("Signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Router>
      <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
        <Container>
          <Navbar.Brand href="/">
            <img src={logo} alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>Home</Nav.Link>
              <Nav.Link href="#skills" className={activeLink === 'skills' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('skills')}>Skills</Nav.Link>
              <Nav.Link href="#projects" className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('projects')}>Projects</Nav.Link>
            </Nav>
            <span className="navbar-text">
              <div className="social-icon">
                <a href="https://www.linkedin.com/in/ujjwal-rai-852389227/"><img src={navIcon1} alt="LinkedIn" /></a>
                <a href="https://github.com/ujjwal-rai"><img src={navIcon2} alt="GitHub" /></a>
                <a href="https://www.instagram.com/007_ujjwal_rai/"><img src={navIcon3} alt="Instagram" /></a>
              </div>
              {!isSignedIn ? (
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  useOneTap
                  theme="filled_black"
                  size="large"
                  flow="auth-code"
                  auto_select={false}
                  ux_mode="popup"
                />
              ) : (
                <button className="vvd" onClick={handleSignOut}>
                  <span>Sign Out</span>
                </button>
              )}
            </span>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Router>
  )
}
