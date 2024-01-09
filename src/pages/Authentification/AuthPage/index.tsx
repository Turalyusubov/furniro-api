import { useState } from 'react'
import {
    Login,
    Signup
} from '@/pages'

const AuthPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState<boolean>(true)
    return (
        <div className="bg-[#FFF3E3] overflow-x-hidden flex flex-col justify-center items-center p-8 lg:p-20">
            <div className="flex justify-center shadow-lg w-full lg:max-w-[800px] bg-white">
                <div className={`bg-white w-full max-w-[90vh] p-8 lg:p-10 lg:px-16 duration-300`}>
                    {isLogin ?
                        <Login setIsLogin={setIsLogin} /> :
                        <Signup setIsLogin={setIsLogin} />
                    }
                </div>
            </div>
        </div>
    )
}

export default AuthPage
