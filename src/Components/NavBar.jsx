import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import '../Styles/NavBar.css'
import Cookies from "js-cookie"
import AuthContext from '../Context/AuthContext'



const NavBar = () => {

    const [validUser, setValidUser] = useState(false)
    const authToken = useContext(AuthContext)

    useEffect(() => {
        if (authToken["authValue"] == "true") {
            setValidUser(true)
        }
        else {
            setValidUser(false)
        }
    }, [authToken])

    useEffect(() => {
        if (Cookies.get("validuser") == "true") {
            setValidUser(true)
        }
    }, [])


    const logOut = () => {
        Cookies.set('validuser', 'false', { expires: 1, path: '/' })
        Cookies.set('username', "", { expires: 1, path: '/' })
        Cookies.set('userid', -1, { expires: 1, path: '/' })
        Cookies.set('email', "", { expires: 1, path: '/' })
        setValidUser(false)
        authToken.updateAuth("false")
    }

    return (
        <div className="navbar--container container-fluid d-flex flex-row">
            <Link className="navbar--link d-flex flex-column" to="/">Home</Link>
            <Link className="navbar--link d-flex flex-column" to="/recipes">Recipe Database</Link>  
            {
                !validUser && (
                    <Link className="ms-auto navbar--link d-flex flex-column" to="/portal">Log-In/Sign-Up</Link>
                )
            }
            {
                validUser && (
                    <>
                        <Link className="navbar--link d-flex flex-column" to="/kitchen">Kitchen</Link>
                        <Link className="navbar--link d-flex flex-column" to="/account">Account</Link>
                        <div onClick={logOut} role = "button" className="ms-auto navbar--link d-flex flex-column">Log Out</div>
                    </>
                )
            }
        </div>
    )
}

export default NavBar