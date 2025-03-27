import { Navigate, Route, Routes } from "react-router-dom"
import LoginForm from "../../Components/LoginForm/LoginForm"
import SignUpForm from "../../Components/SignUpForm/SignUpForm"
import Header from "../../Components/Header/Header"
import ApiRoute from "./ApiRoute"
import AdminRouter from "./AdminRouter"

const Router = () => {
    return (
        <div>
            <Routes>
                <Route path="/login" element={<LoginForm />}></Route>
                <Route path="/signup" element={<SignUpForm />}></Route>
                <Route path="/admin/*" element={<AdminRouter />}></Route>
                <Route path="*" element={<ApiRoute />}></Route>
            </Routes>
        </div>
    )
}

export default Router