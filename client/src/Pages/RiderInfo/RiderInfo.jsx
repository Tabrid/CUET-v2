import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../../Context/AuthContext";

function RiderInfo() {
    const [data, setData] = useState([]);
    const [selectedRoute, setSelectedRoute] = useState('');
    const { refresh , setRefresh } = useAuthContext();
    useEffect(() => {
        fetch('/api/users/rider')
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
    }, [refresh]);

    const handleApprove = (riderId) => {
        fetch(`/api/users/riders/varified/${riderId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ route: selectedRoute }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Success:', data);
                toast.success('Rider approved successfully');
                setRefresh(!refresh);
            })
            .catch((error) => {
                console.error('Error:', error);
                toast.error('Error approving rider');
            });
    };

    const handleRouteChange = (event) => {
        const selectedRoute = event.target.value;
        setSelectedRoute(selectedRoute);
    };

    return (
        <div className="px-4">
            <h1 className="text-xl font-semibold text-center my-3">Rider Information</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {data.map((item) => (
                    <div key={item._id} className="bg-white rounded-lg shadow-md p-4">
                        <div className="flex items-center">
                            <img className="h-20 w-20 rounded-full" src={item.image} alt="Profile" />
                            <div className="ml-4">
                                <h2 className="text-lg font-semibold">{item.fullName}</h2>
                                <p className="text-gray-600">{item.username}</p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <p><strong>Email:</strong> {item.email}</p>
                            <p><strong>Phone:</strong> {item.phone}</p>
                            {!item.varified && (
                                <div className="mt-4 space-x-4">
                                    <select onChange={(event) => handleRouteChange(event)} className="border border-gray-300 rounded-md px-2 py-1">
                                        <option value="">Select Route</option>
                                        <option value="route1">Route 1</option>
                                        <option value="route2">Route 2</option>
                                        <option value="route3">Route 3</option>
                                        <option value="personal">Personal</option>
                                    </select>
                                    <button onClick={() => handleApprove(item._id)} className="bg-green-500 text-white py-1 px-4 rounded-md mr-2">Approve</button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RiderInfo;
