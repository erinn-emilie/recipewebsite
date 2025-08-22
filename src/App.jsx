import { Route, Routes } from 'react-router-dom'
import Navbar from './Components/NavBar'
import HomePage from './Pages/HomePage'
import RecipeBookPage from './Pages/RecipeBookPage'

function App() {
    return (
        <>
            <Navbar />
            <div>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/recipes" element={<RecipeBookPage />} />
                </Routes>
            </div>
        </>

    )
}

export default App