import '../Styles/GridView.css'
import { useState, useEffect } from 'react'
import MiniRecipeCard from '../Components/MiniRecipeCard'
import PromptBox from '../Components/PromptBox'
import RecipeCard from '../Components/RecipeCard'

const GridView = (props) => {

    const [showBigCard, setShowBigCard] = useState(false)
    const [bigData, setBigData] = useState({})

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

    return (
        <>
            {
                !showBigCard && (
                    <>
                        <div className="d-flex flex-row">
                            <div className="d-flex flex-column column--div">
                                {
                                    props.colone?.map((data) => (
                                        <MiniRecipeCard opencard={openBigCard} openprompt={openPrompt} closeprompt={closePrompt} data={data}></MiniRecipeCard>
                                    ))
                                }
                            </div>
                            <div className="d-flex flex-column column--div">
                                {
                                    props.coltwo?.map((data) => (
                                        <MiniRecipeCard opencard={openBigCard} openprompt={openPrompt} closeprompt={closePrompt} data={data}></MiniRecipeCard>
                                    ))
                                }
                            </div>
                            <div className="d-flex flex-column column--div">
                                {
                                    props.colthree?.map((data) => (
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
                            <div role="button" onClick={() => closeBigCard()} className="d-flex flex-row justify-content-center text-center close--btn rounded">Close Card</div>
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
        </>
    )
}

export default GridView