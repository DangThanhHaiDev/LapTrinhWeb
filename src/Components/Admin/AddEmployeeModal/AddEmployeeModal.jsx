import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function AddEmployeeModal({ isOpen, handleClose }) {

    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [passwd, setpasswd] = useState("")
    const [pos, setPos] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [isSuccess, setIsuccess] = useState(false)

    const [err, setErr] = useState("")



    const setState = (value, callback) => {
        callback(value)
    }

    const handleAddEmployee = async () => {
        setErr("")
        setIsuccess(false)
        if (!validateInfor()) {
            return
        }
        try {
            const response = await axios.post("http://localhost:5248/api/User/add", {
                fullName: name,
                phone,
                email,
                address,
                password: passwd,
                role: pos
            })  
           
            
            if (response.data.success === 0) {
                setErr("Tài khoản này đã tồn tại")
                return
            }
            setIsuccess(true)
            resetForm()
        } catch (error) {
            setErr("Tài khoản này đã tồn tại")

        }
    }

    const validateInfor = () => {
        if (!name.trim() || !pos.trim() || !address.trim()) {
            setErr("Vui lòng điền đầy đủ thông tin")
            return false
        }
        if (!isValidPhoneNumber()) {
            setErr("Số điện thoại không hợp lệ")
            return false
        }
        if (!isValidPassword()) {
            setErr("Password phải từ 8 ký tự trở lên")
            return false
        }
        if (!isValidEmail()) {
            setErr("Email không hợp lệ")
            return false
        }
        return true
    }

    const isValidPhoneNumber = () => {
        const regex = /^0\d{9}$/;
        return regex.test(phone);
    }

    const isValidPassword = () => {
        return /^.{8,}$/.test(passwd); // Ít nhất 8 ký tự
    }

    const isValidEmail = () => {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    }

    const resetForm = () => {
        setName("")
        setPhone("")
        setAddress("")
        setEmail("")
        setPos("")
        setpasswd("")
        setErr("")
        setIsuccess(false)
    }

    const handleCloseModal = ()=>{
        resetForm()
        handleClose()
    }


    return (
        <div>
            <Modal
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h1 className='text-xl font-semibold'>Thông tin nhân viên</h1>
                    <div className='mt-5 space-y-3'>

                        <TextField label="Tên nhân viên" value={name} onChange={e => setState(e.target.value, setName)} fullWidth />
                        <TextField label="Số điện thoại" value={phone} fullWidth onChange={e => setState(e.target.value, setPhone)} />
                        <TextField label="Mật khẩu" value={passwd} fullWidth onChange={e => setState(e.target.value, setpasswd)} />
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">Vị trí</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                onChange={(e) => setState(e.target.value, setPos)}
                            >
                                <FormControlLabel value="Owner" control={<Radio />} label="Ông chủ" />
                                <FormControlLabel value="Manager" control={<Radio />} label="Quản lý" />
                                <FormControlLabel value="Staff" control={<Radio />} label="Nhân viên" />

                            </RadioGroup>
                        </FormControl>
                        <TextField label="Email" value={email} fullWidth onChange={e => setState(e.target.value, setEmail)} />
                        <TextField label="Địa chỉ" value={address} fullWidth onChange={e => setState(e.target.value, setAddress)} />
                    </div>
                    <div>
                        {err && <p className='text-red-700'>{err}</p>}
                        {isSuccess && <p className='text-green-700'>Tài khoản đã được tạo thành công</p>}
                    </div>
                    <div className='text-right mt-3 space-x-2'>
                        <Button variant='contained' sx={{ backgroundColor: "red" }} onClick={handleCloseModal}>Hủy</Button>
                        <Button variant='contained' sx={{ backgroundColor: "blue" }} onClick={handleAddEmployee}>Thêm</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}