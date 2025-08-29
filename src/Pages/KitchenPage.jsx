import '../Styles/KitchenPage.css'
import RecipeBook from '../KitchenComponents/RecipeBook'
import { useState } from 'react'
import Cookies from "js-cookie"



const KitchenPage = () => {

    const [kitchenState, setKitchenState] = useState("kitchen")

    const updateKitchenState = (state) => {
        setKitchenState(state)
    }


    return (
        <div className="container-fluid kitchen--container">
            {
                kitchenState == "kitchen" && (
                    <>
                        <div className="d-flex flex-row background--container">
                            <img role="button" className="fridge--image" src="\public\fridge.png"></img>
                            <img role="button" className="cabinets--image" src="\public\cabinets.png"></img>
                            <img role="button" className="recipebook--image" onClick={()=>updateKitchenState("recipebook")} src="\public\recipebook.png"></img>
                        </div>
                        <div className="d-flex flex-row floor--container"></div>
                    </>
                )
            }
            {
                kitchenState == "recipebook" && (
                    <RecipeBook updatekitchen={updateKitchenState}></RecipeBook>
                )
            }

        </div>
    )
}

export default KitchenPage
