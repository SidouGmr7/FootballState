import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css"
import Footer from "./Resource/Layout/Footer"
import Navbar from "./Resource/Layout/Navbar"
import { routes, sliderLink } from "./routes"
import { Dashboard } from "./Pages/Dashboard"

function App() {
    return (
        <div className='overflow-hidden'>
            <Router>
                <Navbar />
                <Routes>
                    {routes.map(({ components, link }, index) => (
                        <Route key={index} path={link} element={components} />
                    ))}
                    <Route path='/app' element={<Dashboard />}>
                        {sliderLink.map(({ components, link }, index) => (
                            <Route key={index} path={link} element={components} />
                        ))}
                    </Route>
                </Routes>
                <Footer />
            </Router>
        </div>
    )
}

export default App
