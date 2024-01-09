import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
    return (
        <div className="flex items-center justify-center flex-col p-8 lg:p-20 h-[50vh]">
            <h2 className="text-ochre uppercase mb-6 font-bold text-4xl lg:text-6xl">404 Not Found</h2>
            <p className="font-medium text-xl mb-8">Sorry, the page you are looking for does not exist.</p>
            <Link className="border-black border rounded-lg px-8 py-2 hover:bg-black hover:text-white duration-300" to='/'>Go back Home</Link>
        </div>
    );
};

export default NotFound;
