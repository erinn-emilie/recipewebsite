import Cookies from "js-cookie"
import { useState, useEffect, useContext } from 'react'
import '../Styles/AccountPage.css'
import PromptContext from '../Context/PromptContext'



const AccountPage = () => {

    const [username, setUsername] = useState(Cookies.get("username"))
    const [email, setEmail] = useState(Cookies.get("email"))
    const [otherKitchenMembers, setOtherKitchenMembers] = useState([])
    const [primaryMember, setPrimaryMember] = useState("")
    const [numMembers, setNumMembers] = useState(1)
    const [addUserInput, setAddUserInput] = useState(false)
    const [addUserStr, setAddUserStr] = useState("")

    const [messages, setMessages] = useState([])
    const [messageSenders, setMessageSenders] = useState([])

    const apiurl = "http://localhost:5000/"

    const promptToken = useContext(PromptContext)

    const addUserCodes = {
        "INVALUSER": 0,
        "FULLKITCHEN": 1,
        "USERINKITCHEN": 2,
        "SUCCESS": 3,
        "FAILURE": 4
    }



    useEffect(() => {
        handleFetch()
        handleFetchMessages()
    }, [])

    const handleAddUserChange = (event) => {
        setAddUserStr(event.target.value)
    }

    const deleteUser = (username) => {

    }

    const addUser = async () => {
        setAddUserInput(false)
        let url = apiurl + "add-user-to-kitchen"
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "sendingUser": username, "recievingUser": addUserStr }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.message == addUserCodes["SUCCESS"]) {
                    promptToken.openPrompt("The invite has been sent to " + addUserStr + "!")
                }
                else if (data.message == addUserCodes["INVALUSER"]) {
                    promptToken.openPrompt("Hmmmm it looks like that user doesn't exist. Maybe a typo?")
                }
                else if (data.message == addUserCodes["USERINKITCHEN"]) {
                    promptToken.openPrompt("It looks like that user is already in a kitchen with other users!")
                }
                else {
                    promptToken.openPrompt("Something went wrong.... Please try again later!")
                }
            })
    }

    const acceptInvite = async (inviteusername) => {
        let url = apiurl + "accept-invite"
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "inviteusername": inviteusername, "acceptingusername": username}),
        })
            .then(response => response.json())
            .then(data => {
                if (data.message == "SUCCESS") {
                    promptToken.openPrompt("Welcome to your new kitchen!")
                }
                else {
                    promptToken.openPrompt("Something went wrong..")
                }
            })
    }



    const handleFetch = async () => {
        let url = apiurl + "get-kitchen-info"
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "username": username }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.message == "SUCCESS") {
                    setOtherKitchenMembers(data.members)
                    setPrimaryMember(data.primary)
                    setNumMembers(data.num_members)
                }
                else {
                    // AHHHH
                }
            })
    }

    const handleFetchMessages = async () => {
        let url = apiurl + "find-messages"
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "username": username }),
        })
            .then(response => response.json())
            .then(data => {
                setMessages(data.messages)
                setMessageSenders(data.from)
            })
    }

    return (
        <>
            {
                messages?.length > 0 && (
                    <div className="messages--div rounded">
                        {
                            messages.map((message, index) => (
                                <>
                                    {
                                        message == "INVITE" && (
                                            <>
                                                <div className="">You have been <span className="ms-1 me-1 fw-bold">invited</span> to join <span className="ms-1 me-1 fw-bold">{messageSenders[index]}'s </span>kitchen!</div>
                                                <div className="d-flex flex-row justify-content-center align-items-center">
                                                    <div role="button" onClick={() => acceptInvite(messageSenders[index])} className="d-flex flex-column me-3 sub-btn rounded fw-bold">Accept</div>
                                                    <div role="button" className="d-flex flex-column rounded cls-btn">Decline</div>
                                                </div>
                                            </>
                                        )
                                    }
                                </>
                            ))
                        }
                    </div>
                )
            }
            <div className="account--container container-fluid d-flex flex-row">
                <div className="d-flex flex-column align-items-center">
                    <div className="d-flex flex-row">
                        <div className="d-flex flex-column fw-bold">Username:</div>
                        <div className="d-flex flex-column ms-3">{username}</div>
                    </div>
                    <div className="d-flex flex-row">
                        <div className="d-flex flex-column fw-bold">Email:</div>
                        <div className="d-flex flex-column ms-3">{email}</div>
                    </div>
                    <div className="d-flex flex-row">
                        {
                            primaryMember == username && (
                                <div className="d-flex flex-column align-items-center">
                                    <div className="d-flex flex-row fw-bold mt-3">Members of your kitchen:</div>
                                    {
                                        otherKitchenMembers.map((member) => (
                                            <div className="d-flex flex-row">
                                                <div className="d-flex flex-column">{member}</div>
                                                <div role="button" onClick={() => deleteUser(member)} className="d-flex flex-column">X</div>
                                            </div>
                                        ))
                                    }
                                    {
                                        numMembers == 1 && (
                                            <>
                                                {
                                                    !addUserInput && (
                                                        <div className="d-flex flex-row">Your kitchen is empty! Want to invite someone over? <span role="button" onClick={() => setAddUserInput(true)} className="ms-2 fw-bold">Click Here!</span></div>
                                                    )
                                                }
                                                {
                                                    addUserInput && (
                                                        <>
                                                            <div className="d-flex flex-column align-items-center">
                                                                <label className="d-flex flex-row">Enter the username of the person you'd like to add!</label>
                                                                <div className="d-flex flex-row">
                                                                    <input onChange={handleAddUserChange} className="d-flex flex-column" type="text"></input>
                                                                    <div role="button" onClick={() => addUser()} className="sub-btn rounded d-flex flex-column ms-3 fw-bold">Submit</div>
                                                                </div>
                                                            </div>
                                                            <div role="button" className="d-flex flex-row mt-2 cls-btn rounded fw-bold" onClick={() => setAddUserInput(false)} >Close</div>
                                                        </>
                                                    )
                                                }
                                            </>
                                        )
                                    }
                                    {
                                        numMembers == 6 && (
                                            <div className="d-flex flex-row">Your kitchen is full!</div>
                                        )
                                    }
                                </div>

                            )
                        }
                        {
                            primaryMember != username && (
                                <div className="d-flex flex-column align-items-center">
                                    <div className="d-flex flex-row fw-bold mt-3">You are in the kitchen of {primaryMember}!</div>
                                </div>
                            )
                        }
                    </div>
                    <div className="d-flex flex-row"></div>
                </div>
            </div>
        </>
    )
}

export default AccountPage