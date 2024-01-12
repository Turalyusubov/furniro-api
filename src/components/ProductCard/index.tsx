import { useNavigate } from 'react-router-dom'
import Heart from '../../assets/icons/producthover/heart.svg'
import Share from '../../assets/icons/producthover/share.svg'
import { ProductCardProps, ProductTypeApi, WishlistItemType } from '../../interfaces'
import { useData } from '../../context/AppContext'
import React, { memo, useEffect, useRef, useState } from 'react';
import { useWishlistContext } from '@/context/WishlistContext'

const ProductCard: React.FC<ProductCardProps> = memo(({ product }) => {
    const [data, setData] = useState<ProductTypeApi>();
    const [loading, setLoading] = useState(true);
    const [isInWishlist, setIsInWishlist] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://immutable858-001-site1.atempurl.com/api/UserProduct/getById/ProductPage?Id=${product.id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const result = await response.json();
                setData(result);
                setLoading(false);
            } catch (error) {
                throw error
            }
        };

        fetchData();
    }, []);


    const {
        setToggleCartModal,
        setProductForModal,
        userId
    } = useData()

    const { addToWishlist, wishlistItems, removeFromWishlist } = useWishlistContext()

    const [isOverlayShown, setIsOverlayShown] = useState<boolean>(false)

    const navigate = useNavigate();

    const parentRef = useRef<HTMLDivElement>(null);

    const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        event.stopPropagation()
        if (userId) {
            setToggleCartModal(true)
            setProductForModal(data)
        } else {
            navigate('/auth')
        }
    }

    const handleShare = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        event.stopPropagation()
        const shareLink = window.location.href;
        window.open(`http://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink)}`, 'facebook-share-dialog', 'width=626,height=436');
    };

    const handleAddToWishlist = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        event.stopPropagation()
        addToWishlist(product.id)
    }

    const handleRemoveFromWishlist = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        event.stopPropagation()
        removeFromWishlist(product.id)
    }

    const overlayToggle = () => {
        setIsOverlayShown(prev => !prev)
    }

    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (divRef.current && !divRef.current.contains(event.target as Node)) {
                setIsOverlayShown(false)
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const handleResize = () => {
            const isLargeScreen = window.innerWidth > 1024;
            if (isLargeScreen) {
                setIsOverlayShown(false)
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const foundObject = wishlistItems && product && (wishlistItems.find((item: WishlistItemType) => item.productId === product.id));

        if (foundObject) {
            setIsInWishlist(true)
        }
    }, [product])


    if (loading) return <p>Loading ....</p>;

    if (!product) return <p>Data is null</p>

    return (
        <div ref={divRef} onClick={overlayToggle} className="bg-[#F4F5F7] cursor-pointer relative group overflow-hidden">
            {/* @ts-ignore */}
            <img loading="lazy" className="h-80 w-full object-cover object-center" src={product?.imageFiles[0]} alt={product.title + "_image"} />
            <div className="p-4">
                <h5 className="text-[#3A3A3A] text-xl lg:text-2xl font-semibold truncate">{product.title}</h5>
                <p className="text-[#898989] font-medium my-1 truncate">{product?.subTitle}</p>
                <div className="flex gap-4 items-center">
                    <span className="font-semibold text-[#3A3A3A] lg:text-xl">Rp {product?.discountedPrice.toFixed(2)}</span>
                    {product?.salePrice !== product?.discountedPrice && <span className="text-[#B0B0B0] line-through">Rp {product?.salePrice.toFixed(2)}</span>}
                </div>
            </div>
            {(product?.isNew) &&
                <span className={`absolute top-5 right-5 w-14 h-14 flex items-center justify-center rounded-full ${product?.isNew ? 'bg-emerald-400' : 'bg-red-400'} text-white`}>
                    {product?.isNew ? 'New' : `-${product?.discountPercent}%`}
                </span>}
            {(product?.discountPercent > 0) &&
                <span className={`absolute top-5 left-5 w-14 h-14 flex items-center justify-center rounded-full bg-red-400 text-white`}>
                    {`-${product?.discountPercent}%`}
                </span>}

            <div
                onClick={() => navigate(`/products/${product?.id}`)}
                ref={parentRef}
                className={`${isOverlayShown ? 'inset-0 bg-opacity-60' : '-left-[300px] bg-opacity-0'} absolute flex justify-center items-center  lg:group-hover:inset-0 bg-black lg:group-hover:bg-opacity-60 duration-300 p-6`}>
                <div className="flex items-center duration-300 gap-6 flex-col w-full font-semibold">
                    <button onClick={(event) => handleAddToCart(event)} className='text-ochre text-center w-2/3 bg-white py-3 hover:text-white hover:bg-ochre duration-300'>Add to cart</button>
                    <div className="flex justify-center gap-10 text-white w-full">
                        <button onClick={(event) => handleShare(event)} className="flex items-center gap-1">
                            <img loading="lazy" src={Share} alt="share" />
                            <span>Share</span>
                        </button>
                        {
                            isInWishlist ?
                                <button onClick={(event) => handleRemoveFromWishlist(event)} className="flex items-center gap-1">
                                    <span className='text-3xl'>♥</span>
                                    <span>Unlike</span>
                                </button> :
                                <button onClick={(event) => handleAddToWishlist(event)} className="flex items-center gap-1">
                                    <img loading="lazy" src={Heart} alt="share" />
                                    <span>Like</span>
                                </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
})

export default ProductCard
