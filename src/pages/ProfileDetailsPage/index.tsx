import { useData } from '@/context/AppContext'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import UpdateUser from './UpdateUser'
import ChangePassword from './ChangePassword'
import DeleteAccount from './DeleteAccount'

const ProfileDetailsPage: React.FC = () => {
    const { userLogin, userId } = useData()

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('userLogin')
        localStorage.removeItem('userId')
        localStorage.removeItem('userJwtToken')
        navigate('/')
        navigate(0)
        toast.success('You logged out successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    const [tabs, setTabs] = useState('details')

    if (!userLogin) return <span className='px-20 py-10'>You are not supposed to be here 🤨</span>

    return (
        <div className='px-20 py-10'>
            <div className=" flex flex-col gap-8 w-fit">
                <h2 className='text-4xl'>Profile</h2>
                <div className="flex gap-4 ">
                    <div className="flex flex-col h-full gap-2 text-lg border-r-black border-r-4 pr-4">
                        <button
                            onClick={() => setTabs('details')}
                            className={`${tabs === 'details' ? 'bg-ochre text-white' : ''} px-3 text-start py-1 rounded`}>
                            User Details
                        </button>
                        <button
                            onClick={() => setTabs('update')}
                            className={`${tabs === 'update' ? 'bg-ochre text-white' : ''} px-3 text-start py-1 rounded`}>
                            Update
                        </button>
                        <button
                            onClick={() => setTabs('password')}
                            className={`${tabs === 'password' ? 'bg-ochre text-white' : ''} px-3 text-start py-1 rounded`}>
                            Password
                        </button>
                        <button
                            onClick={() => setTabs('delete')}
                            className={`${tabs === 'delete' ? 'bg-ochre text-white' : ''}  px-3 text-start py-1 rounded`}>
                            Delete
                        </button>
                    </div>
                    <div className="">
                        {
                            tabs === 'update' ?
                                <UpdateUser
                                    navigate={navigate}
                                    userId={userId}
                                    userLogin={userLogin}
                                    setTabs={setTabs}
                                /> : tabs === 'details' ?
                                    <div className="text-lg flex flex-col gap-2">
                                        <div className="flex gap-2">
                                            <span className='font-semibold w-6/12'>Username:</span>
                                            <span>{userLogin.userName}</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <span className='font-semibold w-6/12'>First Name:</span>
                                            <span>{userLogin.firstName}</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <span className='font-semibold w-6/12'>Last Name:</span>
                                            <span>{userLogin.lastName}</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <span className='font-semibold w-6/12'>Email:</span>
                                            <span>{userLogin.email}</span>
                                        </div>
                                        <button onClick={handleLogout} className='text-white w-full bg-red-600 rounded px-8 py-1 text-lg font-medium hover:bg-red-700 duration-300'>Log out</button>
                                    </div> : tabs === 'password' ?
                                        <ChangePassword
                                            navigate={navigate}
                                            userId={userId}
                                            setTabs={setTabs}
                                        /> :
                                        <DeleteAccount
                                            setTabs={setTabs}
                                            userName={userLogin.userName}
                                            navigate={navigate}
                                        />
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileDetailsPage