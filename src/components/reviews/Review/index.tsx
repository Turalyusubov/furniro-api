import { ReviewProps } from "@/interfaces";
import axios from "axios";
import moment from "moment";

const Review: React.FC<ReviewProps> = ({ review, isAuthor, requestReviews }) => {

    const removeReview = () => {
        axios.delete('https://immutable858-001-site1.atempurl.com/api/Review',
            {
                data: {
                    id: review.id,
                    productId: review.productId,
                    appUserId: review.appUserId
                }
            })
            .then(() => {
                requestReviews()
            })
    }

    return (
        <div className={`border-2 p-4 w-full rounded-lg ${isAuthor ? 'border-ochre' : ''}`}>
            <div className="flex justify-between">
                <div className="flex flex-col">
                    {isAuthor ?
                        <div className="flex gap-2 items-center">
                            <p className="font-semibold text-ochre sm:text-lg">You</p>
                            <div className="flex gap-1">
                                <span className="text-stone-400 text-sm cursor-pointer hover:underline">Edit</span>
                                <span onClick={() => removeReview()} className="text-red-400 text-sm cursor-pointer hover:underline">Delete</span>
                            </div>
                        </div> :
                        <p className="font-semibold text-stone-600">Anonymous user • {review.appUserId}</p>}
                    <p>☆ {review.rate}</p>
                </div>
                <p>{moment(review?.createdAt).format('DD MMM YYYY')}</p>
            </div>
            {
                review.text.length > 0 &&
                <div className="pt-2 sm:pt-4">
                    <p className="text-stone-800 sm:text-xl">{review.text}</p>
                </div>
            }
        </div>
    )
}

export default Review
