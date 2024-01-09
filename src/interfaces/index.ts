import { Dispatch, SetStateAction } from "react"
import { NavigateFunction } from "react-router-dom"

export interface SignupProps {
    setIsLogin: Dispatch<SetStateAction<boolean>>
} // signup.tsx

export interface LoginProps {
    setIsLogin: Dispatch<SetStateAction<boolean>>  // Assuming setIsLogin is a state-setting function
} //login.tsx

export interface ProductType {
    id: number
    title: string
    about: string
    oldprice?: number
    price: number
    discount?: number
    image: string
    isnew: boolean
} // productcard.tsx   shoppage.tsx   productpage.tsx   ourproducts.tsx

export interface NavMenuItemType {
    item: string
    path: string
} // navbar.tsx


export interface CountryProvinceType {
    id: number
    countryName?: string
    provinceName?: string
}

export interface ProductFeaturesComponentProps {
    isPage: boolean
    id?: number
    productColors?: ColorType[]
    productSizes?: TagsSizesColorsType[]
}

export interface WishlistItemType {
    productId: number
    title: string
    subTitle: string
    salePrice: number
    productImages: ProductImagesType
}  // appcontext.tsx

export interface ProductImagesType {
    id: number
    colorHexCode: string
    imageFiles: string[]
}

export interface ProductCard2Props {
    id: number
    discountPercent: number
    discountedPrice: number
    isNew: boolean
    salePrice: number
    subTitle: string
    title: string
    imageFiles: string[]
}

export interface WishlistItemCardProps {
    product: ProductType
}
export interface CartModalItemProps {
    p: CartItemType
}

export interface CartPageItemProps {
    cartItem: CartItemType
}

export interface DataCartItemType {
    cartItems: CartItemType[]
}

export interface CartItemType {
    productId: number
    productTitle: string
    count: number
    salePrice: number
    subtotal: number
    productImages: ProductImagesType
}
export interface ProductCardProps {
    product: ProductTypeApi
}

export interface SlideItemType {
    id: number
    category: string
    title: string
    link: string
    image: string
} // homeslider.tsx

export interface RangeItemType {
    image: string
    title: string
} // browsetherange.tsx

export interface PageHeadingProps {
    mainhead: string
    subhead?: string
    searchPrompt?: string
    setSearchPrompt?: Dispatch<SetStateAction<string>>
} // pageheading.tsx

export interface ProductFeatures {
    color: number
    size: number
    quantity: number
}

export interface AuthFormType {
    userName: string
    firstName?: string
    lastName?: string
    email?: string
    password: string
    cpassword?: string
}

// API TYPES

export interface TagsSizesColorsType {
    id: number
    tagName?: string
    sizeName?: string
    colorHexCode?: string
    categoryName?: string
}

export interface ReviewType {
    id: number
    productId: number
    appUserId: number
    rate: number
    text: string
    createdAt: string
}

export interface ProductReviewsProps {
    productReviews: ReviewType[]
    productId: number
    requestReviews: () => void
}

export interface ReviewProps {
    review: ReviewType
    isAuthor: boolean
    requestReviews: () => void
}

export interface ColorType {
    id: number
    colorHexCode: string
    imageFiles: string[]
}

export interface ProductTypeApi {
    id: number
    title: string
    introduction?: string
    subTitle?: string
    isNew: boolean
    salePrice: number
    discountedPrice: number
    discountPercent: number
    sku: string
    category: TagsSizesColorsType
    tags: TagsSizesColorsType[]
    colors: ColorType[]
    sizes: TagsSizesColorsType[]
}

export interface GridItemType {
    id: number
    imageUrls: string[]
}

export interface CategoryAdminType {
    id: number
    categoryName?: string
    roleName?: string
}

export interface BlogItemType {
    id: number
    header: string
    text?: string
    category?: CategoryAdminType
    adminInfo?: CategoryAdminType
    createdDate: string
    imageUrls: string[]
}

export interface BlogCategoryType {
    id: number
    categoryName: string
    blogCount: number
}

export interface BlogCardProps {
    blog: BlogItemType
}

export interface ProductToRemoveType {
    userId: number
    productId: number
    colorId: number
}

export interface PaginationProps {
    pages: number
    pageToShow: number
    setPageToShow: Dispatch<SetStateAction<number>>
    request: () => void
}

export interface ProductForCartType {
    productId: number
    colorId: number
    userId: number
    count: number
}

export interface FilterBarProps {
    productType: string
    setProductType: Dispatch<SetStateAction<string>>
}

export interface OptionType {
    value: string
    label: string
}

export interface ChangePasswordProps {
    userId: number
    navigate: NavigateFunction
    setTabs: Dispatch<SetStateAction<string>>
}

export interface DeleteAccountProps {
    setTabs: Dispatch<SetStateAction<string>>
    userName: string
    navigate: NavigateFunction
}

export interface UserLoginType {
    id: number
    userName: string
    firstName: string
    lastName: string
    email: string
}

export interface UpdateUserProps {
    userId: string
    setTabs: Dispatch<SetStateAction<string>>
    navigate: NavigateFunction
    userLogin: UserLoginType
}