import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Title from '../components/Title';

const MyProfile = () => {
    const { token, backendUrl, navigate } = useContext(ShopContext);
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        phone: "",
        address: { houseNo: "", landmark: "", street: "", city: "", state: "", zipcode: "", country: "" },
        password: ""
    });

    const getUserProfile = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/user/get-profile`, { headers: { token } });
            if (response.data.success) {
                setUserData(prev => ({
                    ...prev,
                    ...response.data.user,
                    address: { ...prev.address, ...response.data.user.address }
                }));
            }
        } catch (error) {
            toast.error("Failed to load profile");
        }
    };

    const updateUserProfile = async () => {
        try {
            const response = await axios.post(`${backendUrl}/api/user/update-profile`, userData, { headers: { token } });
            if (response.data.success) {
                toast.success("Profile Updated Successfully");
                setIsEditing(false);
                getUserProfile();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Update failed");
        }
    };

    useEffect(() => {
        if (token) getUserProfile();
        else navigate('/login');
    }, [token]);

    // Handle nested changes correctly
    const handleAddressChange = (field, value) => {
        setUserData(prev => ({
            ...prev,
            address: { ...prev.address, [field]: value }
        }));
    };

    return (
        <div className="max-w-3xl mx-auto mt-14 p-8 sm:p-12 bg-white shadow-2xl rounded-[2rem] border border-gray-50">
            <div className="flex justify-between items-end mb-12 border-b pb-8">
                <h1 className="text-3xl font-light tracking-tighter uppercase"><span><Title text1={"MY"} text2={"PROFILE"} /></span></h1>
                <div className="flex gap-4">
                    {isEditing && (
                        <button onClick={() => {setIsEditing(false); getUserProfile();}} className="px-6 py-2 rounded-full text-[10px] font-bold uppercase border border-red-200 text-red-400">
                            Cancel
                        </button>
                    )}
                    <button onClick={() => isEditing ? updateUserProfile() : setIsEditing(true)}
                        className={`px-8 py-2 rounded-full text-[10px] font-bold uppercase transition-all ${isEditing ? 'bg-black text-white' : 'border border-black'}`}>
                        {isEditing ? "Confirm Changes" : "Modify Details"}
                    </button>
                </div>
            </div>

            <div className="space-y-10">
                <section className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {/* Top Level Fields */}
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] uppercase font-bold text-gray-400">Full Name</label>
                        {isEditing ? <input type="text" value={userData.name} onChange={(e) => setUserData({...userData, name: e.target.value})} className="border-b py-1 outline-none focus:border-black" /> : <p className="font-semibold py-1">{userData.name || "---"}</p>}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] uppercase font-bold text-gray-400">Email</label>
                        <p className="text-sm text-gray-400 italic py-1">{userData.email}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] uppercase font-bold text-gray-400">Phone</label>
                        {isEditing ? <input type="number" value={userData.phone} onChange={(e) => setUserData({...userData, phone: e.target.value})} className="border-b py-1 outline-none" /> : <p className="font-semibold py-1">{userData.phone || "---"}</p>}
                    </div>
                </section>

                <hr className="opacity-50" />

                {/* Address Section */}
                <section className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] uppercase font-bold text-gray-400">House No. / Building</label>
                        {isEditing ? <input type="text" value={userData.address.houseNo} onChange={(e) => handleAddressChange('houseNo', e.target.value)} className="border-b py-1 outline-none" /> : <p className="font-semibold py-1">{userData.address.houseNo || "---"}</p>}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] uppercase font-bold text-gray-400">Landmark</label>
                        {isEditing ? <input type="text" value={userData.address.landmark} onChange={(e) => handleAddressChange('landmark', e.target.value)} className="border-b py-1 outline-none" /> : <p className="font-semibold py-1">{userData.address.landmark || "---"}</p>}
                    </div>
                    <div className="sm:col-span-2 flex flex-col gap-1">
                        <label className="text-[10px] uppercase font-bold text-gray-400">Street</label>
                        {isEditing ? <input type="text" value={userData.address.street} onChange={(e) => handleAddressChange('street', e.target.value)} className="border-b py-1 outline-none" /> : <p className="font-semibold py-1">{userData.address.street || "---"}</p>}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] uppercase font-bold text-gray-400">City</label>
                        {isEditing ? <input type="text" value={userData.address.city} onChange={(e) => handleAddressChange('city', e.target.value)} className="border-b py-1 outline-none" /> : <p className="font-semibold py-1">{userData.address.city || "---"}</p>}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] uppercase font-bold text-gray-400">State</label>
                        {isEditing ? <input type="text" value={userData.address.state} onChange={(e) => handleAddressChange('state', e.target.value)} className="border-b py-1 outline-none" /> : <p className="font-semibold py-1">{userData.address.state || "---"}</p>}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] uppercase font-bold text-gray-400">Zipcode</label>
                        {isEditing ? <input type="text" value={userData.address.zipcode} onChange={(e) => handleAddressChange('zipcode', e.target.value)} className="border-b py-1 outline-none" /> : <p className="font-semibold py-1">{userData.address.zipcode || "---"}</p>}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] uppercase font-bold text-gray-400">Country</label>
                        {isEditing ? <input type="text" value={userData.address.country} onChange={(e) => handleAddressChange('country', e.target.value)} className="border-b py-1 outline-none" /> : <p className="font-semibold py-1">{userData.address.country || "---"}</p>}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default MyProfile;