import { Avatar, Button } from "@mui/material"
import { useEffect, useState } from "react"
import PasswordChangeModal from "../PasswordChangeModal/PasswordChangeModal"
import axios from "axios"
import url from "../../../config/Config"
import { useNavigate } from "react-router-dom"

const Account = () => {

    const [user, setUser] = useState()
    const [isOpenPasswordChangeModal, setIsOpenPasswordChangeModal] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem("user")) {
            setUser(JSON.parse(localStorage.getItem("user")))
            console.log(JSON.parse(localStorage.getItem("user")));

        }
    }, [])

    const openPasswordChangeModal = ()=>{
        setIsOpenPasswordChangeModal(true)
    }

    const closePasswordChangeModal = ()=>{
        setIsOpenPasswordChangeModal(false)
    }

    const handleConfirmChangePassword = async( password)=>{
        try {
            console.log({password, email:user.email});
            
            const response = await axios.post(`${url}/api/User/Update-password`, {newPassword: password, email:user.email})
            const {data} = response
            console.log(data);
            alert("Bạn đã thay đổi thành công mật khẩu")
        } catch (error) {
            alert("Đã xảy ra lỗi")
        }
        closePasswordChangeModal()
    }


    return (
        <div className="flex">
            <div className="w-[20%] h-[100vh] overflow-hidden bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 flex justify-center">
                <div className="mt-5 p-5 h-full">
                    <Avatar sx={{ width: 200, height: 200 }} src="https://khoinguonsangtao.vn/wp-content/uploads/2022/09/hinh-anh-gai-xinh-viet-nam.jpg">

                    </Avatar>
                    <div className="mt-5 text-white text-left space-y-5">
                        <h1 className=" text-xl font-semibold">Thông tin liên hệ</h1>
                        <p className="mt-2">Họ tên: {user && user.fullName}</p>
                        <p>Số điện thoai: {user && user.phone}</p>
                        <p>Email: {user && user.email}</p>
                        <p>Địa chỉ: {user && user.address}</p>
                    </div>

                </div>


            </div>
            <div className="w-[80%] p-10 text-left">
                <h1 className="text-xl font-semibold text-center">Cửa hàng Nhóm 10 </h1>
                <div className="mt-5">
                    <h1 className="text-xl font-semibold">Thông tin tài khoản</h1>
                    <div className="space-y-3">
                        <p className="text-lg mt-5">ID của bạn: {user && user.userId}</p>
                        <p className="text-lg">Vị trí của bạn hiện tại trong của hàng là: {user && user.role}</p>
                        <p>Tên đăng nhập: {user&&user.phone}</p>
                    </div>
                </div>
                <div className="text-left mt-10 space-x-5">
                    <Button onClick={()=>openPasswordChangeModal()}>Đổi mật khẩu</Button>
                    <Button sx={{color: "red"}} onClick={()=>navigate("/")}>Đăng xuất</Button>

                </div>
            </div>
            <PasswordChangeModal handleClose={closePasswordChangeModal} handConfirmChangePassword={handleConfirmChangePassword} open={isOpenPasswordChangeModal}/>
        </div>
    )
}

export default Account