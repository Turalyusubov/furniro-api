import { UpdateUserProps } from "@/interfaces";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from 'yup'


const UpdateUser: React.FC<UpdateUserProps> = ({ userId, userLogin, navigate, setTabs }) => {

    const [responseError, setResponseError] = useState<string>('')

    const validateSchema = Yup.object().shape({
        userName: Yup.string()
            .required("This field is required")
            .min(5, "Username must be more than 5 symbols")
            .max(50, "Username must be less than 50 symbols"),
        firstName: Yup.string()
            .required("This field is required")
            .max(50, "Username must be less than 50 symbols"),
        lastName: Yup.string()
            .required("This field is required")
            .max(50, "Username must be less than 50 symbols"),
        email: Yup.string()
            .email("Please enter a valid email")
            .required("This field is required")
            .max(50, "Username must be less than 50 symbols"),
    });

    const { handleChange, errors, values, handleSubmit, setValues, handleBlur } = useFormik({
        initialValues: {
            id: userId,
            userName: userLogin && userLogin.userName,
            firstName: userLogin && userLogin.firstName,
            lastName: userLogin && userLogin.lastName,
            email: userLogin && userLogin.email,
        },
        validationSchema: validateSchema,
        onSubmit: () => {
            axios.put('http://immutable858-001-site1.atempurl.com/api/ApplicationUser/UpdateUser',
                values,

            )
                .then(function (response) {
                    navigate(0)
                    setResponseError('')
                })
                .catch(function (error) {
                    setResponseError(error.response.data)
                });
        },
    });

    useEffect(() => {
        if (userLogin && userId) {
            setValues({
                id: userId,
                userName: userLogin.userName,
                firstName: userLogin.firstName,
                lastName: userLogin.lastName,
                email: userLogin.email,
            })
        }
    }, [userLogin, setValues, userId])

    return (
        <form onSubmit={handleSubmit} className="text-lg flex flex-col gap-2">
            <div className="">
                <div className="flex gap-2 ">
                    <span className='font-semibold w-6/12'>Username:</span>
                    <input
                        onBlur={handleBlur}
                        onChange={handleChange}
                        className='border px-3 w-full rounded'
                        value={values.userName || ''} type="text"
                        name='userName'
                        placeholder='Username' />
                </div>
                {errors.userName && <span className="text-red-600">{String(errors.userName)}</span>}
            </div>
            <div className="">
                <div className="flex gap-2 relative">
                    <span className='font-semibold w-6/12'>First Name:</span>
                    <input
                        onBlur={handleBlur}
                        onChange={handleChange}
                        className='border px-3 w-full rounded'
                        value={values.firstName || ''} type="text"
                        name='firstName'
                        placeholder='First Name' />
                </div>
                {errors.firstName && <span className="text-red-600">{String(errors.firstName)}</span>}
            </div>
            <div className="">
                <div className="flex gap-2">
                    <span className='font-semibold w-6/12'>Last Name:</span>
                    <input
                        onBlur={handleBlur}
                        onChange={handleChange}
                        className='border px-3 w-full rounded'
                        value={values.lastName || ''} type="text"
                        name='lastName'
                        placeholder='Last Name' />
                </div>
                {errors.lastName && <span className="text-red-600">{String(errors.lastName)}</span>}
            </div>
            <div className="">
                <div className="flex gap-2">
                    <span className='font-semibold w-6/12'>Email:</span>
                    <input
                        onBlur={handleBlur}
                        onChange={handleChange}
                        className='border px-3 w-full rounded'
                        value={values.email || ''} type="email"
                        name='email'
                        placeholder='Email' />
                </div>
                {errors.email && <span className="text-red-600">{String(errors.email)}</span>}
            </div>
            {responseError?.length > 0 && <span className='text-red-600'>{responseError}</span>}
            <div className="grid grid-cols-2 gap-2 mt-2">
                <button type='submit' className='text-white w-full bg-blue-600 rounded px-8 py-1 text-lg font-medium hover:bg-blue-700 duration-300'>Save</button>
                <button type='button'
                    onClick={() => {
                        setTabs('details')
                        setResponseError('')
                    }} className='text-white w-full bg-red-600 rounded px-8 py-1 text-lg font-medium hover:bg-red-700 duration-300'>Cancel</button>
            </div>
        </form>
    )
}

export default UpdateUser