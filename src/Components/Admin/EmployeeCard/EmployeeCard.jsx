import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import EditLocationIcon from '@mui/icons-material/EditLocation';

const EmployeeCard = ({emp}) => {
    return (
        <div className="border p-5">
            <div>
                <div className="flex items-center space-x-3">
                    <img src="https://th.bing.com/th/id/OIP.LZwo3IXK2fmvq3X_SjcLRgHaE8?rs=1&pid=ImgDetMain" className="w-[5rem] h-[5rem] rounded-full" alt="" />
                    <div className="text-left">
                        <p>Name: {emp.fullName}</p>
                        <p>Position: {emp.role}</p>
                    </div>
                </div>
                <div className="shadow-md text-left p-5">
                    <p> <LocalPhoneIcon />{emp.phone}</p>
                    <p> <EmailIcon />{emp.email}</p>
                    <p> <EditLocationIcon />{emp.address}</p>

                </div>

            </div>
        </div>
    )
}

export default EmployeeCard