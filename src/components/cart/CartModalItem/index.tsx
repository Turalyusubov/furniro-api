import axios from "axios";
import { useData } from "../../../context/AppContext";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { CartModalItemProps, ProductToRemoveType } from "@/interfaces";
import { useCartContext } from "@/context/CartContext";

const CartModalItem: React.FC<CartModalItemProps> = ({ p }) => {
    const { userId } = useData()
    const { setIsCartOpen, requestCart } = useCartContext()
    const [productToRemove, setProductToRemove] = useState<ProductToRemoveType | undefined>()

    useEffect(() => {
        setProductToRemove({
            userId: userId,
            productId: p.productId,
            colorId: p.productImages.id
        })
    }, [p, userId])

    const removeFromCart = () => {
        axios.delete('http://immutable858-001-site1.atempurl.com/api/Cart/remove', { data: productToRemove })
            .then(
                requestCart()
            )
    }

    return (
        <div className="flex w-full items-center justify-between">
            <div className="flex w-full items-center gap-8">
                <img loading="lazy" className='bg-[#B88E2F38] rounded-lg w-24 h-24 object-cover' src={p?.productImages?.imageFiles[0]} alt={p?.productTitle + "_img"} />
                <div className="flex flex-col gap-2">
                    <Link onClick={() => setIsCartOpen(false)} to={`/products/${p?.productId}`}>{p?.productTitle} <span className="text-gray-400">({p?.productImages?.colorHexCode})</span></Link>
                    <div className="text-xs flex items-center gap-3">
                        <span className='text-[16px]'>{p?.count}</span>
                        <span>X</span>
                        <span className='text-ochre'>Rs. {p?.salePrice.toFixed(2)}</span>
                    </div>
                </div>
            </div>
            <button onClick={() => removeFromCart()} className='text-[#9F9F9F] text-2xl'>
                ✖
            </button>
        </div>
    )
}

export default CartModalItem
