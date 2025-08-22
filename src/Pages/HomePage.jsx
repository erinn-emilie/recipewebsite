import { useState } from 'react'
import '../Styles/UniversalStyles.css'


const HomePage = () => {

    const [curUrl, setCurUrl] = useState("")
    const [message, setMessage] = useState("")
    const apiurl = "http://localhost:5000/run-script"

    const handleChange = (event) => {
        setCurUrl(event.target.value)
    }

    const handleSubmit = () => {
        handleFetch(curUrl)
    }

    const handleFetch = async(url) => {
        fetch(apiurl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "url": url }),
        })
        .then(response => response.json())
        .then(data => {
            setMessage(data["message"])
        })
    }

    return (
        <div className="container-fluid body--container home--container">
            <label>Please enter the url!</label>
            <input onChange={handleChange} type="text"></input>
            <button onClick={handleSubmit}>Submit</button>
            <div>Your response is: {message}</div>
        </div>
    )
}

export default HomePage