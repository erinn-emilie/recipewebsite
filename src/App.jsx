import { Route, Routes } from 'react-router-dom'
import Navbar from './Components/NavBar'
import HomePage from './Pages/HomePage'
import RecipeDatabasePage from './Pages/RecipeDatabasePage'
import PortalPage from './Pages/PortalPage'
import KitchenPage from './Pages/KitchenPage'
import { useState } from 'react'
import AuthContext from './Context/AuthContext'



function App() {

    const [authValue, setAuthValue] = useState("false")

    const updateAuth = (newvalue) => {
        setAuthValue(newvalue)
    }

    return (
        <>
            <AuthContext.Provider value={{authValue, updateAuth} }>
                <Navbar />
                <div>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/recipes" element={<RecipeDatabasePage />} />
                        <Route path="/portal" element={<PortalPage />} />
                        <Route path="/kitchen" element={<KitchenPage/> }></Route>
                    </Routes>
                </div>
            </AuthContext.Provider>
        </>

    )
}

export default App