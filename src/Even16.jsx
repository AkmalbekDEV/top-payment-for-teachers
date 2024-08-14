import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
    useToast
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const Even16 = () => {
    const [state, setState] = useState([])
    const [name, setName] = useState("")
    const toast = useToast()
    const autoRender = ""

    const getData = async () => {
        try {
            const response = await axios.get('https://a67474a4e6e67b1c.mokky.dev/Even_16')
            setState(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    const handleStatus = async (id, status) => {
        try {
            const response = await axios.patch(`https://a67474a4e6e67b1c.mokky.dev/Even_16/${id}`, {
                status: status,
            })
            setState(state.map(item => item.id === id ? { ...item, status: response.data.status } : item));
        } catch (error) {
            console.log(error);
        }
    }

    const handleAdd = (e) => {
        e.preventDefault()

        const postData = async () => {
            try {
                const response = await axios.post('https://a67474a4e6e67b1c.mokky.dev/Even_16', {
                    name,
                    status: false,
                })
                setState([...state, response.data]);
            } catch (error) {
                console.log(error);
            }
        }

        if (name === "") {
            toast({
                title: 'Name is required',
                description: "Please fill the name input and try again",
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
            return;
        }

        postData()
        setName("")
    }

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`https://a67474a4e6e67b1c.mokky.dev/Even_16/${id}`)
            setState(state.filter(item => item.id !== id));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className='mt-36 grid gap-10 max-w-[1250px] mx-auto max-sm:px-5'>
            <h1 className='text-center text-3xl font-medium text-blue-700'>Payments</h1>
            <form onSubmit={handleAdd} className='flex items-center justify-evenly max-sm:gap-5'>
                <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Student's name here..." className='pl-5 text-lg rounded-xl border-2 border-blue-600 py-2 w-[80%] outline-none' />
                <button onClick={handleAdd} className='text-xl max-sm:text-base font-medium px-5 max-sm:px-2 py-3 rounded-xl max-sm:w-[45%] bg-blue-600 text-white transition-all hover:shadow-blue-600 hover:shadow-md active:bg-blue-800'>+ Add Student</button>
            </form>
            {
                state.length ? <table className='w-full border-2 border-blue-800'>
                    <thead className='bg-blue-800 text-white'>
                        <tr>
                            <th className='p-3 text-sm font-semibold tracking-wide text-center'>#</th>
                            <th className='p-3 text-sm font-semibold tracking-wide text-center'>Details</th>
                            <th className='p-3 text-sm font-semibold tracking-wide text-center'>Status</th>
                            <th className='p-3 text-sm font-semibold tracking-wide text-center'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.map((product) => {
                            const truePayment = <h1 className='px-3 py-2 rounded-md bg-[#0bff036c]'>Paid</h1>
                            const falsePayment = <h1 className='px-3 py-2 rounded-md bg-[#ff03036c] w-fit'>Not Paid</h1>
                            const falseBtn = <button className='px-3 py-2 rounded-md bg-red-500 text-white hover:shadow-md hover:shadow-red-500 active:bg-red-800 transition-all max-sm:text-[13.2px]' onClick={() => handleStatus(product.id, false)}>Didn't pay</button>
                            const trueBtn = <button className='px-3 py-2 rounded-md bg-green-500 text-white hover:shadow-md hover:shadow-green-500 active:bg-green-800 transition-all' onClick={() => handleStatus(product.id, true)}>Paid</button>

                            return (
                                <tr key={product.id} className='bg-white border-b-2 border-blue-800'>
                                    <td className='p-3 text-sm text-gray-700 tracking-wide text-center'>{product.id}</td>
                                    <td className='p-3 text-sm text-gray-700 tracking-wide text-center'>{product.name}</td>
                                    <td className='p-3 text-sm text-gray-700 tracking-wide text-center flex justify-center'>{product.status == false ? falsePayment : truePayment}</td>
                                    <td className='p-3 text-sm text-gray-700 tracking-wide text-center'>
                                        <div className='flex justify-center items-center gap-5'>
                                            {product.status == false ? trueBtn : falseBtn}
                                            <button onClick={() => handleDelete(product.id)} className='px-3 py-2 rounded-md bg-red-500 text-white hover:shadow-md hover:shadow-red-500 active:bg-red-800 transition-all'>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table> :
                <h1 className='text-3xl font-medium text-center text-blue-600'>You don't have any students yet, add someone!</h1>
            }
        </div>
    )
}

export default Even16