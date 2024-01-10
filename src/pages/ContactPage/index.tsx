import Adress from '../../assets/icons/contact/adress.svg'
import Phone from '../../assets/icons/contact/phone.svg'
import Clock from '../../assets/icons/contact/clock.svg'

import { PageHeading } from '@/components'
import UpperFooter from '@/layout/UpperFooter'

import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useData } from '@/context/AppContext'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useAxios } from '@/hooks/useAxios'

const ContactPage: React.FC = () => {

    const [userJwtToken, _setEserJwtToken] = useState((localStorage.getItem('userJwtToken')) || '')

    const { userId } = useData()

    const validateSchema = Yup.object().shape({
        name: Yup.string()
            .required("This field is required")
            .max(50, "Name must be less than 50 symbols"),
        email: Yup.string()
            .email("Please enter a valid email")
            .required("This field is required")
            .max(50, "Username must be less than 50 symbols"),
        subject: Yup.string()
            .required("This field is required")
            .max(50, "Subject must be less than 50 symbols"),
        message: Yup.string()
            .required("This field is required")
            .max(256, "Message must be less than 256 symbols"),
    });

    const [loading, data, error, _request] = useAxios<any>({ method: 'GET', url: `http://immutable858-001-site1.atempurl.com/api/Contact` }, false, ['/contact']);

    const { handleChange, errors, values, handleSubmit, resetForm, handleBlur } = useFormik({
        initialValues: {
            userId: Number(userId),
            name: '',
            email: '',
            subject: '',
            message: ''
        },
        validationSchema: validateSchema,
        onSubmit: () => {
            if (userId) {
                axios.post('http://immutable858-001-site1.atempurl.com/api/ContactMessage',
                    values,
                    {
                        headers: {
                            "Accept": "/",
                            "Authorization": `Bearer ${userJwtToken}`,
                            "Content-Type": "application/json",
                        }
                    }
                )
                    .then(function (response) {
                        toast.success(response.data.message, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        resetForm()
                    })
            } else {

            }
        },
    });

    if (loading) return <p>Loading...</p>
    if (!data) return <p>Data is null</p>
    if (error) return <p>{error}</p>;

    return (
        <>
            <PageHeading mainhead="Contact" />
            <div className="p-8 lg:p-20 flex flex-col items-center w-full">
                <div className="w-full text-center">
                    <h3 className="font-semibold text-4xl mb-3">Get In Touch With Us</h3>
                    <p className="text-[#9F9F9F]">For More Information About Our Product & Services. Please Feel Free To Drop Us <br /> An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!</p>
                </div>
                <div className="flex flex-col gap-16 lg:gap-0 lg:flex-row justify-between w-full lg:w-4/5 mt-20">
                    <div className="flex w-full lg:w-4/12 flex-wrap lg:flex-col gap-10 lg:pr-12">
                        <div className="flex gap-4 lg:gap-8 items-start">
                            <img loading="lazy" src={Adress} alt="adress" />
                            <div className="">
                                <p className="font-medium text-2xl">Address</p>
                                <p>{data[0].address}</p>
                            </div>
                        </div>
                        <div className="flex gap-4 lg:gap-8 items-start">
                            <img loading="lazy" src={Phone} alt="phone" />
                            <div className="">
                                <p className="font-medium text-2xl">Phone</p>
                                <p>Mobile: {data[0].mobile}</p>
                                <p>Hotline: {data[0].hotline}</p>
                            </div>
                        </div>
                        <div className="flex gap-4 lg:gap-8 items-start">
                            <img loading="lazy" src={Clock} alt="clock" />
                            <div className="">
                                <p className="font-medium text-2xl">Working Time</p>
                                <p>{data[0].weekdayWorkingTime}</p>
                                <p>{data[0].weekendWorkingTime}</p>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="lg:px-12 w-full lg:w-3/5 flex flex-col gap-6" action="">
                        <div className="flex flex-col gap-4">
                            <label className="font-medium" htmlFor="name">Your name</label>
                            <input
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.name}
                                name='name'
                                className="border focus:outline-none px-8 py-4 rounded-xl border-[#9F9F9F]"
                                id="name"
                                placeholder="Abc"
                                type="text" />
                            {errors.name && <span className="text-red-600">{errors.name}</span>}
                        </div>
                        <div className="flex flex-col gap-4">
                            <label className="font-medium" htmlFor="email">Email address</label>
                            <input
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                name='email'
                                className="border focus:outline-none px-8 py-4 rounded-xl border-[#9F9F9F]"
                                id="email"
                                placeholder="Abc@def.com"
                                type="email" />
                            {errors.email && <span className="text-red-600">{errors.email}</span>}
                        </div>
                        <div className="flex flex-col gap-4">
                            <label className="font-medium" htmlFor="subject">Subject</label>
                            <input
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.subject}
                                name='subject'
                                className="border focus:outline-none px-8 py-4 rounded-xl border-[#9F9F9F]"
                                id="subject"
                                placeholder="This is an optional"
                                type="text" />
                            {errors.subject && <span className="text-red-600">{errors.subject}</span>}
                        </div>
                        <div className="flex flex-col gap-4">
                            <label className="font-medium" htmlFor="message">Message</label>
                            <textarea
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.message}
                                name='message'
                                placeholder="Hi! i’d like to ask about"
                                className="resize-none focus:outline-none border px-8 py-4 rounded-xl border-[#9F9F9F] h-32"
                                id="message"></textarea>
                            {errors.message && <span className="text-red-600">{errors.message}</span>}
                        </div>
                        <button type='submit' className="text-white w-fit rounded bg-ochre border border-ochre hover:bg-white hover:text-ochre duration-300 px-16 py-3 mt-6">Submit</button>
                    </form>
                </div>
            </div>
            <UpperFooter />
        </>
    )
}

export default ContactPage
