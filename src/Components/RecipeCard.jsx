import '../Styles/HomePage.css'
import { useState, useEffect } from 'react'
import { pdf } from '@react-pdf/renderer'
import { saveAs } from 'file-saver'
import RecipeDocument from './RecipeDocument'
import PromptBox from './PromptBox'
import Cookies from "js-cookie"



const RecipeCard = (props) => {

    const [highlightedStep, setHighlightedStep] = useState(-1)
    const [highlightedIng, setHighlightedIng] = useState(-1)
    const [finishedSteps, setFinishedSteps] = useState([])
    const [finishedIngs, setFinishedIngs] = useState([])
    const [nutrition, setNutrition] = useState(false)
    const [showPrompt, setShowPrompt] = useState(false)
    const [message, setMessage] = useState("")
    const [redirect, setRedirect] = useState(false)

    const apiurl = "http://localhost:5000/"


    const closePrompt = () => {
        setShowPrompt(false)
        setMessage("")
        setRedirect(false)
    }


    const saveRecipeCodes = {
        "NOMESSAGE": 0,
        "INVALUSER": 1,
        "DOUBLESAVE": 2,
        "SUCCESS": 3
    }




    useEffect(() => {
        setHighlightedIng(-1)
        setHighlightedStep(-1)
        setFinishedIngs([])
        setFinishedSteps([])
    }, [props])


    const toggleNutrition = () => {
        setNutrition(!nutrition)

    }

    const selectStep = (id) => {
        setHighlightedStep(id)
    }

    const finishStep = (id) => {
        setHighlightedStep(-1)
        let temp = finishedSteps
        temp.push(id)
        setFinishedSteps(temp)
    }

    const startStep = (id) => {
        let temp = finishedSteps
        temp = temp.filter(num => num !== id)
        setFinishedSteps(temp)
    }

    const selectIng = (id) => {
        setHighlightedIng(id)
    }

    const finishIng = (id) => {
        setHighlightedIng(-1)
        let temp = finishedIngs
        temp.push(id)
        setFinishedIngs(temp)
    }

    const startIng = (id) => {
        let temp = finishedIngs
        temp = temp.filter(num => num !== id)
        setFinishedIngs(temp)
    }

    const saveToDatabase = async () => {
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
                    setMessage("The recipe has been saved to your files and your account!")
                    setShowPrompt(true)
                }
                else if (data.message == saveRecipeCodes.DOUBLESAVE) {
                    setMessage("The recipe has been saved to your files but it looks like it already exists on your account! Try checking your kitchen.")
                    setShowPrompt(true)
                }
                else {
                    setMessage("The recipe has been saved to your files but something went wrong saving it to your account. Please try again later!")
                    setShowPrompt(true)
                }
            })
    }

    const saveRecipe = async () => {
        const blob = await pdf(<RecipeDocument data={props.data} />).toBlob()
        const filename = props.data.name + ".pdf"
        saveAs(blob, filename)
        if (Cookies.get("validuser") == "true") {
            saveToDatabase()
        }
        else {
            setMessage("The recipe has been saved to your files! Sign up or log in to your account to save it to your kitchen!")
            setRedirect(true)
            setShowPrompt(true)
        }
    }


    if (props.data.ingredients === undefined) {
        props.data.name = "Recipe Name"
        props.data.yield = "One simple recipe"
        props.data.cook_time = "A few seconds"
        props.data.ingredients = ["The list of ingredients for your recipe will appear here!"]
        props.data.instructions = [
            "Find the url of the recipe you want to make.",
            "Enter it in the box above and press submit.",
            "Enjoy your easy-to-read recipe!",
            "To highlighted a step or ingredient, just click on it! When you're done with it, just click it again!",
            "To save a recipe as a pdf, just click the save recipe button!"
        ]
        props.data.author = "Erinn Keohane"
        props.data.cuisine = "Any and ever kind!"
        props.data.category = "Whatever you can find!"
        props.data.site_name = "To be decided..."
        props.data.date = "In the future"
        props.data.reviews = "1! (me)"
        props.data.rating = "5.0"
    }

    return (
        <div className="rounded recipe--card container-fluid">
            { 
                !nutrition && (
                    <>
                        <div className="d-flex flex-row justify-content-center align-items-center">
                            <h1 className="p-2 recipe--header mt-3">{props.data?.name}</h1>
                            <div onClick={() => saveRecipe()} role="button" className="p-2 d-flex rounded mt-2 custom--btn">Save Recipe</div>
                            <div onClick={() => toggleNutrition()} role="button" className="m-1 d-flex rounded mt-2 custom--btn">Show Nutrition Information</div>
                        </div>
                        <div className="d-flex flex-row">
                            <div className="p-2 d-flex flex-column container-fluid ingredients--column">
                                <h2 className="header">Ingredients</h2>
                                <div className="p-2 d-flex">Yield: {props.data?.yield}</div>
                                {
                                    props.data.ingredients?.map((ingredient, number) => (
                                        <>
                                            {
                                                number == highlightedIng && (
                                                    <div onClick={() => finishIng(number)} role="button" className="p-2 d-flex rounded selected mb-3 mt-3">{ingredient}</div>
                                                )
                                            }
                                            {
                                                (number != highlightedIng && finishedIngs.indexOf(number) == -1) && (
                                                    <div onClick={() => selectIng(number)} role="button" className="p-2 d-flex">{ingredient}</div>
                                                )
                                            }
                                            {
                                                finishedIngs.indexOf(number) != -1 && (
                                                    <div onClick={() => startIng(number)} role="button" className="p-2 d-flex strickthrough">{ingredient}</div>
                                                )
                                            }
                                        </>
                                    ))
                                }
                            </div>
                            <div className="p-2 d-flex flex-column container-fluid instructions--column">
                                <h2 className="header">Instructions</h2>
                                <div className="p-2 d-flex">Cook Time: {props.data?.cook_time}</div>
                                {
                                    props.data.instructions?.map((step, number) => (
                                        <>
                                            {
                                                number == highlightedStep && (
                                                    <div onClick={() => finishStep(number)} role="button" className="p-2 d-flex rounded selected mb-3 mt-3">Step {number + 1}. {step}</div>
                                                )
                                            }
                                            {
                                                (number != highlightedStep && finishedSteps.indexOf(number) == -1) && (
                                                    <div onClick={() => selectStep(number)} role="button" className="p-2 d-flex">Step {number + 1}. {step}</div>
                                                )
                                            }
                                            {
                                                finishedSteps.indexOf(number) != -1 && (
                                                    <div onClick={() => startStep(number)} role="button" className="p-2 d-flex strickthrough">Step {number + 1}. {step}</div>
                                                )
                                            }
                                        </>
                                    ))
                                }
                            </div>
                            <div className="p-2 d-flex flex-column container-fluid info--column">
                                <h2 className="header">Other Info</h2>
                                <div className="p-2 d-flex">Author: {props.data?.author}</div>
                                <div className="p-2 d-flex">Site: {props.data?.site_name}</div>
                                <div className="p-2 d-flex">Date Published: {props.data?.date}</div>
                                <div className="p-2 d-flex">Cuisine Style: {props.data?.cuisine}</div>
                                <div className="p-2 d-flex">Category: {props.data?.category}</div>
                                <div className="p-2 d-flex">Rating on {props.data?.site_name}: {props.data?.rating}</div>
                                <div className="p-2 d-flex">Reviews on {props.data?.site_name}: {props.data?.reviews}</div>
                            </div>
                        </div>
                    </>
                )
            }
            {
                nutrition && (
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <div className="p-2 d-flex flex-row">
                            <h1 className="p-2 recipe--header mt-3">Nutrition Information</h1>
                            <div onClick={() => saveRecipe()} role="button" className="p-2 d-flex rounded mt-2 custom--btn">Save Recipe</div>
                            <div onClick={() => toggleNutrition()} role="button" className="m-1 d-flex rounded mt-2 custom--btn">Hide Nutrition Information</div>
                        </div>
                        <div className="p-2 d-flex flex-row">
                            <div className="p-2 d-flex flex-row">Calories: {props.data.nutrition?.calories}</div>
                        </div>
                    </div>
                )
            }
            {
                showPrompt && (
                    <PromptBox close={closePrompt} message={message} redirect={redirect}></PromptBox>
                )
            }
        </div>
    )
}

export default RecipeCard