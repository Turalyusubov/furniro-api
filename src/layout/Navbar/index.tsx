import { Link, NavLink } from 'react-router-dom';
import Icon from '../../assets/website-icon/icon.svg'
import User from '../../assets/icons/user.svg'
import Cart from '../../assets/icons/cart.svg'
import Fav from '../../assets/icons/fav.svg'
import Search from '../../assets/icons/search.svg'
import Menu from '../../assets/icons/burger-menu.svg'
import { useData } from '../../context/AppContext';
import { useEffect } from 'react';
import { NavMenuItemType } from '../../interfaces';
import { useCartContext } from '@/context/CartContext';
import { useWishlistContext } from '@/context/WishlistContext';

const Navbar: React.FC = () => {

    const { isNavOpen, setIsNavOpen, userLogin } = useData()
    const {
        setIsCartOpen,
        dataCart,
    } = useCartContext()
    const { dataWishlist } = useWishlistContext()

    const navMenu: NavMenuItemType[] = [
        {
            item: 'Home',
            path: '/'
        },
        {
            item: 'Shop',
            path: '/shop'
        },
        {
            item: 'Blog',
            path: '/blog'
        },
        {
            item: 'Contact',
            path: '/contact'
        },
    ]

    useEffect(() => {
        const handleResize = () => {
            const isLargeScreen = window.innerWidth > 1024;
            if (isLargeScreen) {
                setIsNavOpen(false)
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    useEffect(() => {
        if (isNavOpen) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [isNavOpen])

    return (
        <nav className="bg-white overflow-hidden py-6 font-medium px-8 lg:px-20 w-full">
            <div className="flex w-full justify-between items-center">
                <div className="">
                    <Link to='/'>
                        <img loading="lazy" src={Icon} alt="icon" />
                    </Link>
                </div>
                <div className="hidden lg:flex gap-10 xl:gap-20">
                    {navMenu.map((link, index) => (
                        <NavLink className="relative after:content-[''] after:absolute after:bg-black after:h-[3px] after:w-0 hover:after:w-full after:duration-300 after:left-0 after:-bottom-[3px]" key={index} to={link.path}>{link.item}</NavLink>
                    ))}
                </div>
                <div className="hidden lg:flex gap-10">
                    {userLogin ?
                        <Link to='/profile'>
                            {userLogin.userName}
                        </Link> :
                        <Link to='/auth'>
                            <img loading="lazy" src={User} alt="user" />
                        </Link>}
                    <Link to='/search'>
                        <img loading="lazy" src={Search} alt="search" />
                    </Link>
                    <Link className='relative' to='/wishlist'>
                        <img loading="lazy" src={Fav} alt="fav" />
                        {dataWishlist && dataWishlist.length > 0 && <span className='absolute bg-ochre text-xs text-white rounded-full w-6 h-6 flex items-center justify-center -top-2 -right-3'>
                            {dataWishlist.length < 10 ? dataWishlist.length : '9+'}
                        </span>}
                    </Link>
                    <button className='focus:outline-none relative' onClick={() => setIsCartOpen((prev: boolean) => !prev)}>
                        <img loading="lazy" src={Cart} alt="cart" />
                        {
                            dataCart && dataCart.length > 0 &&
                            <span className='absolute bg-ochre text-xs text-white rounded-full w-6 h-6 flex items-center justify-center -top-2 -right-3'>
                                {dataCart.length < 10 ? dataCart.length : '9+'}
                            </span>
                        }
                    </button>
                </div>
                <button className='lg:hidden text-3xl' onClick={() => setIsNavOpen((prev: boolean) => !prev)}>
                    {
                        isNavOpen ? '✖' :
                            <img className='w-9' src={Menu} alt="menu" />
                    }
                </button>
            </div>
            <div className={`${isNavOpen ? 'translate-x-0 w-full' : 'translate-x-[-100%] w-0'} overflow-hidden fixed flex flex-col left-0 justify-center items-center text-2xl gap-10 z-30 top-20 border-t border-t-[#D9D9D9] h-screen duration-500 bg-white px-8`}>
                {navMenu.map((link, index) => (
                    <NavLink onClick={() => setIsNavOpen(false)} className="border-b border-b-black pb-3 w-10/12 text-center border-opacity-20" key={index} to={link.path}>{link.item}</NavLink>
                ))}
                <div className="flex mt-10 gap-10 bg-[#F9F1E7] py-4 w-full justify-center rounded-full">
                    {userLogin ?
                        <Link onClick={() => setIsNavOpen(false)} to='/profile'>
                            {userLogin.userName}
                        </Link> :
                        <Link onClick={() => setIsNavOpen(false)} to='/auth'>
                            <img loading="lazy" src={User} alt="user" />
                        </Link>}
                    <Link to='/search'>
                        <img loading="lazy" src={Search} alt="search" />
                    </Link>
                    <Link className='relative' onClick={() => setIsNavOpen(false)} to='/wishlist'>
                        <img loading="lazy" src={Fav} alt="fav" />
                        {
                            dataWishlist && dataWishlist.length > 0 &&
                            <span className='absolute bg-ochre text-xs text-white rounded-full w-6 h-6 flex items-center justify-center -top-2 -right-3'>
                                {dataWishlist.length < 10 ? dataWishlist.length : '9+'}
                            </span>
                        }
                    </Link>
                    <button className='focus:outline-none relative' onClick={() => setIsCartOpen((prev: boolean) => !prev)}>
                        <img loading="lazy" src={Cart} alt="cart" />
                        {
                            dataCart && dataCart.length > 0 &&
                            <span className='absolute bg-ochre text-xs text-white rounded-full w-6 h-6 flex items-center justify-center -top-2 -right-3'>
                                {dataCart.length < 10 ? dataCart.length : '9+'}
                            </span>
                        }
                    </button>
                </div>
            </div>
        </nav >
    )
}

export default Navbar
