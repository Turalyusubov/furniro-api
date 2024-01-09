import { Link } from "react-router-dom";

const Footer: React.FC = () => {
    return (
        <footer className="border-t-[1px] border-[#D9D9D9]">
            <div className="grid gap-8 grid-cols-2 lg:grid-cols-4 p-8 lg:p-20">
                <div className="flex flex-col gap-6 lg:gap-12">
                    <p className="text-2xl font-bold">Funiro.</p>
                    <p className="text-[#9F9F9F]">400 University Drive Suite 200 Coral Gables, <br /> FL 33134 USA</p>
                </div>
                <div className="flex flex-col lg:items-center">
                    <div className="flex flex-col gap-6 lg:gap-12">
                        <p className="text-[#9F9F9F] font-medium">Links</p>
                        <div className="flex flex-col gap-3 lg:gap-10 font-medium">
                            <Link className="w-fit relative after:content-[''] after:absolute after:bg-black after:h-[3px] after:w-0 hover:after:w-full after:duration-300 after:left-0 after:-bottom-[3px]" to='/'>Home</Link>
                            <Link className="w-fit relative after:content-[''] after:absolute after:bg-black after:h-[3px] after:w-0 hover:after:w-full after:duration-300 after:left-0 after:-bottom-[3px]" to='/shop'>Shop</Link>
                            <Link className="w-fit relative after:content-[''] after:absolute after:bg-black after:h-[3px] after:w-0 hover:after:w-full after:duration-300 after:left-0 after:-bottom-[3px]" to='/blog'>Blog</Link>
                            <Link className="w-fit relative after:content-[''] after:absolute after:bg-black after:h-[3px] after:w-0 hover:after:w-full after:duration-300 after:left-0 after:-bottom-[3px]" to='/contact'>Contact</Link>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col lg:items-center">
                    <div className="flex flex-col gap-6 lg:gap-12">
                        <p className="text-[#9F9F9F] font-medium">Help</p>
                        <div className="flex flex-col gap-3 lg:gap-10 font-medium">
                            <Link className="w-fit relative after:content-[''] after:absolute after:bg-black after:h-[3px] after:w-0 hover:after:w-full after:duration-300 after:left-0 after:-bottom-[3px]" to='/'>Payment Options</Link>
                            <Link className="w-fit relative after:content-[''] after:absolute after:bg-black after:h-[3px] after:w-0 hover:after:w-full after:duration-300 after:left-0 after:-bottom-[3px]" to='/'>Returns</Link>
                            <Link className="w-fit relative after:content-[''] after:absolute after:bg-black after:h-[3px] after:w-0 hover:after:w-full after:duration-300 after:left-0 after:-bottom-[3px]" to='/'>Privacy Policies</Link>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-6 lg:gap-12">
                    <p className="text-[#9F9F9F] font-medium">Newsletter</p>
                    <form className="text-sm flex flex-col lg:flex-row gap-4 w-full" action="">
                        <input className="focus:outline-none w-full sm:w-fit lg:w-52 border-b-[1px] border-black" placeholder="Enter Your Email Address" type="text" />
                        <button className="border-b-[1px] w-fit border-black font-medium">SUBSCRIBE</button>
                    </form>
                </div>
            </div>
            <div className="border-t-[1px] border-[#D9D9D9] mx-8 py-8 lg:mx-20 lg:py-10">
                <span>2023 furino. All rights reverved</span>
            </div>
        </footer>
    )
}

export default Footer