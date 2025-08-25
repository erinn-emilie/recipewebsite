import { Route, Routes } from 'react-router-dom'
import Navbar from './Components/NavBar'
import HomePage from './Pages/HomePage'
import RecipeBookPage from './Pages/RecipeBookPage'
import PortalPage from './Pages/PortalPage'
import KitchenPage from './Pages/KitchenPage'

function App() {
    return (
        <>
            <Navbar />
            <div>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/recipes" element={<RecipeBookPage />} />
                    <Route path="/portal" element={<PortalPage />} />
                    <Route path="/kitchen" element={<KitchenPage/> }></Route>
                </Routes>
            </div>
        </>

    )
}

export default App