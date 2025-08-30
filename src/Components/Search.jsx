import '../Styles/Search.css'
import { useState, useEffect } from 'react'
import Cookies from "js-cookie"

const Search = (props) => {

    const [recipeOffset, setRecipeOffset] = useState(0)
    const [searchStr, setSearchStr] = useState("")
    const [searchCol, setSearchCol] = useState("name")
    const [searchFilter, setSearchFilter] = useState({ "category": "", "cuisine": "" })



    const apiurl = "http://localhost:5000/fetch-data"

    useEffect(() => {
        fetchData()
    }, [])

    const handleChange = (event) => {
        setSearchStr(event.target.value)
    }

    const handleSelectChange = (event) => {
        setSearchCol(event.target.value)
    }

    const handleSubmit = async () => {
        fetchData()
    }


    const fetchData = async () => {
        let username = Cookies.get("username")
        console.log(username)
        let savedRecipesOnly = "false"
        if (props.scope == "user") {
            savedRecipesOnly = "true"
        }
        fetch(apiurl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "column": searchCol, "key": searchStr, "filter": searchFilter, "offset": recipeOffset, "savedRecipesOnly": savedRecipesOnly, "username": username }),
        })
            .then(response => response.json())
            .then(data => {
                props.updatedata(data["list"])
            })
    }

    return (
        <>
            <div className="p-2 d-flex flex-row search--div">
                <select class="search--criteria rounded" value={searchCol} onChange={handleSelectChange}>
                    <option className="option--div" value="name">Search by Name</option>
                    <option className="option--div" value="author">Search by Author</option>
                    <option className="option--div" value="site_name">Search by Website</option>
                </select>
                <input className="p-2 rounded flex-column search--input" type="text" onChange={handleChange}></input>
                <div className="flex-column rounded p-2 search--btn" role="button" onClick={handleSubmit}>Search</div>
            </div>
        </>
    )
}

export default Search