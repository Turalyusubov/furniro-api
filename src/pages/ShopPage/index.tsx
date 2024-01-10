import {
    FilterBar,
    PageHeading,
    Pagination,
    ProductCard
} from "@/components";
import UpperFooter from "@/layout/UpperFooter";
import { useEffect, useMemo, useState } from "react";
import { ProductTypeApi } from "@/interfaces";
import { useShopContext } from "@/context/ShopContext";

const ShopPage: React.FC = () => {

    const { shopProductsApi, error, request, productsToShow, pageToShow, setPageToShow, shopPages } = useShopContext()

    const [productType, setProductType] = useState('grid')

    useEffect(() => {
        request()
    }, [productsToShow, pageToShow])

    useEffect(() => {
        if (pageToShow && shopPages && (pageToShow > shopPages))
            setPageToShow(shopPages)
    }, [productsToShow])

    const memoizedProducts = useMemo(
        () =>
            shopProductsApi?.map((product: ProductTypeApi) => (<ProductCard key={product?.id} product={product} />)) || [],
        [shopProductsApi]
    )

    if (!shopProductsApi) return <p>Data was null</p>;

    if (error) return <p>{error}</p>;


    return (
        <>
            <PageHeading mainhead='Shop' />
            <FilterBar productType={productType} setProductType={setProductType} />
            <div className={`grid ${productType === 'grid' ? 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'} gap-10 p-8 lg:p-20`}>
                {memoizedProducts.length > 0 ? memoizedProducts : <p>There is no products</p>}
            </div>
            {shopPages > 1 &&
                <Pagination pageToShow={pageToShow} setPageToShow={setPageToShow} pages={shopPages} request={request} />
            }
            <div className="mb-20"></div>
            <UpperFooter />
        </>
    )
}

export default ShopPage
