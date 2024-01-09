
import { createContext, useContext, useEffect, useState } from 'react';
import { useData } from './AppContext';
import { useAxios } from '@/hooks/useAxios';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const WishlistContext = createContext<any>(undefined);

export const useWishlistContext = () => {
    return useContext(WishlistContext);
};

export const WishlistContextProvider = ({ children }: { children: any }) => {

    const { userId } = useData()

    const navigate = useNavigate()

    const [userJwtToken, setUserJwtToken] = useState<string>((localStorage.getItem('userJwtToken')) || '')
    const [wishlistItems, setWishlistItems] = useState([])

    const [loadingWishlist, dataWishlist, errorWishlist, requestWishlist] = useAxios<any>({
        method: 'GET', url: `http://immutable858-001-site1.atempurl.com/api/Favorite?UserId=${userId}`,
        headers: {
            "Accept": "/",
            "Authorization": `Bearer ${userJwtToken}`,
            "Content-Type": "application/json",
        }
    });

    useEffect(() => {
        if (dataWishlist) {
            setWishlistItems(dataWishlist[0].favorites)
        }
    }, [dataWishlist])

    const addToWishlist = (productId: number) => {
        if (userId) {
            axios.post('http://immutable858-001-site1.atempurl.com/api/Favorite',
                {
                    userId: userId,
                    productId: productId
                },
                {
                    headers: {
                        "Accept": "/",
                        "Authorization": `Bearer ${userJwtToken}`,
                        "Content-Type": "application/json",
                    }
                }
            )

        } else {
            navigate('/auth')
        }
    }

    const removeFromWishlist = (productId: number) => {
        if (userId) {
            axios.delete('http://immutable858-001-site1.atempurl.com/api/Favorite',
                {
                    data:
                    {
                        userId: userId,
                        productId: productId
                    },
                    headers: {
                        "Accept": "/",
                        "Authorization": `Bearer ${userJwtToken}`,
                        "Content-Type": "application/json",
                    }
                }
            )
                .then(function (response) {
                    toast.success('Product is removed from wishlist successfully!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    requestWishlist()
                })
        }
        else {
            navigate('/auth')
        }
    }


    const states = {
        addToWishlist,
        wishlistItems,
        setUserJwtToken,
        loadingWishlist,
        errorWishlist,
        requestWishlist,
        removeFromWishlist
    }

    return (
        <WishlistContext.Provider value={states}>
            {children}
        </WishlistContext.Provider>
    );
};
