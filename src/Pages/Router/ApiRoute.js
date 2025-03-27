import { Route, Routes } from "react-router-dom"
import Header from "../../Components/Header/Header"
import HomePage from "../../Components/HomePage/HomePage"

const ApiRoute = ()=>{
    return(
        <div>
            <div>
                <Header />
            </div>
            <Routes>
                <Route path="/" element={<HomePage />}></Route>
            </Routes>
        </div>
    )
}

export default ApiRoute