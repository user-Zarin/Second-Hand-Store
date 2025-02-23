import React from "react";
import historyData from "../assets/assets";
import { Delete } from "@material-ui/icons";
import Header from "../components/Header";
import Footer from "../components/Footer";
const AddToCart = () => {
  return (
    <>
      <Header />
      <div className=" min-h-screen p-10 bg-amber-50 m-10 pt-14 ">
        <div className="text-2xl mb-3">
          <h1 className="font-bold text-3xl text-blue-900">Shopping Cart</h1>
        </div>
        <div>
          {historyData.map((item, index) => {
            return (
              <div
                key={index}
                className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr]  sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
              >
                <div className="flex items-start gap-6">
                  <img className="w-16 sm:w-20" src={item.image} />
                  <div>
                    <p className="text-xs sm:text-lg font-medium">
                      {item.product}
                    </p>
                    <div className="flex items-center gap-5 mt-2">
                      <p className="px-2 sm:px-3 sm:py-1 borderbg-slate-50">
                        Rs. {item.amount}
                      </p>
                    </div>
                  </div>
                </div>

                <Delete className="w-4 cursor-pointer mr-4 sm:w-5" />
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};
export default AddToCart;
