import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import historyData from "../assets/assets.js";
const History = () => {
  return (
    <>
      <Header />
      <div className=" min-h-screen ">
        <div className="bg-blue-500 ">
          <p className="text-white font-bold text-2xl p-4 containerSize ">
            Order History
          </p>
        </div>

        <div className=" flex items-center justify-center align-middle mt-10  p-4 w-full max-sm:w-5xl">
          <div className="overflow-x-auto ">
            <table className="min-w-full bg-white    max-sm:text-sm">
              <thead>
                <tr>
                  <th className="py-5 px-8 border-b  border-r text-left max-sm:hidden">
                    Order Id
                  </th>
                  <th className="py-5 px-7 border-b   border-r text-left">
                    Product Name
                  </th>
                  <th className="py-5 px-7 border-b  border-r text-left max-sm:hidden">
                    Amount
                  </th>
                  <th className="py-5 px-7 border-b  border-r text-left max-sm:hidden">
                    Date
                  </th>
                  <th className="py-5 px-7 border-b text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {historyData.map((item, index) => (
                  <tr key={index} className="text-gray-700 py-5">
                    <td className="py-3 px-5 border-b border-r max-sm:hidden">
                      {item.id}
                    </td>
                    <td className="py-3 px-5 border-b flex  text-black font-mediums  border-r">
                      <img src={item.image[0]} className="w-10 mr-2" />
                      {item.product}
                    </td>
                    <td className="py-3 px-5 border-b  border-r max-sm:hidden">
                      Rs.{item.amount}
                    </td>
                    <td className="py-3 px-5 border-b  border-r max-sm:hidden">
                      {item.date}
                    </td>
                    <td className="px-5 py-3 border-b">
                      <span
                        className={`${
                          item.status === "delivered"
                            ? "bg-green-100 text-green-600"
                            : item.status === "pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-purple-100 text-purple-600"
                        } px-4 py-1.5 rounded`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default History;
