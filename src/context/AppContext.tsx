import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { ProductFeatures, ProductTypeApi } from '../interfaces';
import { ShopContextProvider } from './ShopContext';
import { BlogContextProvider } from './BlogContext';
import { useAxios } from '@/hooks/useAxios';
import { CheckoutContextProvider } from './CheckoutContext';
import { CartContextProvider } from './CartContext';
import { WishlistContextProvider } from './WishlistContext';

const AppContext = createContext<any | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [ourProducts, setOurProducts] = useState<ProductTypeApi[] | undefined>()
    const [totalProductCount, setTotalProductCount] = useState<number>()
    const [ourProductsToShow, setOurProductsToShow] = useState<number>(8)
    const [userId, setUserId] = useState<string>(localStorage.getItem('userId') || '')
    const [userLogin, setUserLogin] = useState<string>(localStorage.getItem('userLogin') || '');
    const [loadingOurProducts, dataOurProducts, errorOurProducts, requestOurProducts] = useAxios<any>({ method: 'GET', url: `http://immutable858-001-site1.atempurl.com/api/UserProduct/Products?Page=1&ShowMore.Take=${ourProductsToShow}` }, false, ['/']);

    const [loadingUserLogin, dataUserLogin, errorUserLogin, requestUserLogin] = useAxios<any>({ method: 'GET', url: `http://immutable858-001-site1.atempurl.com/api/ApplicationUser/${userId}` });

    useEffect(() => {
        requestOurProducts()
    }, [ourProductsToShow])
    useEffect(() => {
        setUserLogin(dataUserLogin);
        localStorage.setItem('userLogin', JSON.stringify(dataUserLogin));
    }, [dataUserLogin])

    useEffect(() => {
        if (dataOurProducts) {
            setOurProducts(dataOurProducts[0].products)
            setTotalProductCount(dataOurProducts[0].totalProductCount)
        }
    }, [dataOurProducts])

    const initialFeatures = {
        color: 0,
        size: 0,
        quantity: 1
    }

    const [isNavOpen, setIsNavOpen] = useState<boolean>(false)
    const [toggleCartModal, setToggleCartModal] = useState<boolean>(false)
    const [productForModal, setProductForModal] = useState<ProductTypeApi | undefined>()
    const [productFeatures, setProductFeatures] = useState<ProductFeatures>(initialFeatures)

    const states =
    {
        isNavOpen,
        setIsNavOpen,
        toggleCartModal,
        setToggleCartModal,
        productForModal,
        setProductForModal,
        productFeatures,
        setProductFeatures,
        initialFeatures,
        ourProducts,
        loadingOurProducts,
        errorOurProducts,
        userLogin,
        userId,
        setOurProductsToShow,
        totalProductCount
    }


    return (
        <AppContext.Provider value={states}>
            <ShopContextProvider>
                <BlogContextProvider>
                    <CheckoutContextProvider>
                        <CartContextProvider >
                            <WishlistContextProvider>
                                {children}
                            </WishlistContextProvider>
                        </CartContextProvider>
                    </CheckoutContextProvider>
                </BlogContextProvider>
            </ShopContextProvider>
        </AppContext.Provider>
    );
};
export const useData = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useData must be used within an AppProvider');
    }
    return context;
};
