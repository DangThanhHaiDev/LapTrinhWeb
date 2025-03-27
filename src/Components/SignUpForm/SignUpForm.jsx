import { Button, TextField } from "@mui/material"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const SignUpForm = () => {
    const [invalidUser, setInvalidUser] = useState(true)
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [isValidPhone, setIsValidPhone] = useState(true)
    const [isValidEmail, setIsValidEmail] = useState(true)
    const [isValidPassword, setIsValidPassword] = useState(true)
    const [isSuccess, setIsuccess] = useState(false)
    const navigate = useNavigate()
    const [isDisplayPassword, setIsDisplayPassword] = useState(false)
    const [isExisted, setIsexisted] = useState(false)

    const signupHandler = async () => {
        setInvalidUser(true)
        setIsValidPhone(true)
        setIsValidEmail(true)
        setIsValidPassword(true)
        setIsexisted(false)
        setIsuccess(false)
        if (!phone.trim() || !password.trim() || !fullName.trim() || !email.trim() || !address.trim()) {
            setInvalidUser(false)
            return
        }
        if (!isValidPhoneNumber(phone)) {
            setIsValidPhone(false)
            return
        }
        if (!isValidEmailUser(email)) {
            setIsValidEmail(false)
            return
        }
        if(!isValidPasswordUser(password)){
            setIsValidPassword(false)
            return
        }
        try {
            const response = await axios.post("http://localhost:5248/api/User/add", {phone, fullName, email, address, password, role:"User"})
            console.log(response);
            const {data} = response
            if(data.success === 0){
                setIsexisted(true)
                return
            }
            setIsuccess(true)
        } catch (error) {
            
        }
    }


    const isValidPasswordUser = (password)=> {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    }

    const isValidEmailUser = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    const isValidPhoneNumber = (phone) => {
        const phoneRegex = /^0\d{9}$/;
        return phoneRegex.test(phone);
    }

    const handleOnChangePhone = (e) => {
        setPhone(e.target.value)
    }

    const handleOnChangePassword = (e) => {
        setPassword(e.target.value)
    }
    const handleOnChangeFullName = (e) => {
        setFullName(e.target.value)
    }

    const handleOnChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleOnChangeAddress = (e) => {
        setAddress(e.target.value)
    }

    const handleClickLogin = () => {
        navigate("/login")
    }

    const handleChangeDisplayPassword = () => {
        setIsDisplayPassword(!isDisplayPassword)
    }

    return (
        <div className="bg-[#f3f9ff] h-[100vh] flex justify-center">
            <div className="w-[450px] m-auto bg-white shadow-lg text-left px-5 py-10">
                <h1 className="text-3xl font-semibold">Sign up</h1>
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
                    <TextField label="FullName" fullWidth value={fullName} onChange={handleOnChangeFullName} />
                </div>

                <div className="mt-5">
                    <TextField label="Email" fullWidth value={email} onChange={handleOnChangeEmail} />
                </div>
                <div className="mt-5">
                    <TextField label="Address" fullWidth value={address} onChange={handleOnChangeAddress} />
                </div>
                <div className="mt-5">
                    <Button variant="contained" fullWidth onClick={signupHandler}>sign up</Button>
                </div>
                {
                    !invalidUser &&
                    <div className="mt-5">
                        <p className="text-red-700">Please fill full information</p>
                    </div>
                }
                {
                    !isValidPhone &&
                    <div className="mt-5">
                        <p className="text-red-700">Invalid Phone number</p>
                    </div>
                }
                {
                    !isValidEmail &&
                    <div className="mt-5">
                        <p className="text-red-700">Invalid Email</p>
                    </div>
                }
                {
                    !isValidPassword &&
                    <div className="mt-5">
                        <p className="text-red-700">Invalid Password(8 ký tự, tối thiểu thường, hoa, đặc biệt)</p>
                    </div>
                }
                {
                    isExisted &&
                    <div className="mt-5">
                        <p className="text-red-700">User is Existed</p>
                    </div>
                }
                {
                    isSuccess &&
                    <div className="mt-5">
                        <p className="text-green-600">Created user success, please back to login</p>
                    </div>
                }
                <div className="mt-5 flex items-center space-x-2">
                    <p>I have an account</p>
                    <p className="text-blue-600 cursor-pointer" onClick={handleClickLogin}>Login here</p>
                </div>
            </div>

        </div>
    )
}

export default SignUpForm