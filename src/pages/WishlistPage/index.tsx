import {
    PageHeading,
    WishlistItemCard
} from "@/components";
import { useWishlistContext } from "@/context/WishlistContext";
import { WishlistItemType } from "@/interfaces";

const WishlistPage: React.FC = () => {
    const { wishlistItems } = useWishlistContext()

    return (
        <>
            <PageHeading mainhead='Wishlist' />
            <div className="p-8 lg:p-20 flex flex-col gap-6 min-h-[40vh]">
                {
                    wishlistItems && wishlistItems.length > 0 ?
                        wishlistItems.map((item: WishlistItemType) => <WishlistItemCard key={item.productId} product={item} />) :
                        <p className="text-center text-2xl font-medium opacity-70">There is no products in your Wishlist</p>
                }

            </div>
        </>
    )
}

export default WishlistPage
