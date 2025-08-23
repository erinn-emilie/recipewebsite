import '../Styles/UniversalStyles.css'
import { useState } from 'react'


const RecipeCard = (props) => {

    const [highlightedStep, setHighlighted] = useState(-1)


    const selectStep = (id) => {
        setHighlighted(id)
    }

    const deselectStep = () => {
        setHighlighted(-1)
    }

    if (props.data.ingredients === undefined) {
        return (
            <div className="rounded recipe--card container-fluid d-flex flex-row justify-content-center">
                <p className="text-center">Enter a url and your recipe will appear here! In the future this will have a sample recipe to show you what the output looks like. </p>
            </div>
        )
    }

    return (
        <div className="rounded recipe--card container-fluid d-flex flex-row">
            <div className="p-2 d-flex flex-column container-fluid ingredients--column mt-3">
                <h2 className="header">Ingredients</h2>
                <div className="p-2 d-flex">Yield: {props.data?.yield}</div>
                {
                    props.data.ingredients?.map((ingredient) => (
                        <div className="p-2 d-flex">{ingredient}</div>
                    ))
                }
            </div>
            <div className="p-2 d-flex flex-column container-fluid instructions--column mt-3">
                <h2 className="header">Instructions</h2>
                <div className="p-2 d-flex">Cook Time: {props.data?.cook_time}</div>
                {
                    props.data.instructions?.map((step, number) => (
                        <>
                            {
                                number == highlightedStep && (
                                    <div onClick={() => deselectStep()} className="p-2 d-flex rounded selectedstep mb-3 mt-3">Step {number + 1}. {step}</div>
                                )
                            }
                            {
                                number != highlightedStep && (
                                    <div onClick={() => selectStep(number)} className="p-2 d-flex">Step {number + 1}. {step}</div>
                                )
                            }
                        </>
                    ))
                }
            </div>
            <div className="p-2 d-flex flex-column container-fluid info--column mt-3">
                <h2 className="header">Other Info</h2>
                <div className="p-2 d-flex">Author: {props.data?.author}</div>
                <div className="p-2 d-flex">Cuisine Style: {props.data?.cuisine}</div>
                <div className="p-2 d-flex">Category: {props.data?.category}</div>
                <button className="btn btn-primary">Save Recipe</button>
            </div>
        </div>
    )
}

export default RecipeCard