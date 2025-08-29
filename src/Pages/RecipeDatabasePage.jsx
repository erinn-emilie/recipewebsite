import '../Styles/RecipeDatabasePage.css'
import { useState, useEffect } from 'react'
import Cookies from "js-cookie"
import GridView from '../Components/GridView'
import Search from '../Components/Search'





const RecipeDatabasePage = () => {

    const [colOneData, setColOneData] = useState([])
    const [colTwoData, setColTwoData] = useState([])
    const [colThreeData, setColThreeData] = useState([])

    const updateColData = (data) => {
        setColOneData(data.slice(0, 9))
        setColTwoData(data.slice(10, 19))
        setColThreeData(data.slice(20, 29))
    }


    return (
        <div className="container-fluid recipebody--container"> 
            <div className="p-2 d-flex flex-row justify-content-center">Search for any recipe in the database!</div>
            <Search updatedata={updateColData} scope="database"></Search>
            <GridView colone={colOneData} coltwo={colTwoData} colthree={colThreeData}></GridView>
        </div>
    )
}

export default RecipeDatabasePage
