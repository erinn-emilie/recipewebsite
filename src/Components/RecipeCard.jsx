import '../Styles/UniversalStyles.css'
import { useState } from 'react'


const RecipeCard = (props) => {

    const [highlightedStep, setHighlightedStep] = useState(-1)
    const [highlightedIng, setHighlightedIng] = useState(-1)
    const [finishedSteps, setFinishedSteps] = useState([])
    const [finishedIngs, setFinishedIngs] = useState([])


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

    if (props.data.ingredients === undefined) {
        return (
            <div className="rounded recipe--card container-fluid d-flex flex-row justify-content-center">
                <p className="text-center">Enter a url and your recipe will appear here! In the future this will have a sample recipe to show you what the output looks like. </p>
            </div>
        )
    }

    return (
        <div className="rounded recipe--card container-fluid">
            <h1 className="d-flex flex-row recipe--header mt-3">{props.data?.name}</h1>
            <div className="d-flex flex-row">
                <div className="p-2 d-flex flex-column container-fluid ingredients--column">
                    <h2 className="header">Ingredients</h2>
                    <div className="p-2 d-flex">Yield: {props.data?.yield}</div>
                    {
                        props.data.ingredients?.map((ingredient, number) => (
                            <>
                                {
                                    number == highlightedIng && (
                                        <div onClick={() => finishIng(number)} className="p-2 d-flex rounded selected mb-3 mt-3">{ingredient}</div>
                                    )
                                }
                                {
                                    (number != highlightedIng && finishedIngs.indexOf(number) == -1) && (
                                        <div onClick={() => selectIng(number)}  className="p-2 d-flex">{ingredient}</div>
                                    )
                                }
                                {
                                    finishedIngs.indexOf(number) != -1 && (
                                        <div onClick={() => startIng(number)} className="p-2 d-flex strickthrough">{ingredient}</div>
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
                                        <div onClick={() => finishStep(number)} className="p-2 d-flex rounded selected mb-3 mt-3">Step {number + 1}. {step}</div>
                                    )
                                }
                                {
                                    (number != highlightedStep && finishedSteps.indexOf(number) == -1) && (
                                        <div onClick={() => selectStep(number)} className="p-2 d-flex">Step {number + 1}. {step}</div>
                                    )
                                }
                                {
                                    finishedSteps.indexOf(number) != -1 && (
                                        <div onClick={() => startStep(number)} className="p-2 d-flex strickthrough">Step {number + 1}. {step}</div>
                                    )
                                }
                            </>
                        ))
                    }
                </div>
                <div className="p-2 d-flex flex-column container-fluid info--column">
                    <h2 className="header">Other Info</h2>
                    <div className="p-2 d-flex">Author: {props.data?.author}</div>
                    <div className="p-2 d-flex">Cuisine Style: {props.data?.cuisine}</div>
                    <div className="p-2 d-flex">Category: {props.data?.category}</div>
                    <button className="btn btn-primary">Save Recipe</button>
                </div>
            </div>
        </div>
    )
}

export default RecipeCard