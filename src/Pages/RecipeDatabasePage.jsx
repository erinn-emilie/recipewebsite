import '../Styles/RecipeDatabasePage.css'
import { useState, useEffect } from 'react'
import MiniRecipeCard from '../Components/MiniRecipeCard'
import PromptBox from '../Components/PromptBox'
import Cookies from "js-cookie"
import RecipeCard from '../Components/RecipeCard'





const RecipeDatabasePage = () => {

    const [colOneData, setColOneData] = useState([])
    const [colTwoData, setColTwoData] = useState([])
    const [colThreeData, setColThreeData] = useState([])
    const [showBigCard, setShowBigCard] = useState(false)
    const [bigData, setBigData] = useState({})
    const [recipeOffset, setRecipeOffset] = useState(0)
    const [searchStr, setSearchStr] = useState("")
    const [searchCol, setSearchCol] = useState("name")

    const [showPrompt, setShowPrompt] = useState(false)
    const [message, setMessage] = useState("")
    const [redirect, setRedirect] = useState(false)

    const closePrompt = () => {
        setShowPrompt(false)
        setMessage("")
        setRedirect(false)
    }

    const openPrompt = (message, redirect) => {
        setShowPrompt(true)
        setMessage(message)
        setRedirect(redirect)
    }

    const openBigCard = (data) => {
        setBigData(data)
        setShowBigCard(true)
    }

    const closeBigCard = () => {
        setBigData({})
        setShowBigCard(false)
    }

    const apiurl = "http://localhost:5000/"

    useEffect(() => {
        handleFetchAll()
    }, [])

    const handleChange = (event) => {
        setSearchStr(event.target.value)
    }

    const handleSelectChange = (event) => {
        setSearchCol(event.target.value)
    }

    const handleSubmit = async () => {
        if (searchStr == "") {
            handleFetchAll()
        }
        else {
            handleFetchSome()
        }
    }

    const handleFetchSome = async () => {
        let url = apiurl + "fetch-certain-recipes"
        let username = ""
        if (Cookies.get("validuser") == "true") {
            username = Cookies.get("username")
        }
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "offset": recipeOffset, "username": username, "key": searchStr, "col": searchCol }),
        })
            .then(response => response.json())
            .then(data => {
                setColOneData(data.slice(0, 9))
                setColTwoData(data.slice(10, 19))
                setColThreeData(data.slice(20, 29))
            }
            ) 
    }

    const handleFetchAll = async () => {
        let username = ""
        let url = apiurl + "fetch-all-recipes"
        if (Cookies.get("validuser") == "true") {
            username = Cookies.get("username")
        }
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "offset": recipeOffset, "username": username}),
        })
            .then(response => response.json())
            .then(data => {
                    setColOneData(data.slice(0,9))
                    setColTwoData(data.slice(10,19))
                    setColThreeData(data.slice(20,29))
                }
            )
    }

    return (
        <div className="container-fluid recipebody--container"> 
            {
                !showBigCard && (
                    <>
                        <div className="p-2 d-flex flex-row justify-content-center">Search for any recipe in the database! (when this works at least....)</div>
                        <div className="p-2 d-flex flex-row search--div">
                            <select class="search--criteria rounded" value={searchCol} onChange={handleSelectChange}>
                                <option className="option--div" value="name">Search by Name</option>
                                <option className="option--div" value="author">Search by Author</option>
                                <option className="option--div" value="site_name">Search by Website</option>
                            </select>
                            <input className="p-2 rounded flex-column search--input" type="text" onChange={handleChange}></input>
                            <div className="flex-column rounded p-2 search--btn" role="button" onClick={handleSubmit}>Search</div>
                        </div>
                        <div className="d-flex flex-row">
                            <div className="d-flex flex-column column--div">
                                {
                                    colOneData?.map((data) => (
                                        <MiniRecipeCard opencard={openBigCard} openprompt={openPrompt} closeprompt={closePrompt} data={data}></MiniRecipeCard>
                                    ))
                                }
                            </div>
                            <div className="d-flex flex-column column--div">
                                {
                                    colTwoData?.map((data) => (
                                        <MiniRecipeCard opencard={openBigCard} openprompt={openPrompt} closeprompt={closePrompt} data={data}></MiniRecipeCard>
                                    ))
                                }
                            </div>
                            <div className="d-flex flex-column column--div">
                                {
                                    colThreeData?.map((data) => (
                                        <MiniRecipeCard opencard={openBigCard} openprompt={openPrompt} closeprompt={closePrompt} data={data}></MiniRecipeCard>
                                    ))
                                }
                            </div>
                        </div>
                    </>
                )
            }
            {
                showBigCard && (
                    <div className="container-fluid d-flex flex-row">
                        <div className="d-flex flex-column align-items-center">
                            <div role="button" onClick={()=>closeBigCard()} className="d-flex flex-row justify-content-center text-center close--btn rounded">Close Card</div>
                            <div className="d-flex flex-row">
                                <RecipeCard openprompt={openPrompt} closeprompt={closePrompt} data={bigData}></RecipeCard>
                            </div>
                        </div>
                    </div>
                )
            }
            {
                showPrompt && (
                    <PromptBox close={closePrompt} redirect={redirect} message={message}></PromptBox>
                )
            }
        </div>
    )
}

export default RecipeDatabasePage
