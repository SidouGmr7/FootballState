import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css"
import Footer from "./Components/Layout/Footer"
import Navbar from "./Components/Layout/Navbar"
import AddPlayer from "./Pages/AddPlayer"
import Home from "./Pages/Home"
import { TableContainerCustom as TableContainer } from "./Pages/TableContainerCustom"
import { nationalColumn, equipeColumn } from "./data/ColumnsData"
import { teamData } from "./data/RowData"

function App() {
    return (
        <div className='overflow-hidden'>
            <Router>
                <Navbar />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route
                        path='/national'
                        element={<TableContainer column={nationalColumn} />}
                    />
                    <Route
                        path='/team'
                        element={<TableContainer column={equipeColumn} selectData={teamData} />}
                    />
                    <Route path='/add' element={<AddPlayer />} />
                </Routes>
                <Footer />
            </Router>
        </div>
    )
}

export default App
