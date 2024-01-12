import { useEffect, useState } from "react";
import { useData } from "../../context/AppContext";
import { PageHeading } from "@/components";
import { useCheckoutContext } from "@/context/CheckoutContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useCartContext } from "@/context/CartContext";
import { CountryProvinceType } from "@/interfaces";


const CheckoutPage: React.FC = () => {
    const [selectedPayment, setSelectedPayment] = useState<string>("");

    const handlePaymentChange = (paymentMethod: string) => {
        setSelectedPayment(paymentMethod);
    };

    const { userId } = useData()
    //old checkout end

    // * * *

    const clearCart = () => {
        if (userId)
            axios.post('https://immutable858-001-site1.atempurl.com/api/Cart/ClearCart', { appUserId: userId })
                .catch(function (error) {
                    setCheckoutError(error.response.data.Message)
                });
    }

    const [checkoutError, setCheckoutError] = useState('')
    const { dataCart, cartTotalPrice } = useCartContext()

    const {
        dataCountry,
        setSelectedCountry,
        dataProvince,
        requestProvince,
    } = useCheckoutContext()

    const validateSchema = Yup.object().shape({
        firstName: Yup.string()
            .required("This field is required")
            .max(50, "Name must be less than 50 symbols"),
        lastName: Yup.string()
            .required("This field is required")
            .max(50, "Name must be less than 50 symbols"),
        companyName: Yup.string()
            .required("This field is required")
            .max(50, "Name must be less than 50 symbols"),
        countryId: Yup.number()
            .required("This field is required"),
        streetAddress: Yup.string()
            .required("This field is required")
            .max(50, "Name must be less than 50 symbols"),
        city: Yup.string()
            .required("This field is required")
            .max(50, "Name must be less than 50 symbols"),
        provinceId: Yup.number()
            .required("This field is required"),
        zipcode: Yup.string()
            .required("This field is required")
            .max(50, "Name must be less than 50 symbols"),
        phone: Yup.string()
            .required("This field is required")
            .max(50, "Name must be less than 50 symbols"),
        emailAddress: Yup.string()
            .email("Please enter a valid email")
            .required("This field is required")
            .max(50, "Username must be less than 50 symbols"),
        additionalInfo: Yup.string()
            .required("This field is required")
            .max(256, "Message must be less than 256 symbols"),
    });



    const { handleChange, errors, values, handleSubmit, resetForm, handleBlur } = useFormik({
        initialValues: {
            appUserId: userId,
            firstName: '',
            lastName: '',
            companyName: '',
            countryId: 0,
            streetAddress: '',
            city: '',
            provinceId: 0,
            zipcode: '',
            phone: '',
            emailAddress: '',
            additionalInfo: ''
        },
        validationSchema: validateSchema,
        onSubmit: () => {
            if (userId) {
                axios.post('https://immutable858-001-site1.atempurl.com/api/Checkout', values)
                    .then(() => {
                        clearCart()
                        resetForm()
                    })
                    .catch(function (error) {
                        setCheckoutError(error.response.data.Message)
                    });
            } else {
                setCheckoutError('You are not authorized')
            }
        },
    });

    useEffect(() => {
        setSelectedCountry(values.countryId)
        requestProvince()
    }, [values.countryId])

    return (
        <>
            <PageHeading mainhead="Checkout" />
            <div className="p-8 lg:p-20">
                <form onSubmit={handleSubmit} className="grid lg:grid-cols-2" action="">
                    <div className="lg:px-20">
                        <h3 className="font-semibold text-4xl mb-10">Billing details</h3>
                        <div className="flex flex-col gap-6">
                            <div className="flex gap-6 lg:gap-0 flex-col lg:flex-row justify-between">
                                <div className="flex flex-col gap-4">
                                    <label className="font-medium" htmlFor="firstName">First Name</label>
                                    <input
                                        onBlur={handleBlur}
                                        id="firstName"
                                        name="firstName"
                                        value={values.firstName}
                                        onChange={handleChange}
                                        type="text"
                                        className="border focus:outline-none rounded-lg p-4 border-[#9F9F9F]" />
                                    {errors.firstName && <span className="text-red-600">{errors.firstName}</span>}
                                </div>
                                <div className="flex flex-col gap-4">
                                    <label className="font-medium" htmlFor="lastName">Last Name</label>
                                    <input
                                        onBlur={handleBlur}
                                        id="lastName"
                                        name="lastName"
                                        value={values.lastName}
                                        onChange={handleChange}
                                        type="text"
                                        className="border focus:outline-none rounded-lg p-4 border-[#9F9F9F]" />
                                    {errors.lastName && <span className="text-red-600">{errors.lastName}</span>}
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <label className="font-medium" htmlFor="companyName">Company Name (Optional)</label>
                                <input
                                    onBlur={handleBlur}
                                    id="companyName"
                                    name="companyName"
                                    value={values.companyName}
                                    onChange={handleChange}
                                    type="text"
                                    className="border focus:outline-none rounded-lg p-4 border-[#9F9F9F]" />
                                {errors.companyName && <span className="text-red-600">{errors.companyName}</span>}
                            </div>
                            <div className="flex flex-col gap-4">
                                <label className="font-medium" htmlFor="countryId">Country / Region</label>
                                {
                                    dataCountry &&
                                    <select
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.countryId}
                                        id="countryId"
                                        name="countryId"
                                        className="border rounded-lg p-4 border-[#9F9F9F]">
                                        {dataCountry?.map((country: CountryProvinceType) => (
                                            <option key={country.id} value={country.id}>{country.countryName}</option>
                                        ))}
                                    </select>
                                }
                                {errors.countryId && <span className="text-red-600">{errors.countryId}</span>}
                            </div>
                            <div className="flex flex-col gap-4">
                                <label className="font-medium" htmlFor="streetAddress">Street address</label>
                                <input
                                    onBlur={handleBlur}
                                    id="streetAddress"
                                    name="streetAddress"
                                    value={values.streetAddress}
                                    onChange={handleChange}
                                    type="text"
                                    className="border focus:outline-none rounded-lg p-4 border-[#9F9F9F]" />
                                {errors.streetAddress && <span className="text-red-600">{errors.streetAddress}</span>}
                            </div>
                            <div className="flex flex-col gap-4">
                                <label className="font-medium" htmlFor="city">Town / City</label>
                                <input
                                    onBlur={handleBlur}
                                    id="city"
                                    name="city"
                                    value={values.city}
                                    onChange={handleChange}
                                    type="text"
                                    className="border focus:outline-none rounded-lg p-4 border-[#9F9F9F]" />
                                {errors.city && <span className="text-red-600">{errors.city}</span>}
                            </div>
                            <div className="flex flex-col gap-4">
                                <label className="font-medium" htmlFor="provinceId">Province</label>
                                {
                                    dataProvince &&
                                    <select
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.provinceId}
                                        id="provinceId"
                                        name="provinceId"
                                        className="border rounded-lg p-4 border-[#9F9F9F]">
                                        {dataProvince?.map((province: CountryProvinceType) => (
                                            <option key={province.id} value={province.id}>{province.provinceName}</option>
                                        ))}
                                    </select>
                                }
                                {errors.provinceId && <span className="text-red-600">{errors.provinceId}</span>}
                            </div>
                            <div className="flex flex-col gap-4">
                                <label className="font-medium" htmlFor="zipcode">ZIP code</label>
                                <input
                                    onBlur={handleBlur}
                                    id="zipcode"
                                    name="zipcode"
                                    value={values.zipcode}
                                    onChange={handleChange}
                                    type="text"
                                    className="border focus:outline-none rounded-lg p-4 border-[#9F9F9F]" />
                                {errors.zipcode && <span className="text-red-600">{errors.zipcode}</span>}
                            </div>
                            <div className="flex flex-col gap-4">
                                <label className="font-medium" htmlFor="phone">Phone</label>
                                <input
                                    onBlur={handleBlur}
                                    id="phone"
                                    name="phone"
                                    value={values.phone}
                                    onChange={handleChange}
                                    type="text"
                                    className="border focus:outline-none rounded-lg p-4 border-[#9F9F9F]" />
                                {errors.phone && <span className="text-red-600">{errors.phone}</span>}
                            </div>
                            <div className="flex flex-col gap-4">
                                <label className="font-medium" htmlFor="emailAddress">Email address</label>
                                <input
                                    onBlur={handleBlur}
                                    id="emailAddress"
                                    name="emailAddress"
                                    value={values.emailAddress}
                                    onChange={handleChange}
                                    type="email"
                                    className="border focus:outline-none rounded-lg p-4 border-[#9F9F9F]" />
                                {errors.emailAddress && <span className="text-red-600">{errors.emailAddress}</span>}
                            </div>
                            <div className="flex flex-col gap-4 mt-6">
                                <input
                                    onBlur={handleBlur}
                                    id="additionalInfo"
                                    name="additionalInfo"
                                    value={values.additionalInfo}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Additional information" className="border focus:outline-none rounded-lg p-4 border-[#9F9F9F]" />
                                {errors.additionalInfo && <span className="text-red-600">{errors.additionalInfo}</span>}
                            </div>
                        </div>
                    </div>
                    <div className="lg:px-10 mt-12">
                        <div className="w-full flex flex-col gap-6 border-b-[#D9D9D9] border-b pb-10">
                            <div className="text-2xl font-medium flex justify-between">
                                <p>Product</p>
                                <p>Subtotal</p>
                            </div>
                            <div className="max-h-[40vh] overflow-y-auto flex flex-col gap-6">
                                {dataCart && dataCart.map((item: any) => (
                                    <div key={item.id} className="flex justify-between pr-4">
                                        <p className="text-[#9F9F9F]">{item?.cartItems[0]?.productTitle} <span className="text-black text-[12px]">x {item?.cartItems[0]?.count}</span></p>
                                        <p className="font-light">Rs. {item?.cartItems[0]?.salePrice.toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between">
                                <p>Subtotal</p>
                                <p className="font-light">Rs. {cartTotalPrice}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Total</p>
                                <p className="font-bold lg:text-2xl text-ochre">Rs. {cartTotalPrice}</p>
                            </div>
                        </div>
                        <div className="text-[#9F9F9F] py-4">
                            <div className="group mb-3">
                                <label className={`inline-flex cursor-pointer items-center gap-3 mb-3 duration-300 ${selectedPayment === 'bank' ? 'text-black' : ''}`} htmlFor="bank">
                                    <input className="peer sr-only" onChange={() => handlePaymentChange('bank')} type="radio" name="payment" id="bank" />
                                    <span className="w-3 h-3 border border-[#9F9F9F] rounded-full peer-checked:bg-black peer-checked:border-black"></span>
                                    Direct Bank Transfer</label>
                                <p className={selectedPayment === 'bank' ? 'block' : 'hidden'}>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</p>
                            </div>
                            <div className="group">
                                <label className={`inline-flex cursor-pointer items-center gap-3 mb-3 duration-300 ${selectedPayment === 'cash' ? 'text-black' : ''}`} htmlFor="cash">
                                    <input className="peer sr-only" onChange={() => handlePaymentChange('cash')} type="radio" name="payment" id="cash" />
                                    <span className="w-3 h-3 border border-[#9F9F9F] rounded-full peer-checked:bg-black peer-checked:border-black"></span>
                                    Cash On Delivery</label>
                                <p className={selectedPayment === 'cash' ? 'block' : 'hidden'}>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</p>
                            </div>
                        </div>
                        <p className="mb-8">Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our <b>privacy policy.</b></p>
                        <div className="w-full items-center flex flex-col">
                            {checkoutError.length > 0 && <span className="text-red-600 mb-2">{checkoutError}</span>}
                            <button type="submit" className="text-xl border border-black hover:bg-black hover:text-white duration-300 rounded-lg py-3 w-1/2 lg:px-20">Place order</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CheckoutPage
