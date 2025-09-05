import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from "js-cookie"
import AuthContext from '../Context/AuthContext'


import '../Styles/PortalPage.css'


const PortalPage = () => {

    const [newUser, setNewUser] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [retyped, setRetyped] = useState("")
    const [username, setUsername] = useState("")
    const [failureString, setfailureString] = useState("")
    const apiurl = "http://localhost:5000/"
    const navigate = useNavigate()
    const authDict = useContext(AuthContext)


    const SignupCodes = {
        "NOMESSAGE": 0,
        "PASSNOMATCH": 1,
        "INVALPASS": 2,
        "TAKENUSER": 3,
        "INVALEMAIL": 4,
        "TAKENEMAIL": 5,
        "SUCCESS": 6,
    }

    const LoginCodes = {
        "NOMESSAGE": 0,
        "INVALINFO": 1,
        "SUCCESS": 2
    }

    const clearInformation = () => {
        setEmail("")
        setPassword("")
        setRetyped("")
        setUsername("")
    }


    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }
    const handleRetypedChange = (event) => {
        setRetyped(event.target.value)
    }
    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }
    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const toggleForm = () => {
        setNewUser(!newUser)
        setfailureString("")
        clearInformation()
    }

    const handleFetchSignup = async (data) => {
        const url = apiurl + "signup"
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            if (data.message == SignupCodes.SUCCESS) {
                Cookies.set('validuser', 'true', {expires: 1, path: '/' })
                Cookies.set('username', username, { expires: 1, path: '/' })
                Cookies.set('userid', data.userid, { expires: 1, path: '/' })
                authDict.updateAuth("true")
                navigate('/kitchen')
            }
            else {
                setfailureString("The information you provided is not valid. Please try again.")
                clearInformation()
            }
        })
    }

    const handleFetchLogin = async (data) => {
        const url = apiurl + "login"
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                if (data.message == LoginCodes.SUCCESS) {
                    Cookies.set('validuser', 'true', { expires: 1, path: '/' })              
                    Cookies.set('username', username, { expires: 1, path: '/' }) 
                    Cookies.set('userid', data.userid, { expires: 1, path: '/' })
                    Cookies.set('email', data.email, { expires: 1, path: '/' })
                    authDict.updateAuth("true")
                    navigate('/kitchen')
                }
                else {
                    setfailureString("The information you provided is not valid. Please try again.")
                    clearInformation()
                }
            })
    }

    const logIn = (event) => {
        event.preventDefault()
        const data = {
            "username": username,
            "password": password
        }
        handleFetchLogin(data)
    }

    const signUp = (event) => {
        event.preventDefault()
        const data = {
            "username": username,
            "password": password,
            "retyped": retyped,
            "email": email
        }
        setfailureString("")
        handleFetchSignup(data)
    }
    return (
        <div className="container-fluid position-absolute body--container">
            {
                newUser && (
                    <div className="rounded login--container d-flex flex-column">
                        <div className="header d-flex flex-row mb-2 mt-2">Sign Up Here</div>
                        <div className="d-flex flex-row">
                            <form className="justify-content-center align-items-center" onSubmit={signUp}>
                                <div className="d-flex flex-row mb-1 align-items-center">
                                    <label className="me-5 text-align-center">Email</label>
                                    <input className="rounded" onChange={handleEmailChange} value={email}type="email"></input>
                                </div>
                                <div className="d-flex flex-row mb-1 align-items-center">
                                    <label className="me-5 text-align-center">Username</label>
                                    <input className="rounded" onChange={handleUsernameChange} value={username} type="text"></input>
                                </div>
                                <div className="d-flex flex-row mt-1 align-items-center ">
                                    <label className="me-5 text-align-center">Password</label>
                                    <input className="rounded" onChange={handlePasswordChange} value={password} type="password"></input>
                                </div>
                                <div className="d-flex flex-row mt-1 align-items-center ">
                                    <label className="me-5 text-align-center">Re-Type Password</label>
                                    <input className="rounded" onChange={handleRetypedChange} value={retyped} type="password"></input>
                                </div>
                                <button type="submit" className="d-flex flex-row submit--btn rounded">Submit</button>
                            </form>
                        </div>
                        <div className="d-flex flex-row mb-2">Already have an account? Log in <div role="button" onClick={() => toggleForm()} className="ms-1 signup--link">here</div>!</div>
                        {
                            failureString.length > 0 && (
                                <div className="d-flex flex-row mb-2">{failureString}</div>
                            )
                        }
                    </div>
                )
            }
            {
                !newUser && (
                    <div className="rounded login--container d-flex flex-column">
                        <div className="header d-flex flex-row mb-2 mt-2">Log In Here</div>
                        <div className="d-flex flex-row">
                            <form className="justify-content-center align-items-center" onSubmit={logIn}>
                                <div className="d-flex flex-row mb-1 align-items-center">
                                    <label className="me-5 text-align-center">Username</label>
                                    <input className="rounded" onChange={handleUsernameChange} value={username} type="text"></input>
                                </div>
                                <div className="d-flex flex-row mt-1 align-items-center ">
                                    <label className="me-5 text-align-center">Password</label>
                                    <input className="rounded" onChange={handlePasswordChange} value={password} type="password"></input>
                                </div>
                                <button type="submit" className="d-flex flex-row submit--btn rounded">Submit</button>
                            </form>
                        </div>
                        <div className="d-flex flex-row mb-2">Don't have an account? Sign up <div role="button" onClick={() => toggleForm()} className="ms-1 signup--link">here</div>!</div>
                        {
                            failureString.length > 0 && (
                                <div className="d-flex flex-row mb-2">{failureString}</div>
                            )
                        }
                    </div>
                )
            }
        </div>
    )
} 

export default PortalPage