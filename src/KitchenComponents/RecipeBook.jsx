import '../KitchenStyles/RecipeBook.css'
import { useState, useEffect } from 'react'
import Cookies from "js-cookie"
import GridView from '../Components/GridView'
import Search from '../Components/Search'

const RecipeBook = (props) => {
    const [recipeList, setRecipeList] = useState([])
    const [recipeCount, setRecipeCount] = useState(0)
    const [pageOneID, setPageOneID] = useState(0)
    const [pageTwoID, setPageTwoID] = useState(1)

    const [gridView, setGridView] = useState(false)
    const [colOneData, setColOneData] = useState([])
    const [colTwoData, setColTwoData] = useState([])
    const [colThreeData, setColThreeData] = useState([])


    const apiurl = "http://localhost:5000/fetch-for-book"

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

    const updateColData = (data) => {
        setColOneData(data.slice(0, 9))
        setColTwoData(data.slice(10, 19))
        setColThreeData(data.slice(20, 29))
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
                setRecipeList(data["list"])
                setRecipeCount(data["count"])
            })
    }

    return (
        <div className="d-flex recipebook--container">
            {
                !gridView && (
                    <>
                        <div className="d-flex flex-column page--column">
                            <div role="button" onClick={()=>setGridView(true)} className="gridview--btn text-center rounded">Grid View</div>
                            <div className="pageone--div">
                                {
                                    (pageOneID < recipeCount) && (
                                        <>
                                            <div className="d-flex flex-row justify-content-center mt-3 mb-3 fw-bolder">{recipeList[pageOneID].name}</div>
                                            {
                                                <img className="recipe--img" src={recipeList[pageOneID]?.img_url}></img>
                                            }
                                            <div className="d-flex flex-row flex-wrap ms-2">
                                                {
                                                    recipeList[pageOneID].ingredients.map((ingredient) => (
                                                        <div className="d-flex flex-column small--div me-2">&bull; {ingredient}</div>
                                                    ))
                                                }
                                            </div>
                                            <div className="d-flex flex-column ms-2">
                                                {
                                                    recipeList[pageOneID].instructions.map((instruction, step) => (
                                                        <div className="d-flex flex-row small--div me-2 mt-1 mb-1">Step {step + 1}. {instruction}</div>
                                                    ))
                                                }
                                            </div>
                                        </>
                                    )

                                }
                            </div>
                            {
                                pageOneID > 0 && (
                                    <div role="button" onClick={previousPage} className="back--btn text-center rounded">Last Page</div>
                                )
                            }
                        </div>
                        <div className="d-flex flex-column page--column">
                            <div role="button" onClick={() => props.updatekitchen("kitchen")} className="closebook--btn text-center rounded">Close</div>
                            <div className="pagetwo--div">
                                {
                                    (pageTwoID < recipeCount) && (
                                        <>
                                            <div className="d-flex flex-row justify-content-center mt-3 mb-3 fw-bolder ">{recipeList[pageTwoID].name}</div>
                                            <img className="recipe--img" src={recipeList[pageTwoID].img_url}></img>
                                            <div className="d-flex flex-row flex-wrap ms-2 ">
                                                {
                                                    recipeList[pageTwoID].ingredients.map((ingredient) => (
                                                        <div className="d-flex flex-column small--div me-2">&bull; {ingredient}</div>
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
                                (pageTwoID < recipeCount - 1) && (
                                    <div role="button" onClick={nextPage} className="forward--btn text-center rounded">Next Page</div>
                                )
                            }
                        </div>
                    </>
                )
            }
            {
                gridView && (
                    <div className="container-fluid gridview--container">
                        <div className="p-2 d-flex flex-row justify-content-center">
                            <div role="button" onClick={()=>props.updatekitchen("kitchen")} className="backtokitchen">Back to kitchen!</div>
                            <div>Easily find any of your saved recipes!</div>
                            <div role="button" onClick={() => setGridView(false)} className="backtobook">Back to book view!</div>
                        </div>
                        <Search updatedata={updateColData} scope="user"></Search>
                        <GridView colone={colOneData} coltwo={colTwoData} colthree={colThreeData}></GridView>
                    </div>
                )
            }
        </div>
    )
}

export default RecipeBook