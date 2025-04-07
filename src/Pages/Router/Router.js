import {  Route, Routes } from "react-router-dom"
import LoginForm from "../../Components/LoginForm/LoginForm"
import SignUpForm from "../../Components/SignUpForm/SignUpForm"
import ApiRoute from "./ApiRoute"
import AdminRouter from "./AdminRouter"
import Account from "../../Components/Admin/Account/Account"

const Router = () => {
    return (
        <div>
            <Routes>
                <Route exact path="/" element={<LoginForm /> }></Route>
                <Route path="/signup" element={<SignUpForm />}></Route>
                <Route path="/admin/*" element={<AdminRouter />}></Route>
                <Route path="/user" element={<ApiRoute />}></Route>
                <Route path="/profile" element={<Account />}></Route>
            </Routes>
        </div>
    )
}

export default Router