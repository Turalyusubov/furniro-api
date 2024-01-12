import { useEffect, useState } from "react";
import { useData } from "../../context/AppContext";
import { ProductFeaturesComponentProps, ProductForCartType, TagsSizesColorsType } from "@/interfaces";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "@/context/CartContext";
import { toast } from "react-toastify";

const ProductFeaturesComponent: React.FC<ProductFeaturesComponentProps> = ({ id, isPage, productColors, productSizes }) => {

    const navigate = useNavigate()

    const {
        toggleCartModal,
        setToggleCartModal,
        productForModal,
        setProductFeatures,
        productFeatures,
        initialFeatures,
        userId
    } = useData()

    const { requestCart } = useCartContext()


    const [quantity, setQuantity] = useState<number>(1)
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [productForCart, setProductForCart] = useState<ProductForCartType | undefined>()

    const handleFeatures = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget
        setProductFeatures({
            ...productFeatures,
            [isPage ? name.replace('_page', '') : name]: Number([value][0])
        })
    }

    useEffect(() => {
        setProductFeatures({
            ...productFeatures,
            quantity: quantity,
        })
    }, [quantity])

    const plusCount = () => {
        setQuantity(prev => prev + 1)
    }
    const minusCount = () => {
        if (quantity > 1)
            setQuantity(prev => prev - 1)
    }

    useEffect(() => {
        if (id && productFeatures) {
            setProductForCart({
                productId: id,
                colorId: productFeatures.color,
                userId: userId,
                count: productFeatures.quantity
            })
        }
    }, [id, productFeatures, userId, isPage])

    const handleAddToCart = () => {
        if (userId) {
            axios.post('https://immutable858-001-site1.atempurl.com/api/Cart/addToCart', productForCart)
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
                    requestCart()
                })
                .catch(function (error) {
                    toast.error(error.response.data.Message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                });

        } else {
            navigate('/auth')
        }
        if (productColors && productSizes) {
            setProductFeatures({
                color: productColors[0].id,
                size: productSizes[0].id,
                quantity: 1
            })
        }
        setQuantity(1)
        setToggleCartModal(false)
        setIsDisabled(true);
        setTimeout(() => {
            setIsDisabled(false);
        }, 3000);
    }

    useEffect(() => {
        if (!toggleCartModal) {
            setProductFeatures(initialFeatures)
            setQuantity(1)
        }
    }, [toggleCartModal])

    useEffect(() => {
        if (productColors && productSizes) {
            setProductFeatures({
                color: productColors[0].id,
                size: productSizes[0].id,
                quantity: 1
            })
        }
    }, [productColors, productSizes])

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <span className="text-black text-sm">Size</span>
                <div className="flex gap-4 text-xs">
                    {(!isPage ? productForModal?.sizes : productSizes)?.map((size: TagsSizesColorsType) => (
                        <div key={size.id} className="">
                            <input
                                onChange={handleFeatures}
                                className="peer sr-only"
                                checked={size.id === Number(productFeatures.size)}
                                type="radio"
                                value={size.id}
                                name={isPage ? "size_page" : "size"}
                                id={size.sizeName}
                            />
                            <label className="bg-[#F9F1E7] cursor-pointer h-8 w-8 flex items-center justify-center rounded peer-checked:bg-ochre peer-checked:text-white duration-300" htmlFor={size.sizeName}>{size.sizeName}</label>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <span className="text-black text-sm">Color</span>
                <div className="flex gap-4 items-center">
                    {(!isPage ? productForModal?.colors : productColors)?.map((color: TagsSizesColorsType) => (
                        <div key={color.id} className="">
                            <input
                                onChange={handleFeatures}
                                className="peer sr-only"
                                checked={color.id === productFeatures.color}
                                value={color.id}
                                type="radio"
                                name={isPage ? "color_page" : "color"}
                                id={color.colorHexCode}
                            />
                            <label style={{ backgroundColor: color.colorHexCode }} className="cursor-pointer block h-8 w-8 rounded-full peer-checked:border-4 peer-checked:border-gray-400 peer-checked:shadow-md duration-300" htmlFor={color.colorHexCode}></label>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-row w-full gap-4">
                <div className="rounded-lg flex justify-between items-center p-3 border border-[#9F9F9F]">
                    <button onClick={minusCount} className="hover:bg-gray-300 duration-300 rounded-full w-5 h-5 flex items-center justify-center">-</button>
                    <span onChange={handleFeatures}>{quantity}</span>
                    <button onClick={plusCount} className="hover:bg-gray-300 duration-300 rounded-full w-5 h-5 flex items-center justify-center">+</button>
                </div>
                <button disabled={isDisabled} onClick={handleAddToCart} className="rounded-lg disabled:opacity-50 disabled:bg-black disabled:text-white text-xl p-3 border border-black hover:bg-black hover:text-white duration-300">Add To Cart</button>
            </div>
        </div>
    )
}

export default ProductFeaturesComponent
