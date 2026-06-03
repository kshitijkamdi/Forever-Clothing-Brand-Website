import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { currency } from "../App";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch products");
    }
  };

  // Generic function to update product status (Visibility or Stock)
  const updateProductStatus = async (id, field, value) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/product/updateStatus`,
        { id, [field]: value },
        { headers: { token } },
      );
      if (response.data.success) {
        toast.success(`Product ${field} updated`);
        // Update local state for both the list and the modal
        setList((prev) =>
          prev.map((item) =>
            item._id === id ? { ...item, [field]: value } : item,
          ),
        );
        setSelectedItem((prev) => ({ ...prev, [field]: value }));
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const removeProduct = async (id) => {
    if (
      window.confirm("Are you sure you want to permanently delete this item?")
    ) {
      try {
        const response = await axios.post(
          `${backendUrl}/api/product/remove`,
          { id },
          { headers: { token } },
        );
        if (response.data.success) {
          toast.success("Product removed");
          setSelectedItem(null);
          await fetchList();
        }
      } catch (error) {
        toast.error("Error removing product");
      }
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="p-4 sm:p-8 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-end mb-10 border-b pb-6">
          <div>
            <h1 className="text-3xl font-light tracking-tighter text-black">
              Product Gallery
            </h1>
            <p className="text-gray-400 text-[10px] uppercase tracking-[0.2em] mt-1">
              Inventory Management
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-500">
              {list.length} Items
            </p>
          </div>
        </header>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {list.map((item, index) => (
            <div
              key={index}
              onClick={() => setSelectedItem(item)}
              className={`group relative bg-white border border-gray-100 p-2 sm:p-3 rounded-sm hover:shadow-2xl transition-all duration-500 cursor-pointer ${!item.visible ? "opacity-50" : ""}`}
            >
              <div className="relative overflow-hidden aspect-[3/4] bg-gray-50 rounded-sm">
                <img
                  className="w-full h-full object-cover transition-all duration-700 md:group-hover:scale-105"
                  src={item.image[0]}
                  alt={item.name}
                />
                {!item.visible && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-[10px] font-bold uppercase tracking-widest">
                    Hidden from Shop
                  </div>
                )}
              </div>
              <div className="mt-4 flex flex-col sm:flex-row justify-between items-start px-1 gap-1">
                <div className="max-w-full sm:max-w-[70%]">
                  <h3 className="text-xs sm:text-sm font-medium text-gray-900 truncate uppercase tracking-tight">
                    {item.name}
                  </h3>
                  <p className="text-[10px] text-gray-400 uppercase">
                    {item.category} {!item.inStock && "• OUT OF STOCK"}
                  </p>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-gray-800">
                  {currency}
                  {item.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- ITEM DETAILS MODAL --- */}
      {selectedItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2rem] shadow-2xl relative animate-in zoom-in duration-300">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors z-10 text-2xl"
            >
              ✕
            </button>

            <div className="flex flex-col lg:flex-row">
              {/* Product Images Area */}
              <div className="lg:w-[45%] p-8 bg-gray-50">
                <img
                  src={selectedItem.image[0]}
                  alt={selectedItem.name}
                  className="w-full aspect-[3/4] object-cover rounded-2xl shadow-xl mb-6"
                />
                <div className="grid grid-cols-4 gap-3">
                  {selectedItem.image.slice(1).map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      className="aspect-square object-cover rounded-xl border border-gray-200"
                      alt=""
                    />
                  ))}
                </div>
              </div>

              {/* Product Info Area */}
              <div className="lg:w-[55%] p-8 sm:p-12">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] bg-black text-white px-3 py-1 rounded-full uppercase tracking-widest font-black">
                      {selectedItem.category}
                    </span>
                    <h2 className="text-3xl font-bold text-gray-900 mt-4 leading-tight uppercase tracking-tighter">
                      {selectedItem.name}
                    </h2>
                    <p className="text-2xl font-light text-gray-600 mt-2">
                      {currency}
                      {selectedItem.price}
                    </p>
                  </div>
                </div>

                {/* --- TOGGLE MENUS --- */}
                <div className="grid grid-cols-1 gap-6 mt-8 border-t border-b border-gray-50 py-8">
                  {/* Visibility Toggle */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-gray-900 uppercase">
                        Product Visibility
                      </p>
                      <p className="text-[10px] text-gray-400">
                        {/* Use optional chaining and default to true for old products */}
                        {(selectedItem?.visibility ?? true)
                          ? "Visible to customers"
                          : "Hidden from shop"}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        // If visibility is undefined (old product), treat it as checked (true)
                        checked={selectedItem?.visibility ?? true}
                        onChange={() =>
                          updateProductStatus(
                            selectedItem._id,
                            "visible",
                            !(selectedItem?.visibility ?? true),
                          )
                        }
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-black after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                    </label>
                  </div>

                  {/* Out of Stock Toggle */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-gray-900 uppercase">
                        Availability Override
                      </p>
                      <p className="text-[10px] text-gray-400">
                        {(selectedItem?.markOutOfStock ?? false)
                          ? "Forcefully Out of Stock"
                          : "Available for Purchase"}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        // If markOutOfStock is undefined (old product), treat it as unchecked (false)
                        checked={selectedItem?.markOutOfStock ?? false}
                        onChange={() =>
                          updateProductStatus(
                            selectedItem._id,
                            "outOfStock",
                            !(selectedItem?.markOutOfStock ?? false),
                          )
                        }
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-black after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                    </label>
                  </div>
                </div>
                {/* --- SIZE & INVENTORY DISPLAY --- */}
                <div className="mt-10">
                  <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-4">
                    Inventory by Size
                  </p>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                    {(() => {
                      const rawData = selectedItem.sizes;

                      // 1. Handle Null or Undefined
                      if (!rawData)
                        return (
                          <p className="text-xs text-gray-400">No size data</p>
                        );

                      let parsedData = [];

                      // 2. Try to normalize data into an array
                      try {
                        if (typeof rawData === "string") {
                          // Check if it's a JSON string like "[{...}]"
                          if (
                            rawData.startsWith("[") ||
                            rawData.startsWith("{")
                          ) {
                            parsedData = JSON.parse(rawData);
                          } else {
                            // It's a raw string like "L,M,XL"
                            parsedData = rawData
                              .split(",")
                              .map((s) => ({ size: s.trim(), stock: "N/A" }));
                          }
                        } else if (Array.isArray(rawData)) {
                          // It's already an array
                          parsedData = rawData;
                        }
                      } catch (e) {
                        console.error("Parsing error", e);
                        return (
                          <p className="text-xs text-red-400">Format Error</p>
                        );
                      }

                      // 3. Render the normalized array
                      return parsedData.map((item, i) => {
                        // Handle both object format {size, stock} and simple string format
                        const sizeLabel =
                          typeof item === "object" ? item.size : item;
                        const stockCount =
                          typeof item === "object" ? item.stock : "Legacy";

                        return (
                          <div
                            key={i}
                            className="flex flex-col items-center p-3 bg-gray-50 rounded-xl border border-gray-100"
                          >
                            <p className="text-xs font-bold text-gray-900">
                              {sizeLabel}
                            </p>
                            <p
                              className={`text-[10px] font-medium mt-1 ${stockCount > 0 ? "text-green-600" : "text-gray-400"}`}
                            >
                              {stockCount}{" "}
                              {typeof stockCount === "number" ? "Qty" : ""}
                            </p>
                          </div>
                        );
                      });
                    })()}
                  </div>
                </div>

                {/* --- DESCRIPTION --- */}
                <div className="mt-10">
                  <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-2">
                    Details
                  </p>
                  <p className="text-sm text-gray-500 leading-relaxed italic">
                    {selectedItem.description}
                  </p>
                </div>

                <div className="mt-12 flex gap-4">
                  <button
                    onClick={() => removeProduct(selectedItem._id)}
                    className="flex-1 bg-red-50 text-red-600 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-red-600 hover:text-white transition-all shadow-xl shadow-red-100"
                  >
                    Delete Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
