import '../Styles/Search.css'
import { useState, useEffect } from 'react'
import Cookies from "js-cookie"

const Search = (props) => {

    const [recipeOffset, setRecipeOffset] = useState(0)
    const [searchStr, setSearchStr] = useState("")
    const [searchCol, setSearchCol] = useState("name")



    const apiurl = "http://localhost:5000/"

    useEffect(() => {
        if (props.scope == "database") {
            handleFetchAll()
        }
        if (props.scope == "user") {
            handleFetchUserSaves()
        }
    }, [])

    const handleChange = (event) => {
        setSearchStr(event.target.value)
    }

    const handleSelectChange = (event) => {
        setSearchCol(event.target.value)
    }

    const handleSubmit = async () => {
        if (props.scope == "database") {
            if (searchStr == "") {
                handleFetchAll()
            }
            else {
                handleFetchSome()
            }
        }
        if (props.scope == "user") {
            if (searchStr == "") {
                handleFetchUserSaves()
            }
            else {
                handleFetchSomeUserSaves()
            }
        }
    }


    const handleFetchUserSaves = async () => {
        let username = Cookies.get("username")
        let url = apiurl + "fetch-saved-recipes"
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "username": username }),
        })
            .then(response => response.json())
            .then(data => {
                props.updatedata(data["data"], data["count"])

            })
    }

    const handleFetchSomeUserSaves = async () => {
        let username = Cookies.get("username")
        let url = apiurl + "fetch-certain-saved-recipes"
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "username": username }),
        })
            .then(response => response.json())
            .then(data => {
                props.updatedata(data["data"], data["count"])
            })
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
                props.updatedata(data)
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
            body: JSON.stringify({ "offset": recipeOffset, "username": username }),
        })
            .then(response => response.json())
            .then(data => {
                props.updatedata(data)

            }
            )
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