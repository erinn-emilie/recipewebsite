import '../Styles/KitchenPage.css'
import { useState, useEffect } from 'react'
import Cookies from "js-cookie"



const KitchenPage = () => {

    const [showKitchen, setShowKitchen] = useState(true)
    const [openRecipeBook, setOpenRecipeBook] = useState(false)
    const [recipeList, setRecipeList] = useState([])
    const [recipeCount, setRecipeCount] = useState(0)
    const [pageOneID, setPageOneID] = useState(-1)
    const [pageTwoID, setPageTwoID] = useState(-1)


    const apiurl = "http://localhost:5000/fetch-saved-recipes"


    const clickRecipeBook = () => {
        setShowKitchen(false)
        setOpenRecipeBook(true)
    }

    const nextPage = () => {
        setPageOneID(pageOneID + 2)
        setPageTwoID(pageTwoID + 2)
        
    }

    const previousPage = () => {
        setPageOneID(pageOneID - 2)
        setPageTwoID(pageTwoID - 2)
    }

    useEffect(() => {
        handleFetch()
    }, [])

    const setInitialPages = (count) => {
        if (count >= 2) {
            setPageOneID(0)
            setPageTwoID(1)
        }
        if (count == 1) {
            setPageOneID(0)
        }
    }


    const handleFetch = async () => {
        let username = Cookies.get("username")
        fetch(apiurl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "username": username }),
        })
            .then(response => response.json())
            .then(data => {
                    setRecipeList(data["data"])
                    setRecipeCount(data["count"])
                    setInitialPages(data["count"])
            })
    }

    return (
        <div className="container-fluid kitchen--container">
            {
                showKitchen && (
                    <>
                        <div className="d-flex flex-row background--container">
                            <img role="button"  className="fridge--image" src="\public\fridge.png"></img>
                            <img role="button" className="cabinets--image" src="\public\cabinets.png"></img>
                            <img role="button" onClick={clickRecipeBook}  className="recipebook--image" src="\public\recipebook.png"></img>
                        </div>
                        <div className="d-flex flex-row floor--container"></div>
                    </>
                )
            }
            {
                openRecipeBook && (
                    <div className="d-flex ">
                        <div className="d-flex flex-column page--column">
                            <div className="pageone--div">
                                {
                                    pageOneID != -1 && (
                                        <>
                                            <div className="d-flex flex-row justify-content-center mt-3 mb-3 fw-bolder">{recipeList[pageOneID].name}</div>
                                            <div className="d-flex flex-row flex-wrap ms-2">
                                                {
                                                    recipeList[pageOneID].ingredients.map((ingredient) => (
                                                        <div className="d-flex flex-column small--div me-2">{ingredient}</div>
                                                    ))
                                                }
                                            </div>
                                            <div className="d-flex flex-column ms-2">
                                                {
                                                    recipeList[pageOneID].instructions.map((instruction, step) => (
                                                        <div className="d-flex flex-row small--div me-2 mt-1 mb-1">Step {step+1}. {instruction}</div>
                                                    ))
                                                }
                                            </div>
                                        </>
                                    )

                                }
                            </div>
                            {
                                pageOneID > 0 && (
                                    <div role="button" onClick={previousPage} className="back--btn text-center rounded">Previous Page</div>
                                )
                            }
                        </div>
                        <div className="d-flex flex-column page--column">
                            <div className="pagetwo--div">
                                {
                                    (pageTwoID != -1 && pageTwoID < recipeCount) && (
                                        <>
                                            <div className="d-flex flex-row justify-content-center mt-2 fw-bolder ">{recipeList[pageTwoID].name}</div>
                                            <div className="d-flex flex-row flex-wrap ms-2">
                                                {
                                                    recipeList[pageTwoID].ingredients.map((ingredient) => (
                                                        <div className="d-flex flex-column small--div me-2">{ingredient}</div>
                                                    ))
                                                }
                                            </div>
                                            <div className="d-flex flex-column ms-2">
                                                {
                                                    recipeList[pageTwoID].instructions.map((instruction, step) => (
                                                        <div className="d-flex flex-row small--div me-2 mt-1 mb-1">Step {step + 1}. {instruction}</div>
                                                    ))
                                                }
                                            </div>
                                        </>
                                    )
                                }
                            </div>
                            {
                                (pageTwoID < recipeCount - 1 && pageTwoID != -1) && (
                                    <div role="button" onClick={nextPage} className="forward--btn text-center rounded">Next Page</div>
                                )
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default KitchenPage
