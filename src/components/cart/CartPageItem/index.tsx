import Trash from '../../../assets/icons/trash.svg'
import { CartPageItemProps, ProductToRemoveType } from '../../../interfaces'
import { Link } from 'react-router-dom'
import { useData } from '../../../context/AppContext'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useCartContext } from '@/context/CartContext'

const CartPageItem: React.FC<CartPageItemProps> = ({ cartItem }) => {

    const { userId } = useData()
    const { requestCart } = useCartContext()

    const [productToRemove, setProductToRemove] = useState<ProductToRemoveType | undefined>()

    useEffect(() => {
        setProductToRemove({
            userId: userId,
            productId: cartItem.productId,
            colorId: cartItem.productImages.id
        })
    }, [cartItem, userId])

    const removeFromCart = () => {
        axios.delete('http://immutable858-001-site1.atempurl.com/api/Cart/remove', { data: productToRemove })
            .then(function (response) {
                requestCart()
            })

    }

    return (
        <div className="grid min-w-[750px] w-full grid-cols-7">
            <div className="">
                <div className="bg-[#F9F1E7] overflow-hidden w-24 h-24 flex items-center rounded-xl">
                    <img loading="lazy" className='w-full h-full object-cover' src={cartItem?.productImages?.imageFiles[0]} alt={cartItem?.productTitle + "_img"} />
                </div>
            </div>
            <div className="text-[#9F9F9F] flex items-center justify-center">
                <Link to={`/products/${cartItem?.productId}`}>{cartItem?.productTitle}</Link>
            </div>
            <div className="text-[#9F9F9F] gap-1 flex items-center justify-center">
                <span style={{ backgroundColor: cartItem?.productImages?.colorHexCode }} className={`w-6 h-6 rounded-full`}></span>
                <p>{cartItem?.productImages?.colorHexCode}</p>
            </div>
            <div className="text-[#9F9F9F] flex items-center justify-center">
                <p>Rs. {cartItem?.salePrice.toFixed(2)}</p>
            </div>
            <div className="flex items-center justify-center">
                <span className="border border-[#9F9F9F] flex items-center justify-center rounded w-10 h-10 p-4">{cartItem?.count}</span>
            </div>
            <div className="flex items-center justify-center">
                <p>Rs. {cartItem?.subtotal.toFixed()}</p>
            </div>
            <div className="text-ochre text-2xl flex items-center justify-center">
                <button onClick={() => removeFromCart()}>
                    <img src={Trash} alt="trash" />
                </button>
            </div>
        </div>
    )
}

export default CartPageItem