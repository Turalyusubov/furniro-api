
import { createContext, useContext, useEffect, useState } from 'react';
import { useAxios } from '@/hooks/useAxios';

const CheckoutContext = createContext<any>(undefined);

export const useCheckoutContext = () => {
    return useContext(CheckoutContext);
};

export const CheckoutContextProvider = ({ children }: { children: any }) => {
    const [selectedCountry, setSelectedCountry] = useState<number>()
    const [selectedProvince, setSelectedProvince] = useState<number>()

    const [loadingCountry, dataCountry, errorCountry, requestCountry] = useAxios<any>({ method: 'GET', url: 'http://immutable858-001-site1.atempurl.com/api/Country' }, false, ['/checkout']);
    const [loadingProvince, dataProvince, errorProvince, requestProvince] = useAxios<any>({ method: 'GET', url: `http://immutable858-001-site1.atempurl.com/api/Province/GetRelatedProvince/${selectedCountry}` }, false, ['/checkout']);

    useEffect(() => {
        if (dataCountry)
            setSelectedCountry(dataCountry[0].id)
    }, [dataCountry])

    useEffect(() => {
        if (selectedCountry)
            requestProvince()
    }, [selectedCountry])

    const states = {
        dataCountry,
        selectedCountry,
        setSelectedCountry,
        dataProvince,
        requestProvince,
        selectedProvince,
        setSelectedProvince
    }

    return (
        <CheckoutContext.Provider value={states}>
            {children}
        </CheckoutContext.Provider>
    );
};
