import { useAxios } from '@/hooks/useAxios';
import { OptionType, ProductTypeApi } from '@/interfaces';
import { createContext, useState, useContext, useEffect } from 'react';

const ShopContext = createContext<any>(undefined);

export const useShopContext = () => {
    return useContext(ShopContext);
};

export const ShopContextProvider = ({ children }: { children: any }) => {

    const [shopProductsApi, setShopProductsApi] = useState<ProductTypeApi[]>([]);
    const [maxPrice, setMaxPrice] = useState<number | string>('')
    const [totalProductCount, setTotalProductCount] = useState<number>(0)
    const [productsToShow, setProductsToShow] = useState<number>(8)
    const [shopPages, setShopPages] = useState<number>(0)
    const [pageToShow, setPageToShow] = useState<number>(1)

    const [categoryNamesToShow, setCategoryNamesToShow] = useState([])
    const [isNewToShow, setIsNewToShow] = useState(false)
    const [productTagsToShow, setProductTagsToShow] = useState<OptionType[]>([])
    const [productSizesToShow, setProductSizesToShow] = useState<OptionType[]>([])
    const [productColorsToShow, setProductColorsToShow] = useState<OptionType[]>([])
    const [minPriceToShow, setMinPriceToShow] = useState<number>(0)
    const [maxPriceToShow, setMaxPriceToShow] = useState<number>(2000)
    const [orderByToShow, setOrderByToShow] = useState<string>('')

    const transformAndJoin = (array: OptionType[], arrayType: string) => {
        switch (arrayType) {
            case 'categories':
                return array.map((item) => `&CategoryNames=${item.value}`).join('');
            case 'tags':
                return array.map((item) => `&ProductTags=${item.value}`).join('');
            case 'colors':
                return array.map((item) => `&ProductColors=${item.value.replace(/#/g, '%23')}`).join('');
            case 'sizes':
                return array.map((item) => `&ProductSizes=${item.value}`).join('');
            default:
                return '';
        }
    };


    const testApi = `http://immutable858-001-site1.atempurl.com/api/UserProduct/Products?Page=${pageToShow}&ShowMore.Take=${productsToShow}${categoryNamesToShow?.length > 0 ? transformAndJoin(categoryNamesToShow, 'categories') : ''}${isNewToShow ? `&IsNew=${isNewToShow}` : ''}${productTagsToShow.length > 0 ? transformAndJoin(productTagsToShow, 'tags') : ''}${productSizesToShow.length > 0 ? transformAndJoin(productSizesToShow, 'sizes') : ''}${minPriceToShow !== 0 ? `&MinPrice=${minPriceToShow}` : ''}${maxPriceToShow !== 2000 ? `&MaxPrice=${maxPriceToShow}` : ''}${orderByToShow.length > 0 ? `&OrderBy=${orderByToShow}` : ''}${productColorsToShow.length > 0 ? transformAndJoin(productColorsToShow, 'colors') : ''}`

    const [loading, data, error, request] = useAxios<any>({ method: 'GET', url: testApi });

    const [loadingSizes, dataSizes, errorSizes, requestSizes] = useAxios<any>({ method: 'GET', url: 'http://immutable858-001-site1.atempurl.com/api/Size/getAll' }, false, ['/shop']);

    const [loadingTags, dataTags, errorTags, requestTags] = useAxios<any>({ method: 'GET', url: 'http://immutable858-001-site1.atempurl.com/api/Tag/getAll' }, false, ['/shop']);

    const [loadingCategories, dataCategories, errorCategories, requestCategories] = useAxios<any>({ method: 'GET', url: 'http://immutable858-001-site1.atempurl.com/api/Category/getAll' }, false, ['/shop']);

    const [loadingColors, dataColors, errorColors, requestColors] = useAxios<any>({ method: 'GET', url: 'http://immutable858-001-site1.atempurl.com/api/Color/getAll' }, false, ['/shop']);

    useEffect(() => {
        totalProductCount && setShopPages(Math.ceil(totalProductCount / productsToShow))
    }, [productsToShow, totalProductCount])

    useEffect(() => {
        if (data) {
            setShopProductsApi(data[0].products)
            setTotalProductCount(data[0].totalProductCount)
        }
    }, [data])

    const states = {
        errorCategories,
        errorColors,
        requestColors,
        requestCategories,
        errorTags,
        requestTags,
        requestSizes,
        errorSizes,
        shopProductsApi,
        setShopProductsApi,
        maxPrice,
        setMaxPrice,
        totalProductCount,
        setTotalProductCount,
        productsToShow,
        setProductsToShow,
        shopPages,
        setShopPages,
        pageToShow,
        setPageToShow,
        loading,
        error,
        request,
        orderByToShow,
        setOrderByToShow,
        dataCategories,
        dataTags,
        dataSizes,
        loadingSizes,
        loadingTags,
        loadingCategories,
        setCategoryNamesToShow,
        categoryNamesToShow,
        productTagsToShow,
        setProductTagsToShow,
        productSizesToShow,
        setProductSizesToShow,
        productColorsToShow,
        setProductColorsToShow,
        loadingColors,
        dataColors,
        isNewToShow,
        setIsNewToShow,
        maxPriceToShow,
        setMaxPriceToShow,
        minPriceToShow,
        setMinPriceToShow
    }

    return (
        <ShopContext.Provider value={states}>
            {children}
        </ShopContext.Provider>
    );
};
