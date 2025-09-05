import { Route, Routes } from 'react-router-dom'
import Navbar from './Components/NavBar'
import PromptBox from './Components/PromptBox'
import HomePage from './Pages/HomePage'
import RecipeDatabasePage from './Pages/RecipeDatabasePage'
import PortalPage from './Pages/PortalPage'
import AccountPage from './Pages/AccountPage'
import KitchenPage from './Pages/KitchenPage'
import { useState } from 'react'
import AuthContext from './Context/AuthContext'
import PromptContext from './Context/PromptContext'



function App() {

    const [authValue, setAuthValue] = useState("false")
    const [promptState, setPromptState] = useState(false)
    const [promptMessage, setPromptMessage] = useState("")

    const updateAuth = (newvalue) => {
        setAuthValue(newvalue)
    }

    const openPrompt = (message) => {
        setPromptMessage(message)
        setPromptState(true)
    }

    const closePrompt = () => {
        setPromptMessage("")
        setPromptState(false)
    }

    return (
        <>
            <AuthContext.Provider value={{ authValue, updateAuth }}>
                <PromptContext.Provider value={{ openPrompt }}>
                    <Navbar />
                    <div>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/recipes" element={<RecipeDatabasePage />} />
                            <Route path="/portal" element={<PortalPage />} />
                            <Route path="/kitchen" element={<KitchenPage/> }></Route>
                            <Route path="/account" element={<AccountPage/> }></Route>
                        </Routes>
                        {
                            promptState && (
                                <PromptBox message={promptMessage} close={closePrompt}></PromptBox>
                            )
                        }
                    </div>
                </PromptContext.Provider>
            </AuthContext.Provider>
        </>

    )
}

export default App