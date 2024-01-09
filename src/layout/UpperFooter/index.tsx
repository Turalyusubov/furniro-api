import Trophy from '../../assets/icons/upper-footer/trophy 1.svg'
import Guarantee from '../../assets/icons/upper-footer/guarantee.svg'
import Shipping from '../../assets/icons/upper-footer/shipping.svg'
import Support from '../../assets/icons/upper-footer/customer-support.svg'

const UpperFooter: React.FC = () => {
    return (
        <div className='bg-[#FAF3EA] gap-10 lg:gap-2 p-8 lg:px-12 lg:py-20 flex flex-wrap justify-between'>
            <div className="flex items-center gap-3">
                <img loading="lazy" className='w-10 lg:w-fit' src={Trophy} alt="trophy" />
                <div className="">
                    <p className='font-semibold text-xl lg:text-[25px] text-[#242424]'>High Quality</p>
                    <p className='font-medium text-[#898989] lg:text-[20px]'>crafted from top materials</p>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <img loading="lazy" className='w-10 lg:w-fit' src={Guarantee} alt="guarantee" />
                <div className="">
                    <p className='font-semibold text-xl lg:text-[25px] text-[#242424]'>Warranty Protection</p>
                    <p className='font-medium text-[#898989] lg:text-[20px]'>Over 2 years</p>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <img loading="lazy" className='w-10 lg:w-fit' src={Shipping} alt="shipping" />
                <div className="">
                    <p className='font-semibold text-xl lg:text-[25px] text-[#242424]'>Free Shipping</p>
                    <p className='font-medium text-[#898989] lg:text-[20px]'>Order over 150 $</p>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <img loading="lazy" className='w-10 lg:w-fit' src={Support} alt="support" />
                <div className="">
                    <p className='font-semibold text-xl lg:text-[25px] text-[#242424]'>24 / 7 Support</p>
                    <p className='font-medium text-[#898989] lg:text-[20px]'>Dedicated support</p>
                </div>
            </div>
        </div>
    )
}

export default UpperFooter
