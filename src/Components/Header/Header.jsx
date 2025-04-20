import {
    mdiFoodVariant,
    mdiCup,
    mdiCookie,
    mdiBaguette,
    mdiNoodles,
    mdiHamburger
} from "@mdi/js"
import Icon from "@mdi/react"
import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { getCategory } from "../../GlobalState/Category/Action"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom"
import url from "../../config/Config"

const Header = () => {

    const iconMap = {
        "mdi-food-variant": mdiFoodVariant,
        "mdi-noodles": mdiNoodles,
        "mdi-hamburger": mdiHamburger,
        "mdi-cookie": mdiCookie,
        "mdi-cup": mdiCup,
        "mdi-baguette": mdiBaguette
    };

    const [categories, setCategories] = useState([])
    const [categoryActive, setCategoryActive] = useState(0)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    useEffect(() => {
        getAllCategory()

    }, [])

    const getAllCategory = async () => {
        try {
            const response = await axios.get(`${url}/api/Food/get-all-category`)
            const { data } = response
            setCategories(data)

        } catch (error) {

        }
    }



    const handleOnChangeActiveCategory = (index) => {
        setCategoryActive(index)
        dispatch(getCategory(categories[index].categoryId))
    }


    return (
        <div className="bg-black flex justify-between">
            <div className={"flex justify-between w-[80%] m-auto bg-[#212121] text-white p-5 uppercase items-center"}>
                {
                    categories.length > 0 &&
                    categories.map((category, index) => (
                        <div
                            onClick={() => handleOnChangeActiveCategory(index)}
                            key={index}
                            className="relative flex space-x-2 items-center cursor-pointer hover:opacity-70 active:opacity-50"
                        >
                            <Icon path={iconMap[category.icon] || mdiFoodVariant} color="white" size={1} />
                            <p className="py-2">{category.categoryName}</p>

                            <span
                                className={`absolute bottom-0 left-0 w-full h-[2px] bg-white transition-transform duration-300 origin-left 
                                ${categoryActive === index ? "scale-x-100" : "scale-x-0"}`}
                            ></span>
                        </div>
                    ))

                }
                <div className="flex space-x-2 cursor-pointer hover:opacity-70 active:opacity-50" onClick={()=>navigate("/profile")}>
                    <AccountCircleIcon />
                    <p>Tài khoản</p>
                </div>
            </div>

        </div>
    )
}

export default Header