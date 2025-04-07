import { Button, TextField } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../GlobalState/User/Action";

const LoginForm = () => {
    const [invalidUser, setInvalidUser] = useState(true)
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [isDisplayPassword, setIsDisplayPassword] = useState(false)
    const dispatch = useDispatch()
    const { user, error } = useSelector((state) => state.userReducer)
    const navigate = useNavigate()

    useEffect(() => {
        if(error){
            setInvalidUser(false)
            console.log("Đặng Thành hải");
            
        }

    }, [user, error])

    const loginHandler = async () => {
        setInvalidUser(true)
        try {
            dispatch(login({ phone, password }, navigate))
        } catch (error) {
            setInvalidUser(false)
        }
        
    }

    const handleOnChangePhone = (e) => {
        setPhone(e.target.value)
    }

    const handleOnChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleChangeDisplayPassword = () => {
        setIsDisplayPassword(!isDisplayPassword)
    }

    const handleClickRegister = () => {
        navigate("/signup")
    }

    return (
        <div className="bg-[#f3f9ff] h-[100vh] flex justify-center">
            <div className="w-[450px] m-auto bg-white shadow-lg text-left px-5 py-10">
                <h1 className="text-3xl font-semibold">Sign in</h1>
                <div className="mt-10">
                    <TextField label="Your number phone" fullWidth value={phone} onChange={handleOnChangePhone} />
                </div>
                <div className="mt-5 relative">
                    <TextField label="Your password" fullWidth value={password} onChange={handleOnChangePassword} type={isDisplayPassword ? "text" : "password"} />
                    {
                        !isDisplayPassword ?
                            <VisibilityIcon className="absolute top-[50%] right-5 -translate-y-1/2 cursor-pointer" onClick={handleChangeDisplayPassword} />
                            : <VisibilityOffIcon className="absolute top-[50%] right-5 -translate-y-1/2 cursor-pointer" onClick={handleChangeDisplayPassword} />
                    }
                </div>

                <div className="mt-5">
                    <Button variant="contained" fullWidth onClick={loginHandler}>Login</Button>
                </div>
                {
                    !invalidUser &&
                    <div className="mt-5">
                        <p className="text-red-700">Invalid Username or password</p>
                    </div>
                }

                <div className="mt-5 flex items-center space-x-2">
                    <p>Don't have an account?</p>
                    <p className="text-blue-600 cursor-pointer" onClick={handleClickRegister}>Register now</p>
                </div>
            </div>

        </div>
    )
}

export default LoginForm