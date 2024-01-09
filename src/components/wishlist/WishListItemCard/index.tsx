import { Link } from 'react-router-dom'
import { useWishlistContext } from '@/context/WishlistContext'

const WishlistItemCard: React.FC<any> = ({ product }) => {
    const { removeFromWishlist } = useWishlistContext()
    return (
        <div className="bg-[#F9F1E7] px-10 py-4 shadow-md rounded flex items-center justify-between">
            <div className="flex items-center gap-6">
                <img loading="lazy" className="w-20 h-20 rounded object-cover" src={product.productImages.imageFiles[0]} alt={product.title + "_image"} />
                <div className="flex flex-col">
                    <Link to={`/products/${product.productId}`} className="font-semibold flex items-center gap-2">
                        {product.title} | {product.productImages.colorHexCode}
                        <span style={{ backgroundColor: product.productImages.colorHexCode }} className='h-5 w-5 border border-stone-500 rounded-full inline-block'></span>
                    </Link>
                    <span className='opacity-70 text-sm'>{product.subTitle}</span>
                </div>
                <p>{product.salePrice.toFixed(2)} Rp</p>
            </div>
            <button onClick={() => removeFromWishlist(product.productId)}>
                <span className='text-2xl text-neutral-500'>✖</span>
            </button>
        </div>
    )
}

export default WishlistItemCard
