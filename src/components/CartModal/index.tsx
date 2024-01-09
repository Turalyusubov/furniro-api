import { useData } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import { CartModalItem } from '..';
import Close from '../../assets/icons/cart-modal/close-cart.svg'
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '@/context/CartContext';
import { DataCartItemType } from '@/interfaces';

const CartModal: React.FC = () => {

    const navigate = useNavigate()

    const {
        setIsNavOpen,
        userId
    } = useData()

    const {
        isCartOpen,
        setIsCartOpen,
        loadingCart,
        dataCart,
        errorCart,
        handleBackgroundClick,
        cartTotalPrice
    } = useCartContext()

    if (loadingCart && userId) return <p>Loading ....</p>;

    if (!dataCart && userId) return <p>Data is null</p>;

    if (errorCart && userId) return <p>{errorCart}</p>;

    return (
        <div onClick={(event) => handleBackgroundClick(event)} className={`${!isCartOpen ? 'translate-x-[100%] bg-opacity-0' : 'translate-x-0 bg-opacity-50'}  parent-cart-div fixed inset-0 duration-700 z-30 bg-black `}>
            <div className={`${!isCartOpen ? 'right-[-100%] w-0 overflow-hidden' : 'right-0 w-full lg:w-[30%]'}  bg-white fixed h-screen py-5 px-8`}>
                <div className="flex justify-between items-center">
                    <p className='font-semibold text-2xl'>Shopping Cart</p>
                    <button onClick={() => setIsCartOpen(false)}>
                        <img loading="lazy" src={Close} alt="close" />
                    </button>
                </div>
                <span className='h-[1px] w-9/12 block bg-[#D9D9D9] my-6'></span>
                <div className="">
                    <div className="h-[60vh] overflow-y-auto justify-between flex flex-col gap-6 pr-4">
                        {!userId && (
                            <div className="text-center">
                                <p className="text-xl font-medium opacity-60">You have to login or signup first</p>
                                <span onClick={() => {
                                    navigate('/auth')
                                    setIsCartOpen(false)
                                }}
                                    className='text-ochre hover:underline cursor-pointer'>Authentication</span>
                            </div>
                        )}
                        {(userId && dataCart.length === 0) && <p className="text-xl text-center font-medium opacity-60">There is no products in cart</p>}
                        {dataCart && dataCart.map((p: DataCartItemType, index: number) => <CartModalItem key={index} p={p?.cartItems[0]} />)}
                    </div>
                    <div className="flex py-6">
                        <span>Subtotal</span>
                        <div className="text-center w-full text-ochre font-semibold">
                            <span>Rs. {cartTotalPrice}</span>
                        </div>
                    </div>
                </div>
                <div className="text-sm flex w-full gap-4 border-t border-t-[#D9D9D9] py-10">
                    <Link onClick={() => {
                        setIsNavOpen(false)
                        setIsCartOpen(false)
                    }} to='/cart' className='border w-1/2 border-black rounded-full p-1 text-center'>Cart</Link>
                    <Link onClick={() => {
                        setIsNavOpen(false)
                        setIsCartOpen(false)
                    }} to='/checkout' className='border w-1/2 text-center border-black rounded-full p-1'>Checkout</Link>
                </div>
            </div>
        </div>
    )
}

export default CartModal
