import { ChangePasswordProps } from "@/interfaces";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from 'yup'

const ChangePassword: React.FC<ChangePasswordProps> = ({ userId, navigate, setTabs }) => {

    const [responseError, setResponseError] = useState<string>('')

    const validateSchema = Yup.object().shape({
        currentPassword: Yup.string()
            .required("This field is required")
            .min(8, "Password must be more than 8 symbols")
            .max(50, "Password must be less than 50 symbols"),
        newPassword: Yup.string()
            .required("This field is required")
            .min(8, "Password must be 8 or more characters")
            .matches(/(?=.*[a-z])(?=.*[A-Z])\w+/, "Password ahould contain at least one uppercase and lowercase character")
            .matches(/\d/, "Password should contain at least one number")
            .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, "Password should contain at least one special character"),
        repeatNewPassword: Yup.string()
            .required("This field is required")
            .oneOf([Yup.ref("newPassword")], "Passwords does not match"),
    });

    const { handleChange, errors, values, handleSubmit, resetForm, handleBlur } = useFormik({
        initialValues: {
            id: userId,
            currentPassword: '',
            newPassword: '',
            repeatNewPassword: '',
        },
        validationSchema: validateSchema,
        onSubmit: () => {

            axios.put('http://immutable858-001-site1.atempurl.com/api/ApplicationUser/ChangePassword',
                values,
            )
                .then(function (response) {
                    navigate(0)
                    setResponseError('')
                    resetForm()
                })
                .catch(function (error) {
                    setResponseError(error.response.data.Message)
                });
        },
    });

    return (
        <form onSubmit={handleSubmit} className="text-lg flex flex-col gap-2">
            <div className="">
                <div className="flex gap-2 ">
                    <span className='font-semibold w-11/12'>Current Password:</span>
                    <input
                        onBlur={handleBlur}
                        onChange={handleChange}
                        className='border px-3 w-full rounded'
                        value={values.currentPassword || ''} type="text"
                        name='currentPassword'
                        placeholder='Current Password' />
                </div>
                {errors.currentPassword && <span className="text-red-600">{String(errors.currentPassword)}</span>}
            </div>
            <div className="">
                <div className="flex gap-2 relative">
                    <span className='font-semibold w-11/12'>New Password:</span>
                    <input
                        onBlur={handleBlur}
                        onChange={handleChange}
                        className='border px-3 w-full rounded'
                        value={values.newPassword || ''} type="text"
                        name='newPassword'
                        placeholder='New Password' />
                </div>
                {errors.newPassword && <span className="text-red-600">{String(errors.newPassword)}</span>}
            </div>
            <div className="">
                <div className="flex gap-2">
                    <span className='font-semibold w-11/12'>Repeat New Password:</span>
                    <input
                        onBlur={handleBlur}
                        onChange={handleChange}
                        className='border px-3 w-full rounded'
                        value={values.repeatNewPassword || ''} type="text"
                        name='repeatNewPassword'
                        placeholder='Repeat New Password' />
                </div>
                {errors.repeatNewPassword && <span className="text-red-600">{String(errors.repeatNewPassword)}</span>}
            </div>
            {responseError?.length > 0 && <span className='text-red-600'>{responseError}</span>}
            <div className="grid grid-cols-2 gap-2 mt-2">
                <button type='submit' className='text-white w-full bg-blue-600 rounded px-8 py-1 text-lg font-medium hover:bg-blue-700 duration-300'>Change</button>
                <button type='button'
                    onClick={() => {
                        setTabs('details')
                        setResponseError('')
                    }} className='text-white w-full bg-red-600 rounded px-8 py-1 text-lg font-medium hover:bg-red-700 duration-300'>Cancel</button>
            </div>
        </form>
    )
}

export default ChangePassword
