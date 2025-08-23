import { useState } from 'react'
import RecipeCard from '../Components/RecipeCard'
import '../Styles/UniversalStyles.css'


const HomePage = () => {

    const [curUrl, setCurUrl] = useState("")
    const [recipeData, setRecipeData] = useState({})
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
            setRecipeData(data)
        })
    }

    return (
        <div className="container-fluid d-flex flex-row">
            <div className="container-fluid about--container d-flex flex-column">
                <h1 className="mt-3">About Us</h1>
                <p>About us section under construction. Check back later!</p>
            </div>
            <div className="container-fluid d-flex flex-column body--container">
                <div className="p-2 flex-row">Enter a url below to get a neat, clear version of the recipe!</div>
                <div className="p-2 d-flex flex-row">
                    <input className="p-2 rounded flex-column" onChange={handleChange} type="text"></input>
                    <button className="flex-column btn btn-dark" onClick={handleSubmit}>Submit</button>
                </div>
                <RecipeCard data={recipeData}></RecipeCard>
            </div>
        </div>
    )
}

export default HomePage