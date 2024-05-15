


const HealthStatus = () => {

    return (
        <div className='flex flex-col items-center justify-center mt-10'>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10"><div className="radial-progress text-xl flex flex-col justify-center items-center text-orange-600" style={{ "--value": "83", "--size": "12rem", "--thickness": "5px" }} role="progressbar"><h1>83</h1> <h1>Heart Rate</h1></div>
                <div className="radial-progress text-xl flex flex-col justify-center items-center text-red-700" style={{ "--value": "97", "--size": "12rem", "--thickness": "5px" }} role="progressbar"><h1>97%</h1> <h1 className="text-center"> Oxygen <br /> Saturation Level </h1></div>
            </div>
            <h1 className="block mb-2 text-left mt-5 underline text-xl font-semibold">Health Status:</h1>
            <div className="   flex justify-center  p-10">
            
                <div className=" w-full flex gap-5 lg:flex-row flex-col">
                    <div className="border border-white rounded-md p-4 mb-4 w-48 h-24 bg-green-600 text-center">
                        
                        <p className="text-white mt-5 text-xl">Good</p>
                    </div>
                    <div className="border border-gray-300 rounded-md p-4 mb-4 w-48 h-24 text-center bg-slate-200">
                       
                        <p className="text-center mt-5 text-xl">Poor</p>
                    </div>
                   
                </div>
            </div>
        </div>
    )
}

export default HealthStatus;
