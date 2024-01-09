import { DeleteAccountProps } from "@/interfaces";
import axios from "axios";
import { useState } from "react";

const DeleteAccount: React.FC<DeleteAccountProps> = ({ setTabs, userName, navigate }) => {

    const [responseError, setResponseError] = useState<string>('')

    const handleDelete = () => {
        axios.put('http://immutable858-001-site1.atempurl.com/api/ApplicationUser/DeleteUser',
            { userName },
        )
            .then(function (response) {
                navigate('/')
                navigate(0)
                localStorage.removeItem('userLogin')
                localStorage.removeItem('userId')
                localStorage.removeItem('userJwtToken')
            })
            .catch(function (error) {
                setResponseError(error.response.data.Message)
            });
    }
    return (
        <div className="h-full flex flex-col justify-center gap-4">
            <p className="text-xl">Are you sure to delete you account?</p>
            {responseError?.length > 0 && <span className="text-red-600">{responseError}</span>}
            <div className="grid grid-cols-2 gap-2 mt-2">
                <button onClick={handleDelete} type='submit' className='text-white w-full bg-blue-600 rounded px-8 py-1 text-lg font-medium hover:bg-blue-700 duration-300'>Delete</button>
                <button type='button'
                    onClick={() => {
                        setTabs('details')
                    }} className='text-white w-full bg-red-600 rounded px-8 py-1 text-lg font-medium hover:bg-red-700 duration-300'>Cancel</button>
            </div>
        </div>
    )
}

export default DeleteAccount
