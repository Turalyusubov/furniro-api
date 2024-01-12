import { Link, useParams } from "react-router-dom";
import Arrow from '../../assets/icons/arrow-to-right.svg'
import Stars from '../../assets/img/product-single/stars.png'
import Facebook from '../../assets/icons/social-media/facebook.svg'
import Linkedin from '../../assets/icons/social-media/linkedin.svg'
import Twitter from '../../assets/icons/social-media/twitter.svg'
import { useEffect, useState } from "react";
import { ColorType, ProductTypeApi } from "../../interfaces";
import { useData } from "../../context/AppContext";
import { ProductCard, ProductFeaturesComponent, ProductReviews } from "@/components";
import { useAxios } from "@/hooks/useAxios";

const ProductPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<number>(1)
    const [productDetails, setProductDetails] = useState<ProductTypeApi>()
    const [selectedImg, setSelectedImg] = useState<string>()
    const [selectedColor, setSelectedColor] = useState<ColorType | undefined>()
    const [imageFiles, setImageFiles] = useState<string[]>()

    const { productFeatures, setProductFeatures } = useData()

    const { productId } = useParams<{ productId: string }>()
    const [_loading, data, _error, _request] = useAxios<any>({ method: 'GET', url: `https://immutable858-001-site1.atempurl.com/api/UserProduct/getById/ProductPage?Id=${productId}` }, false, [`/products/${productId}`]);
    const [loadingRelated, dataRelated, _errorRelated, _requestRelated] = useAxios<any>({ method: 'GET', url: `https://immutable858-001-site1.atempurl.com/api/UserProduct/RelatedProducts?ShowMore.Take=20&MainProductId=${productId}` }, false, [`/products/${productId}`]);
    const [loadingDescription, dataDescription, _errorDescription, _requestDescription] = useAxios<any>({ method: 'GET', url: `https://immutable858-001-site1.atempurl.com/api/UserProduct/getById/Description?Id=${productId}` }, false, [`/products/${productId}`]);

    const [showReviewCount, setShowReviewCount] = useState(8)

    const [_loadingReviews, dataReviews, _errorReviews, requestReviews] = useAxios<any>({ method: 'GET', url: `https://immutable858-001-site1.atempurl.com/api/Review/ProductReviews?ProductId=${productId}&ShowMore.Take=${showReviewCount}` }, false, [`/products/${productId}`]);
    useEffect(() => {
        setProductDetails(data)
    }, [data])

    useEffect(() => {
        requestReviews()
    }, [showReviewCount])

    useEffect(() => {
        if (imageFiles) {
            setSelectedImg(imageFiles[0])
        }
    }, [imageFiles])

    useEffect(() => {
        if (productDetails) {
            setProductFeatures({
                color: productDetails.colors[0].id,
                size: productDetails.sizes[0].id,
                quantity: 1
            })
        }
    }, [productDetails])

    useEffect(() => {
        if (productDetails && productFeatures) {
            setSelectedColor(productDetails?.colors.find(color => color.id === productFeatures.color))
        }
    }, [productDetails, productFeatures])

    useEffect(() => {
        if (selectedColor) {
            setImageFiles(selectedColor ? selectedColor?.imageFiles : [])
        }
    }, [selectedColor, productFeatures])

    if (loadingRelated && loadingDescription) return <p>Loading...</p>
    if (!productDetails && !dataRelated) return <p>data is null</p>

    return (
        <>
            <div className="bg-[#F9F1E7] text-[#9F9F9F] w-full p-8 lg:py-10 lg:px-20 flex gap-2 lg:gap-6">
                <Link className="flex items-center" to='/'>Home</Link>
                <img loading="lazy" src={Arrow} alt="arrow" />
                <Link className="flex items-center" to='/shop'>Shop</Link>
                <img loading="lazy" src={Arrow} alt="arrow" />
                <span className="w-[2px] bg-[#9F9F9F]"></span>
                <span className="text-black">{productDetails?.title}</span>
            </div>
            <div className="p-8 lg:px-20 lg:py-10 flex flex-col lg:flex-row gap-10 sm:gap-20">
                <div className="flex flex-col sm:flex-row w-full lg:w-1/2 gap-4 sm:gap-10">
                    <div className="grid grid-cols-4 sm:flex sm:flex-col gap-2 sm:gap-6 w-full sm:w-2/12">
                        {imageFiles?.map((img, index) => (
                            <img key={index} onClick={() => setSelectedImg(img)} loading="lazy" className={`${selectedImg === img ? 'border-ochre' : 'border-transparent'} duration-300 border-4 cursor-pointer bg-[#F9F1E7] shadow-lg object-cover h-16 sm:h-24 w-full sm:w-24 rounded-lg sm:rounded-xl`} src={img} alt={productDetails?.title + "_image"} />
                        ))}
                    </div>
                    {selectedImg && <img loading="lazy" className="bg-[#F9F1E7] order-first sm:order-last w-full sm:w-9/12 object-cover rounded-lg sm:rounded-xl h-[50vh] sm:h-[70vh] shadow-lg" src={selectedImg} alt={productDetails?.title + "_image"} />}
                </div>
                <div className="w-full lg:w-1/2 flex flex-col gap-5">
                    <h3 className="text-[42px]">{productDetails?.title}</h3>
                    <p className="text-[#9F9F9F] text-2xl">{productDetails?.salePrice}</p>
                    <div className="flex gap-3">
                        <img loading="lazy" src={Stars} alt="stars" />
                        <span className="w-[1px] bg-[#9F9F9F]"></span>
                        <span className="text-sm text-[#9F9F9F]">5 Customer Review</span>
                    </div>
                    <p className="w-10/12">{productDetails && productDetails?.introduction}</p>
                    <ProductFeaturesComponent id={productDetails?.id} productColors={productDetails?.colors} productSizes={productDetails?.sizes} isPage={true} />
                    <span className="h-[1px] bg-[#D9D9D9] my-8"></span>
                    <div className="text-[#9F9F9F] flex flex-col gap-4">
                        <div className="flex gap-3">
                            <span className="w-20">SKU</span>
                            <span>:</span>
                            <span>{productDetails?.sku}</span>
                        </div>
                        <div className="flex gap-3">
                            <span className="w-20">Category</span>
                            <span>:</span>
                            <span>{productDetails?.category?.categoryName}</span>
                        </div>
                        <div className="flex gap-3">
                            <span className="w-20">Tags</span>
                            <span>:</span>
                            <div className="flex flex-wrap gap-2">
                                {productDetails?.tags.map(tag => <span key={tag.id}>{tag.tagName}</span>)}
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <span className="w-20">Share</span>
                            <span>:</span>
                            <div className="text-black flex gap-4 text-2xl">
                                <a href="#">
                                    <img src={Facebook} alt="facebook" />
                                </a>
                                <a href="#">
                                    <img src={Linkedin} alt="linkedin" />
                                </a>
                                <a href="#">
                                    <img src={Twitter} alt="twitter" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-y flex flex-col gap-12 border-y-[#D9D9D9] text-[#9F9F9F] p-8 lg:py-14 lg:px-20">
                <div className="text-xl md:text-2xl flex-wrap flex w-full gap-4 justify-center md:gap-10">
                    <button onClick={() => setActiveTab(1)} className={`${activeTab === 1 ? 'text-black font-medium' : ''} duration-300`}>Description</button>
                    <button onClick={() => setActiveTab(2)} className={`${activeTab === 2 ? 'text-black font-medium' : ''} duration-300`}>Additional Information</button>
                    <button onClick={() => setActiveTab(3)} className={`${activeTab === 3 ? 'text-black font-medium' : ''} duration-300`}>Reviews [{dataReviews ? dataReviews.totalReviewCount : 0}]</button>
                </div>
                <div className="md:px-10">
                    {activeTab === 1 && <div className="flex flex-col gap-12">
                        <p>{dataDescription && dataDescription.introduction}</p>
                        <div className="flex w-full gap-6">
                            {dataDescription && dataDescription?.imageFiles.map((img: string, index: number) => (
                                <img className="rounded-xl shadow w-1/2 h-[20vh] md:h-[50vh] object-cover" key={index} src={img} alt={`img-${index}`} />
                            ))}
                        </div>
                    </div>}
                    {activeTab === 2 && <div className="flex flex-col gap-6">
                        <p>{productDetails && productDetails?.introduction}</p>
                    </div>}
                    {activeTab === 3 && productDetails && <div className="flex gap-8 flex-col items-center">
                        <ProductReviews requestReviews={requestReviews} productId={productDetails?.id} productReviews={dataReviews.productReviews} />
                        {showReviewCount <= dataReviews.totalReviewCount &&
                            <button onClick={() => setShowReviewCount(prev => prev <= dataReviews.totalReviewCount ? prev + 8 : prev)} className="border-ochre text-ochre hover:bg-ochre hover:text-white duration-300 font-semibold border-2 px-8 py-2">More Reviews</button>}
                    </div>}
                </div>
            </div>
            <div className="p-8 lg:px-20 lg:py-10">
                <h4 className="text-4xl font-medium text-center">Related Products</h4>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 py-10">
                    {dataRelated && dataRelated.map((product: ProductTypeApi, index: number) => (<ProductCard key={index} product={product} />))}
                </div>
            </div>
        </>
    )
}

export default ProductPage
