import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { UserContext } from '../context/User';
import { useNavigate} from 'react-router-dom';
const History = () => {
  const [historyData, setHistoryData] = useState([]);
  const navigate = useNavigate()
  const {input} = useContext(UserContext)
  const userId = input.id
  const getRandomStatus = () => {
    const statuses = ['delivered', 'pending', 'shipping'];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };
  useEffect(() => {
    const fetchOrders = async () => {
      console.log(userId)
      try {// Replace with dynamic user ID if needed
        const response = await axios.get(`https://second-hand-store-production-064f.up.railway.app/api/order_detail/orders/${userId}`);
        const ordersWithStatus = response.data.orders.map(order => ({
          id: order.id,
          p_id:order.product_id,
          product: order.p_name,
          amount: order.price,
          date: new Date(order.date).toLocaleDateString(),
          image: order.image,
          status: getRandomStatus()
        }));
        setHistoryData(ordersWithStatus);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <Header />
      
      <div className='min-h-screen bg-gradient-to-r from-cyan-400 to-blue-600 w-full h-[100vh] m-0 flex flex-col'>
      <div className=" bg-white flex flex-col items-center mx-5 rounded-2xl m-4">
        <div className=" w-[90%] text-center flex justify-center border-b border-blue-900">
          <p className="text-blue-900 font-bold text-2xl p-4 containerSize">Order History</p>
        </div>

        <div className="flex items-center justify-center p-4 w-full text-white">
          <div className="overflow-x-auto  w-full">
            <table className="min-w-full max-sm:text-sm text-center">
              <thead>
                <tr>
                  <th className="py-5 px-8 max-sm:hidden">Order Id</th>
                  <th className="py-5 px-7 text-left max-sm:text-center ">Product Name</th>
                  <th className="py-5 px-7  max-sm:hidden">Amount</th>
                  <th className="py-5 px-7 max-sm:hidden">Date</th>
                  <th className="py-5 px-7  ">Status</th>
                </tr>
              </thead>
              <tbody>
                {historyData.map((item, index) =>{ 
                  let parsedImage;
                  try {
                    if (
                      typeof item.image === "string" && item.image.startsWith("[")
                    ) {
                      parsedImage = JSON.parse(item.image);
                    } else {
                      parsedImage = [item.image]; // Treat as a single URL if not JSON
                    }
                  } catch (error) {
                    console.error("Error parsing image JSON:", error);
                    parsedImage = [];
                  }
                  return (<tr key={index} className="text-gray-300 py-5" >
                    <td className="py-3 px-5  max-sm:hidden text-gray-100">{item.id}</td>
                    <td className="py-3 px-5 flex text-black font-medium justify-left max-sm:justify-evenly items-center cursor-pointer gap-4" 
                    onClick={()=>{navigate(`/product/${item.p_id}`)}}>
                      
                      <img src={`https://second-hand-store-production-064f.up.railway.app/uploads/${parsedImage?.[0]}` || "https://images.unsplash.com/photo-1728443783579-494fdbfd8512?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"} alt="product" className="w-10 mr-2" />
                      {item.product}
                    </td>
                    <td className="py-3 px-5 max-sm:hidden">Rs.{item.amount}</td>
                    <td className="py-3 px-5 max-sm:hidden">{item.date}</td>
                    <td className="px-5 py-3 ">
                      <span
                        className={`${
                          item.status === 'delivered'
                            ? 'bg-green-100 text-green-600'
                            : item.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-600'
                            : 'bg-purple-100 text-purple-600'
                        } px-4 py-1.5 rounded`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>)
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
};

export default History;