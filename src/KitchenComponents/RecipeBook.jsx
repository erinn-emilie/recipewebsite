import '../KitchenStyles/RecipeBook.css'
import { useState } from 'react'
import GridView from '../Components/GridView'
import Search from '../Components/Search'

const RecipeBook = (props) => {

    const [colOneData, setColOneData] = useState([])
    const [colTwoData, setColTwoData] = useState([])
    const [colThreeData, setColThreeData] = useState([])


    const updateColData = (data) => {
        setColOneData(data.slice(0, 9))
        setColTwoData(data.slice(10, 19))
        setColThreeData(data.slice(20, 29))
    }

    return (
        <div className="container-fluid gridview--container">
            <div className="p-2 d-flex flex-row justify-content-center">
                <div role="button" onClick={()=>props.updatekitchen("kitchen")} className="backtokitchen">Back to kitchen!</div>
                <div>Easily find any of your saved recipes!</div>
            </div>
            <Search updatedata={updateColData} scope="user"></Search>
            <GridView colone={colOneData} coltwo={colTwoData} colthree={colThreeData}></GridView>
        </div>
    )
}

export default RecipeBook