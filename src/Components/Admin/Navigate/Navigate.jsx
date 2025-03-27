import FoodBankIcon from '@mui/icons-material/FoodBank';
import GroupIcon from '@mui/icons-material/Group';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';

const menu = [
    { title: "Trang chủ", icon: <HomeIcon />, navigate: "/admin/" },
    { title: "Danh sách món ăn", icon: <FoodBankIcon />, navigate: "/admin/food" },
    { title: "Danh sách nhân viên", icon: <GroupIcon />, navigate: "/admin/employee" },
    { title: "Hàng tồn", icon: <AccountBalanceIcon />, navigate: "/admin/product" },
    { title: "Doanh thu", icon: < AttachMoneyIcon />, navigate: "/admin/revenue" },

]


const Navigate = () => {
    const navigate = useNavigate()
    const [menuActive, setMenuActive] = useState(menu[0].title)
    const location = useLocation()

    useEffect(() => {
        const title = location.pathname.split("/")
        
        if (title.length === 1) {
            setMenuActive("")
        }
        else {
            setMenuActive(title[2])
        }
        
    }, [location.pathname])

    
    const handleNavigate = (url, title) => {
        navigate(url)
    }

    return (
        <div className="h-[100vh] bg-[#363636] p-5">
            <div className='space-y-7'>
                {
                    menu.map((item, index) => (
                        <div onClick={() => handleNavigate(item.navigate, item.title)} key={index}
                            className={`flex text-white items-center space-x-2 text-lg border-b 
                            cursor-pointer hover:opacity-70 active:opacity-50 ${"/admin/"+menuActive === item.navigate ? 'font-semibold' : 'opacity-80'}`}>
                            <p>{item.icon}</p>
                            <p>{item.title}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Navigate