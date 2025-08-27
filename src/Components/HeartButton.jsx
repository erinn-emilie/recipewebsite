import React, { useState } from 'react'
import Cookies from "js-cookie"
import '../Styles/HeartButton.css'




const HeartButton = (props) => {
    const [isLiked, setIsLiked] = useState(props.data.userliked)

    const apiurl = "http://localhost:5000/"

    const saveRecipeCodes = {
        "FAILURE": 0,
        "SUCCESS": 1
    }


    const handleClick = () => {
        if (Cookies.get("validuser") == "true") {
            setIsLiked(!isLiked)
            if (!isLiked == true) {
                saveToDatabase()
            }
            else {
                //removeFromDatabase()
            }
        }
        else {
            props.openprompt("To save a recipe to your kitchen, please log in or create an account!", true)
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
                        props.openprompt("The recipe has been saved to your account!", false)
                    }
                    else {
                        props.openprompt("Something went wrong saving the recipe to your account!", false)
                    }
                })
        }
    }

    return (
        <div className={`heart-button-container ${isLiked == "true" ? 'liked' : ''}`} onClick={handleClick}>
            <span className="heart-icon"></span>
        </div>
    )
}

export default HeartButton