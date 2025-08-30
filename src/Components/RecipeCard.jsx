import '../Styles/RecipeCard.css'
import { useState, useEffect } from 'react'
import { pdf } from '@react-pdf/renderer'
import { saveAs } from 'file-saver'
import RecipeDocument from './RecipeDocument'
import HeartButton from './HeartButton'
import Cookies from "js-cookie"



const RecipeCard = (props) => {

    const [highlightedStep, setHighlightedStep] = useState(-1)
    const [highlightedIng, setHighlightedIng] = useState(-1)
    const [finishedSteps, setFinishedSteps] = useState([])
    const [finishedIngs, setFinishedIngs] = useState([])
    const [nutrition, setNutrition] = useState(false)


    useEffect(() => {
        setHighlightedIng(-1)
        setHighlightedStep(-1)
        setFinishedIngs([])
        setFinishedSteps([])
    }, [props])


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

    const saveRecipe = async () => {
        const blob = await pdf(<RecipeDocument data={props.data} />).toBlob()
        const filename = props.data.name + ".pdf"
        saveAs(blob, filename)
        if (Cookies.get("validuser") != "true") {
            props.openprompt("The recipe has been saved to your files! Sign up or log in to your account to save it to your kitchen!", true)
        }
        else {
            props.openprompt("The recipe has been saved to your files! To save it to your kitchen, please click the heart!", false)
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
            "To save a recipe as a pdf, just click the save as pdf!",
            "To save a recipe to your kitchen, log-in or sign-up for an account, then press the heart!"
        ]
        props.data.author = "Erinn Keohane"
        props.data.cuisine = "Any and ever kind!"
        props.data.category = "Whatever you can find!"
        props.data.site_name = "To be decided..."
        props.data.date = "In the future"
        props.data.reviews = "1! (me)"
        props.data.rating = "5.0"
        props.data.userliked = "false"
    }

    return (
        <div className="rounded recipe--card container-fluid">
            <div className="d-flex flex-row justify-content-center align-items-center">
                <HeartButton data={props.data} openprompt={props.openprompt}></HeartButton>
                <h1 className="p-2 recipe--header mt-3">{props.data?.name}</h1>
                <div onClick={() => saveRecipe()} role="button" className="p-2 d-flex rounded mt-2 custom--btn">Save as PDF</div>
                {
                    !nutrition && (
                        <div onClick={() => setNutrition(true)} role="button" className="m-1 d-flex rounded mt-2 custom--btn">Show Nutrition Information</div>
                    )
                }
                {
                    nutrition && (
                        <div onClick={() => setNutrition(false)} role="button" className="m-1 d-flex rounded mt-2 custom--btn">Hide Nutrition Information</div>
                    )
                }
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
            {
                nutrition && (
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <div className="p-2 d-flex flex-column justify-content-center align-items-center">
                            <h1 className="p-2 d-flex flex-row recipe--header mt-3">Nutrition Information</h1>
                            <div className="p-2 d-flex flex-row">Calories: {props.data.nutrition?.calories}</div>
                            <div className="p-2 d-flex flex-row">Carbohydrates: {props.data.nutrition?.carbohydrateContent}</div>
                            <div className="p-2 d-flex flex-row">Fiber: {props.data.nutrition?.fiberContent}</div>
                            <div className="p-2 d-flex flex-row">Protein: {props.data.nutrition?.proteinContent}</div>
                            <div className="p-2 d-flex flex-row">Saturated Fat: {props.data.nutrition?.saturatedFatContent}</div>
                            <div className="p-2 d-flex flex-row">Sodum: {props.data.nutrition?.sodiumContent}</div>
                            <div className="p-2 d-flex flex-row">Fat: {props.data.nutrition?.fatContent}</div>
                            <div className="p-2 d-flex flex-row">Unsaturated Fat: {props.data.nutrition?.unsaturatedFatContent}</div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default RecipeCard