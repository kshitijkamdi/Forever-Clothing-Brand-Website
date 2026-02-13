import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/frontend_assets/assets';

const MyProfile = () => {
    const { token, backendUrl, navigate } = useContext(ShopContext);
    
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        phone: "",
        address: {
            street: "",
            city: "",
            state: "",
            zipcode: "",
            country: ""
        },
        password: "" // Keep empty unless updating
    });

    // Fetch User Data from Backend
    const getUserProfile = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/user/get-profile`, { headers: { token } });
            if (response.data.success) {
                // Merge fetched data with state, keeping structure intact
                setUserData(prev => ({
                    ...prev,
                    ...response.data.user,
                    address: response.data.user.address || prev.address
                }));
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to load profile");
        }
    };

    // Update Profile in Backend
    const updateUserProfile = async () => {
        try {
            const response = await axios.post(`${backendUrl}/api/user/update-profile`, userData, { headers: { token } });
            if (response.data.success) {
                toast.success("Profile updated exquisitely");
                setIsEditing(false);
                await getUserProfile();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (token) {
            getUserProfile();
        } else {
            navigate('/login');
        }
    }, [token]);

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 sm:p-10 bg-white shadow-xl shadow-gray-100 rounded-3xl border border-gray-50 transition-all duration-700">
            <div className="flex justify-between items-center mb-10 pb-5 border-b border-gray-100">
                <h1 className="text-3xl font-light tracking-tighter text-black uppercase">My <span className="font-bold">Profile</span></h1>
                <button 
                    onClick={() => isEditing ? updateUserProfile() : setIsEditing(true)}
                    className={`px-6 py-2 rounded-full text-xs font-bold tracking-widest transition-all uppercase 
                    ${isEditing ? 'bg-green-500 text-white shadow-lg shadow-green-100 hover:bg-green-600' : 'border border-black text-black hover:bg-black hover:text-white'}`}
                >
                    {isEditing ? "Save Changes" : "Edit Profile"}
                </button>
            </div>

            <div className="flex flex-col gap-8">
                {/* Personal Information */}
                <section>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 mb-6">Account Identity</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs text-gray-400 font-medium">Full Name</label>
                            {isEditing ? (
                                <input type="text" className="border-b border-gray-200 outline-none focus:border-black py-1 text-sm font-medium" value={userData.name} onChange={(e) => setUserData({...userData, name: e.target.value})} />
                            ) : (
                                <p className="text-sm font-semibold">{userData.name || "Not set"}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs text-gray-400 font-medium">Email Address</label>
                            <p className="text-sm font-medium text-gray-500">{userData.email}</p> 
                            {/* Typically email is read-only for security, but can be changed if your backend supports it */}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs text-gray-400 font-medium">Phone Number</label>
                            {isEditing ? (
                                <input type="number" className="border-b border-gray-200 outline-none focus:border-black py-1 text-sm font-medium" value={userData.phone} onChange={(e) => setUserData({...userData, phone: e.target.value})} />
                            ) : (
                                <p className="text-sm font-semibold">{userData.phone || "Not set"}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs text-gray-400 font-medium">Password</label>
                            {isEditing ? (
                                <input type="password" placeholder="Enter new password" className="border-b border-gray-200 outline-none focus:border-black py-1 text-sm font-medium italic" onChange={(e) => setUserData({...userData, password: e.target.value})} />
                            ) : (
                                <p className="text-sm font-semibold italic">••••••••</p>
                            )}
                        </div>
                    </div>
                </section>

                <hr className="border-gray-50" />

                {/* Address Section */}
                <section>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 mb-6">Primary Shipping Address</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="sm:col-span-2 flex flex-col gap-2">
                            <label className="text-xs text-gray-400 font-medium">Street</label>
                            {isEditing ? (
                                <input type="text" className="border-b border-gray-200 outline-none focus:border-black py-1 text-sm font-medium" value={userData.address.street} onChange={(e) => setUserData({...userData, address: {...userData.address, street: e.target.value}})} />
                            ) : (
                                <p className="text-sm font-semibold">{userData.address.street || "Add street details"}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs text-gray-400 font-medium">City</label>
                            {isEditing ? (
                                <input type="text" className="border-b border-gray-200 outline-none focus:border-black py-1 text-sm font-medium" value={userData.address.city} onChange={(e) => setUserData({...userData, address: {...userData.address, city: e.target.value}})} />
                            ) : (
                                <p className="text-sm font-semibold">{userData.address.city || "Not set"}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs text-gray-400 font-medium">Zipcode</label>
                            {isEditing ? (
                                <input type="text" className="border-b border-gray-200 outline-none focus:border-black py-1 text-sm font-medium" value={userData.address.zipcode} onChange={(e) => setUserData({...userData, address: {...userData.address, zipcode: e.target.value}})} />
                            ) : (
                                <p className="text-sm font-semibold font-mono">{userData.address.zipcode || "Not set"}</p>
                            )}
                        </div>
                    </div>
                </section>
                
                {isEditing && (
                    <div className="flex gap-4 mt-6">
                        <button onClick={() => setIsEditing(false)} className="flex-1 border py-3 text-xs font-bold tracking-widest uppercase hover:bg-gray-50 transition-all">Cancel</button>
                        <button onClick={updateUserProfile} className="flex-1 bg-black text-white py-3 text-xs font-bold tracking-widest uppercase active:scale-95 transition-all shadow-xl shadow-gray-200">Save Profile</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyProfile;