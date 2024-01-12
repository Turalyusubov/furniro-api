
import { createContext, useContext, useEffect, useState } from 'react';
import { useData } from './AppContext';
import { useAxios } from '@/hooks/useAxios';
import { DataCartItemType } from '@/interfaces';

const CartContext = createContext<any>(undefined);

export const useCartContext = () => {
    return useContext(CartContext);
};

export const CartContextProvider = ({ children }: { children: any }) => {

    const { userId, isNavOpen } = useData()

    const [isCartOpen, setIsCartOpen] = useState<boolean>(false)
    const [cartTotalPrice, setCartTotalPrice] = useState<number>()

    const [loadingCart, dataCart, errorCart, requestCart] = useAxios<any>({ method: 'GET', url: `https://immutable858-001-site1.atempurl.com/api/Cart/getAllCartItems/${userId}` });

    useEffect(() => {
        if (isCartOpen) {
            document.body.classList.add('no-scroll');
        } else if (!isNavOpen) {
            document.body.classList.remove('no-scroll');
        }
    }, [isCartOpen])

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsCartOpen(false)
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLDivElement;

        if (target.classList.contains('parent-cart-div')) {
            setIsCartOpen(false);
        }
    };

    useEffect(() => {
        if (dataCart && dataCart?.length > 0) {
            const total = dataCart?.reduce((accumulator: number, product: DataCartItemType) => {
                return accumulator + product?.cartItems[0]?.subtotal;
            }, 0);

            setCartTotalPrice(total?.toFixed(2))
        }
    }, [dataCart])

    const states = {
        isCartOpen,
        setIsCartOpen,
        loadingCart,
        dataCart,
        errorCart,
        requestCart,
        handleBackgroundClick,
        cartTotalPrice,
    }

    return (
        <CartContext.Provider value={states}>
            {children}
        </CartContext.Provider>
    );
};
