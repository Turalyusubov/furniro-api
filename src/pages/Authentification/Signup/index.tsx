import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { SignupProps } from "../../../interfaces"
import { useState } from "react";
import Open from '../../../assets/img/password/openeye.png'
import Close from '../../../assets/img/password/closeeye.png'
import { toast } from "react-toastify";

const Signup: React.FC<SignupProps> = ({ setIsLogin }) => {

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [responseError, setResponseError] = useState<string>('')

    const validateSchema = Yup.object().shape({
        userName: Yup.string()
            .required("This field is required")
            .min(5, "Username must be more than 5 symbols")
            .max(50, "Username must be less than 50 symbols"),
        firstName: Yup.string()
            .required("This field is required")
            .max(50, "First Name must be less than 50 symbols"),
        lastName: Yup.string()
            .required("This field is required")
            .max(50, "Last Name must be less than 50 symbols"),
        email: Yup.string()
            .email("Please enter a valid email")
            .required("This field is required")
            .max(50, "Email must be less than 50 symbols"),
        password: Yup.string()
            .required("This field is required")
            .min(8, "Password must be 8 or more characters")
            .matches(/(?=.*[a-z])(?=.*[A-Z])\w+/, "Password ahould contain at least one uppercase and lowercase character")
            .matches(/\d/, "Password should contain at least one number")
            .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, "Password should contain at least one special character"),
    });

    const { handleChange, errors, values, handleSubmit, resetForm, handleBlur } = useFormik({
        initialValues: {
            userName: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            roleId: 2,
            isActive: true
        },
        validationSchema: validateSchema,
        onSubmit: () => {
            console.log(values)
            axios.post('http://immutable858-001-site1.atempurl.com/api/ApplicationUser/CreateUser', values)
                .then(function (response) {
                    console.log('response', response);
                    setIsLogin(true)
                    setResponseError('')
                    resetForm()
                    toast.success('You registered successfully!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                })
                .catch(function (error) {
                    console.log('error', error.response.data.Message);
                    setResponseError(error.response.data.Message)
                });
        },
    });

    return (
        <>
            <h2 className='font-semibold text-3xl mb-6 text-center'>Signup</h2>
            <div className="border flex flex-col justify-between min-h-[60vh] rounded-xl p-4 lg:px-8 lg:pt-10 pb-4">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="sm:grid grid-cols-2 gap-6">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col text-sm">
                                <label className='font-semibold mb-1' htmlFor="userNameSignup">Username</label>
                                <input
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.userName}
                                    className='border rounded p-2'
                                    placeholder='Type your username'
                                    id='userNameSignup'
                                    name="userName"
                                    type="text" />
                                {errors.userName && <span className="text-red-600">{errors.userName}</span>}
                            </div>
                            <div className="flex flex-col text-sm">
                                <label className=' font-semibold mb-1' htmlFor="firstName">First Name</label>
                                <input
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.firstName}
                                    className='border rounded p-2'
                                    placeholder='Type your first name'
                                    id='firstName'
                                    name="firstName"
                                    type="text" />
                                {errors.firstName && <span className="text-red-600">{errors.firstName}</span>}
                            </div>
                            <div className="flex flex-col text-sm">
                                <label className=' font-semibold mb-1' htmlFor="lastName">Last Name</label>
                                <input
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.lastName}
                                    className='border rounded p-2'
                                    placeholder='Type your last name'
                                    id='lastName'
                                    name="lastName"
                                    type="text" />
                                {errors.lastName && <span className="text-red-600">{errors.lastName}</span>}
                            </div>
                        </div>
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col text-sm">
                                <label className=' font-semibold mb-1' htmlFor="email">Email</label>
                                <input
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.email}
                                    className='border rounded p-2'
                                    placeholder='Type your email'
                                    id='email'
                                    name="email"
                                    type="email" />
                                {errors.email && <span className="text-red-600">{errors.email}</span>}
                            </div>
                            <div className="flex flex-col text-sm relative">
                                <label className=' font-semibold mb-1' htmlFor="passwordSignup">Password</label>
                                <input
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.password}
                                    className='border rounded p-2 pr-10'
                                    placeholder='Type your password'
                                    id='passwordSignup'
                                    name="password"
                                    type={showPassword ? "text" : "password"} />
                                <span className="opacity-50 cursor-pointer" onClick={() => setShowPassword(prev => !prev)}>{showPassword ? <img className="w-6 absolute right-2 top-8" src={Close} alt="eye" /> : <img className="w-6 absolute right-2 top-9" src={Open} alt="eye" />}</span>
                                {errors.password && <span className="text-red-600">{errors.password}</span>}
                            </div>
                        </div>
                    </div>
                    {responseError.length > 0 && <span className="text-red-600">{responseError}</span>}
                    <button type="submit" className='bg-ochre border font-semibold border-ochre hover:bg-white hover:text-ochre duration-300 text-white p-2 rounded'>Sign up</button>
                </form>
                <div className="flex flex-col text-center text-xs text-neutral-400">
                    <span>Already have an account?</span>
                    <span onClick={() => setIsLogin(true)} className='text-ochre cursor-pointer'>Login</span>
                </div>
            </div>
        </>
    )
}

export default Signup
