import '../Styles/Search.css'
import { useState, useEffect } from 'react'
import Cookies from "js-cookie"

const Search = (props) => {

    const [recipeOffset, setRecipeOffset] = useState(0)
    const [searchStr, setSearchStr] = useState("")
    const [authorStr, setAuthorStr] = useState("")
    const [websiteStr, setWebsiteStr] = useState("")
    const [cuisineStr, setCuisineStr] = useState("")
    const [categoryStr, setCategoryStr] = useState("")
    const [filterPrompt, setFilterPrompt] = useState(false)



    const apiurl = "http://localhost:5000/fetch-data"

    useEffect(() => {
        fetchData()
    }, [])

    const handleSearchChange = (event) => {
        setSearchStr(event.target.value)
    }

    const handleAuthorChange = (event) => {
        setAuthorStr(event.target.value)
    }

    const handleWebsiteChange = (event) => {
        setWebsiteStr(event.target.value)
    }

    const handleCuisineChange = (event) => {
        setCuisineStr(event.target.value)
    }

    const handleCategoryChange = (event) => {
        setCategoryStr(event.target.value)
    }

    const toggleFilters = () => {
        setFilterPrompt(!filterPrompt)
    }

    const handleSubmit = async () => {
        fetchData()
    }


    const fetchData = async () => {
        let username = Cookies.get("username")
        let savedRecipesOnly = "false"
        if (props.scope == "user") {
            savedRecipesOnly = "true"
        }
        console.log(authorStr)
        fetch(apiurl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "name": searchStr, "author": authorStr, "site_name": websiteStr, "cuisine": cuisineStr, "category": categoryStr, "username": username, "savedRecipesOnly": savedRecipesOnly, "offset": recipeOffset}),
        })
            .then(response => response.json())
            .then(data => {
                props.updatedata(data)
            })
    }

    return (
        <>
            {
                filterPrompt && (
                    <div className="d-flex flex-column filter--prompt rounded">
                        <div className="d-flex flex-row align-items-center justify-content-center mb-5">
                            <div className="d-flex flex-column me-5 fw-bold">Enter in the search criteria you would like to use and press save!</div>
                            <div role="button" onClick={toggleFilters} className="d-flex flex-column text-center rounded p-1 search--btn">Save and Close</div>
                        </div>
                        <div className="d-flex flex-row align-items-center justify-content-center mb-3">
                            <label className="d-flex flex-column me-3">Author</label>
                            <input value={authorStr} onChange={handleAuthorChange} className="d-flex flex-column rounded" type="text" />
                            <div role="button" onClick={() => setAuthorStr("")} className="text-danger ms-2">Clear</div>
                        </div>
                        <div className="d-flex flex-row align-items-center justify-content-center mb-3">
                            <label className="d-flex flex-column me-3">Website</label>
                            <input value={websiteStr} onChange={handleWebsiteChange} className="d-flex flex-column rounded" type="text" />
                            <div role="button" onClick={() => setWebsiteStr("")} className="text-danger ms-2">Clear</div>
                        </div>
                        <div className="d-flex flex-row align-items-center justify-content-center mb-3">
                            <label className="d-flex flex-column me-3">Cuisine</label>
                            <input value={cuisineStr} onChange={handleCuisineChange} className="d-flex flex-column rounded" type="text" />
                            <div role="button" onClick={() => setCuisineStr("")} className="text-danger ms-2">Clear</div>
                        </div>
                        <div className="d-flex flex-row align-items-center justify-content-center">
                            <label className="d-flex flex-column me-3">Category</label>
                            <input value={categoryStr} onChange={handleCategoryChange} className="d-flex flex-column rounded" type="text" />
                            <div role="button" onClick={() => setCategoryStr("")} className="text-danger ms-2">Clear</div>
                        </div>
                    </div>
                )
            }
            {
                !filterPrompt && (
                    <div className="p-2 d-flex flex-row search--div">
                        <div className="flex-column rounded p-2 search--btn me-2" role="button" onClick={toggleFilters}>Toggle Filters</div>
                        <input className="p-2 rounded flex-column search--input" type="text" onChange={handleSearchChange}></input>
                        <div className="flex-column rounded p-2 search--btn" role="button" onClick={handleSubmit}>Search</div>
                    </div>
                )
            }
        </>
    )
}

export default Search