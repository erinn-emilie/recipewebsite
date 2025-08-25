import React from 'react'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../Styles/NavBar.css'
import Cookies from "js-cookie"


const NavBar = () => {

    const [validUser, setValidUser] = useState(false)
    const [authToken, setAuthToken] = useState(Cookies.get("validuser"))

    useEffect(() => {
        console.log(authToken)
        if (authToken == "true") {
            setValidUser(true)
        }
        else {
            setValidUser(false)
        }
    }, [authToken])

    const presenceCookie = Cookies.get("validuser")
    if (authToken !== presenceCookie) {
        setAuthToken(presenceCookie)
    }

    return (
        <div className="navbar--container container-fluid d-flex flex-row">
            <Link className="navbar--link d-flex flex-column" to="/">Home</Link>
            <Link className="navbar--link d-flex flex-column" to="/recipes">Recipe Book</Link>  
            {
                !validUser && (
                    <Link className="ms-auto navbar--link d-flex flex-column" to="/portal">Log-In/Sign-Up</Link>
                )
            }
            {
                validUser && (
                    <>
                        <Link className="navbar--link d-flex flex-column" to="/kitchen">Kitchen</Link>
                        <div role = "button" className="ms-auto navbar--link d-flex flex-column">Log Out</div>
                    </>
                )
            }
        </div>
    )
}

export default NavBar