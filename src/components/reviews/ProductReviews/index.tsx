import Review from "../Review";
import axios from "axios";
import { useData } from "@/context/AppContext";
import { useState } from "react";
import { ProductReviewsProps, ReviewType } from "@/interfaces";

const ProductReviews: React.FC<ProductReviewsProps> = ({ productReviews, productId, requestReviews }) => {
    const { userId } = useData()
    const [responseError, setResponseError] = useState<string>('')
    const [reviewText, setReviewText] = useState<string>('')

    const postReview = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (productId && userId)
            axios.post("http://immutable858-001-site1.atempurl.com/api/Review", {
                productId: productId,
                appUserId: userId,
                rate: 5,
                text: reviewText
            })
                .then((response) => {
                    setReviewText('')
                    requestReviews()
                })
                .catch(function (error) {
                    setResponseError(error.response.data.error)
                });
    }

    return (
        <div className="w-full sm:w-[80vh] flex flex-col gap-6">
            <form onSubmit={postReview} className="flex gap-3">
                <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} className="border text-stone-800 p-3 resize-none w-full" placeholder="Add a review"></textarea>
                <button type="submit" className="bg-ochre px-6 hover:bg-black duration-300 text-white">Add</button>
            </form>
            {responseError.length > 0 && <span className="text-red-500">{responseError}</span>}
            <div className="max-h-[50vh] pr-6 overflow-y-auto flex flex-col gap-4">
                {
                    productReviews && productReviews.length > 0 &&
                    productReviews.map((review: ReviewType) => <Review requestReviews={requestReviews} isAuthor={userId == review.appUserId} review={review} />)
                }
            </div>
        </div>
    )
}

export default ProductReviews