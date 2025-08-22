import React from 'react'
import { Link } from 'react-router-dom'
import '../Styles/NavBar.css'

const NavBar = () => {
    return (
        <div className="navbar--container container-fluid row">
            <div className="navbar--item col">
                <Link to="/">Home</Link>
            </div>
            <div className="navbar--item col">
                <Link to="/recipes">Recipe Book</Link>
            </div>
            <div className="navbar--item col">
                <Link to="/portal">Log-In/Sign-Up</Link>
            </div>
        </div>
    )
}

export default NavBar