import React, { useState } from 'react'
import Cookies from "js-cookie"
import '../Styles/HeartButton.css'




const HeartButton = (props) => {
    const [isLiked, setIsLiked] = useState(props.liked)

    const handleClick = () => {
        if (Cookies.get("validuser") == "true") {
            setIsLiked(!isLiked)
        }
        props.update(!isLiked)
        
    }

    return (
        <div className={`heart-button-container ${isLiked ? 'liked' : ''}`} onClick={handleClick}>
            <span className="heart-icon"></span>
        </div>
    )
}

export default HeartButton