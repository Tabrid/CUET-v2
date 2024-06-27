import  { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../Hooks/useLogin";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
const Login = () => {
    const { login } = useLogin();
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const username = form.username.value;
        const password = form.password.value;

        await login(username, password);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch('/api/users/user')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setData(data)
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });

    }, []);

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div>
                <img src="https://i.ibb.co/2WDsMHw/image.png" className="max-w-[15rem] lg:max-w-sm rounded-lg " />
                <h1 className="text-center mt-4">Total User: {data.length}</h1>
                </div>
                <div className="flex justify-center items-center  ">
                    <div className="card w-full ">
                        <div className="card-body items-center text-center">
                            <h1 className="text-2xl font-bold ">Login</h1>
                            <form onSubmit={handleSubmit} className="w-full">

                                <input
                                    type="text"
                                    name="username"
                                    placeholder="User Name"
                                    className="input mt-5 input-bordered w-full max-w-xs"
                                    required
                                />
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Password"
                                        className="input mt-5 input-bordered w-full max-w-xs pr-10"
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute top-1/2 transform -translate-y-1/2 right-2 focus:outline-none"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? (
                                          <div className="top-2 right-2 relative"> <FaEye /></div>
                                        ) : (
                                            <div className="top-2 right-2 relative"> <FaEyeSlash /></div>
                                        )}
                                    </button>
                                </div>

                                <br />
                                <Link to="/forgot-password" className="text-sm text-start underline">Forgot Password?</Link>
                                <br />
                                <input className="btn mt-7 w-full max-w-xs bg-slate-300" type="submit" value="LogIn" />
                            </form>

                            <h1 className=" ">Don&apos;t have any account? <Link className="underline" to='/signup'>Create account</Link></h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
