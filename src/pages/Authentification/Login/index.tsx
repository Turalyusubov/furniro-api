import { LoginProps } from "../../../interfaces"
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import Open from '../../../assets/img/password/openeye.png'
import Close from '../../../assets/img/password/closeeye.png'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login: React.FC<LoginProps> = ({ setIsLogin }) => {

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [_userId, setUserId] = useState<string>(localStorage.getItem('userId') || '')
    const [loginError, setLoginError] = useState('')

    const navigate = useNavigate();

    const validateSchema = Yup.object().shape({
        userName: Yup.string()
            .required("This field is required")
            .min(5, "Username must be more than 5 symbols")
            .max(50, "Username must be less than 50 symbols"),
        password: Yup.string()
            .required("This field is required")
            .min(8, "Pasword must be 8 or more characters")
            .matches(/(?=.*[a-z])(?=.*[A-Z])\w+/, "Password ahould contain at least one uppercase and lowercase character")
            .matches(/\d/, "Password should contain at least one number")
            .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, "Password should contain at least one special character"),
    });

    const { handleChange, errors, values, handleSubmit, resetForm, handleBlur } = useFormik({
        initialValues: {
            userName: '',
            password: '',
        },
        validationSchema: validateSchema,
        onSubmit: (_e) => {
            axios.post('https://immutable858-001-site1.atempurl.com/api/ApplicationUser/Login', values)
                .then(function (response) {
                    localStorage.setItem('userId', JSON.stringify(response.data.userId));
                    localStorage.setItem('userJwtToken', response.data.jwtToken);
                    setUserId(response.data.userId)
                    setLoginError('')
                    navigate('/')
                    navigate(0)
                    resetForm()
                    toast.success('You logged in successfully!', {
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
                    setLoginError(error.response.data.Message)
                });
        },
    });

    return (
        <>
            <h2 className='font-semibold text-3xl mb-6 text-center'>Login</h2>
            <div className="border flex flex-col justify-between min-h-[60vh] rounded-xl p-4 lg:px-8 lg:pt-10 pb-4">
                <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-6">
                    <div className="flex flex-col text-sm">
                        <label className=' font-semibold mb-1' htmlFor="userNameLogin">Username</label>
                        <input
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.userName}
                            name="userName"
                            className='border rounded p-2'
                            placeholder='Type your username'
                            id='userNameLogin'
                            type="text" />
                        {errors.userName && <span className="text-red-600">{errors.userName}</span>}
                    </div>
                    <div className="flex flex-col text-sm relative">
                        <label className='font-semibold mb-1' htmlFor="passwordLogin">Password</label>
                        <input
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            name="password"
                            className='border rounded p-2 pr-10'
                            placeholder='Type your password'
                            id='passwordLogin'
                            type={showPassword ? "text" : "password"} />
                        <span className="opacity-50 cursor-pointer" onClick={() => setShowPassword(prev => !prev)}>{showPassword ? <img className="w-6 absolute right-2 top-8" src={Close} alt="eye" /> : <img className="w-6 absolute right-2 top-9" src={Open} alt="eye" />}</span>
                        {errors.password && <span className="text-red-600">{errors.password}</span>}
                    </div>
                    <div className="text-xs flex justify-between">
                        <div className=" flex items-center gap-1">
                            <input id='remember' type="checkbox" />
                            <label htmlFor="remember">Remember me</label>
                        </div>
                        <span className='cursor-pointer'>Forgot password?</span>
                    </div>
                    {loginError.length > 0 && <span className="text-red-600">{loginError}</span>}
                    <button type="submit" className='bg-ochre border font-semibold border-ochre hover:bg-white hover:text-ochre duration-300 text-white p-2 rounded'>Log in</button>
                </form>
                <div className="flex flex-col text-center text-xs text-neutral-400">
                    <span>Don't have an account?</span>
                    <span onClick={() => setIsLogin(false)} className='text-ochre cursor-pointer'>Signup</span>
                </div>
            </div>
        </>
    )
}

export default Login
