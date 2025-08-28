import { useState,useEffect } from 'react'
import RecipeCard from '../Components/RecipeCard'
import '../Styles/HomePage.css'
import Cookies from "js-cookie"
import PromptBox from '../Components/PromptBox'




const HomePage = () => {

    const [curUrl, setCurUrl] = useState("")
    const [recipeData, setRecipeData] = useState({})
    const [showPrompt, setShowPrompt] = useState(false)
    const [message, setMessage] = useState("")
    const [redirect, setRedirect] = useState(false)

    const apiurl = "http://localhost:5000/parse-recipe"


    const closePrompt = () => {
        setShowPrompt(false)
        setMessage("")
        setRedirect(false)
    }

    const openPrompt = (message, redirect) => {
        setShowPrompt(true)
        setMessage(message)
        setRedirect(redirect)
    }


    const handleChange = (event) => {
        setCurUrl(event.target.value)
    }

    const handleSubmit = () => {
        handleFetch(curUrl)
    }


    const handleFetch = async (url) => {
        let username = ""
        if (Cookies.get("validuser") == "true") {
            username = Cookies.get("username")
        }
        else {
            username = "N/A"
        }
        fetch(apiurl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "url": url, "username": username }),
        })
        .then(response => response.json())
        .then(data => {
            if ("message" in data) {
                openPrompt("There seems to be a problem accessing that site. Please check your url and try again!", false)
            }
            else {
                data = {
                    ...data,
                    "url": url,
                }
                setRecipeData(data)
                Cookies.set('currenturl', url, { path: '/' })
            }
        })
    }

    return (
        <div className="container-fluid d-flex flex-row home--container">
            <div className="container-fluid about--container d-flex flex-column">
                <h1 className="mt-3">About Us</h1>
                <p>About us section under construction. Check back later!</p>
            </div>
            <div className="container-fluid d-flex flex-column body--container">
                <div className="p-2 d-flex flex-row">Enter a url below to get a neat, clear version of the recipe!</div>
                <div className="p-2 d-flex flex-row url--div">
                    <input className="p-2 rounded flex-column url--input" onChange={handleChange} type="text"></input>
                    <div className="flex-column rounded p-2 custom--btn" role="button" onClick={handleSubmit}>Submit</div>
                </div>
                <RecipeCard openprompt={openPrompt} closeprompt={closePrompt} data={recipeData}></RecipeCard>
            </div>
            {
                showPrompt && (
                    <PromptBox close={closePrompt} redirect={redirect} message={message}></PromptBox>
                )
            }
        </div>
    )
}

export default HomePage

