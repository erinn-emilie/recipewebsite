import React, { useState, useEffect, useContext } from 'react'
import PromptContext from '../Context/PromptContext'
import Cookies from "js-cookie"
import '../Styles/HeartButton.css'




const HeartButton = (props) => {
    const [likedState, setLikedState] = useState("none")
    const [heartColor, setHeartColor] = useState("greyheart")

    const promptToken = useContext(PromptContext)

    const apiurl = "http://localhost:5000/"

    const saveRecipeCodes = {
        "FAILURE": 0,
        "SUCCESS": 1
    }

    useEffect(() => {
        if (props.data.savestate == "user") {
            setLikedState("user")
            setHeartColor("redheart")
        }
        else if (props.data.savestate == "kitchen") {
            setLikedState("kitchen")
            setHeartColor("purpleheart")
        }
        else {
            setLikedState("none")
            setHeartColor("greyheart")
        }
    },[props])


    const handleClick = () => {
        if (Cookies.get("validuser") == "true") {
            if (likedState == "none" || likedState == "kitchen") {
                saveToDatabase()
                setLikedState("user")
                props.data.savestate = "user"
            }
            if (likedState == "user") {
                // Delete
            }
        }
        else {
            promptToken.openPrompt("To save a recipe to your kitchen, please log in or create an account!")
        }
    }

    const saveToDatabase = async () => {
        if (Cookies.get("validuser") == "true") {
            const url = apiurl + "save-recipe"
            const data = {
                ...props.data,
                "userid": Cookies.get("userid"),
                "username": Cookies.get("username")
            }
            console.log(data)
            fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.message == saveRecipeCodes.SUCCESS) {
                        promptToken.openPrompt("The recipe has been saved to your account!")
                    }
                    else {
                        promptToken.openPrompt("Something went wrong saving the recipe to your account!")
                    }
                })
        }
    }

    return (
        <div className={`heart-button-container ${heartColor}`} onClick={handleClick}>
            <span className="heart-icon"></span>
        </div>
    )
}

export default HeartButton