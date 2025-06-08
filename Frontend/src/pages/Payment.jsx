import React, { useState, useEffect,useContext } from "react";
import UserInfo from "../components/UserInfo";
import jsPDF from "jspdf";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import { UserContext } from "../context/User";

const Payment = () => {
  const [displayMessage, setDisplayMessage] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Cash on delivery");
  const { productId, sellerId } = useParams();
  const [product, setProduct] = useState({});
  const [seller, setSeller] = useState({});
  const [buyer, setBuyer] = useState({});
 const { input } = useContext(UserContext);

  const userId = input?.id || 2;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch product details
        const productResponse = await axios.get(
          `http://localhost:3300/api/product/${productId}`
        );
        setProduct(productResponse.data.product[0]);

        // Fetch seller details
        const sellerResponse = await axios.get(
          `http://localhost:3300/user/${sellerId}`
        );
        setSeller(sellerResponse.data[0]);

        // Fetch buyer details (assuming userId is available)
        const buyerResponse = await axios.get(
          `http://localhost:3300/user/${userId}`
        );
        setBuyer(buyerResponse.data[0]);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, [productId, sellerId]);

  const handleProceed = () => {
    setDisplayMessage(true);
  };

  const handleDownloadInvoice = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Invoice", 10, 10);
    
    doc.text("Product Ordered Successfully!", 10, 20);
    doc.text(`${buyer.name || "N/A"}`, 10, 40);
    doc.text(`${buyer.address || "N/A"}`, 10, 50);
    doc.text(`${buyer.contact || "N/A"}`, 10, 60);
    doc.text("Product Details", 10, 80);

    doc.text(`Product Name: ${product.p_name || "N/A"}`, 10, 90);
    doc.text(`Total Amount: ₹ ${product.price || "N/A"}`, 10, 100);
    doc.text(`Order Date: ${moment().format("YYYY-MM-DD")}`, 10, 110);
    doc.text(`Payment Method: ${paymentMethod}`, 10, 120);

    doc.text("Seller Details", 10, 140);

    doc.text(`Seller Name: ${seller.name || "N/A"}`, 10, 150);
    doc.text(`Seller Contact: ${seller.contact || "N/A"}`, 10, 160);
    doc.text("Thanks for using Secondhand Hub", 10, 180);
    doc.save("invoice.pdf");
  };

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  // Fix Image Parsing
  let parsedImage;
  try {
    if (typeof product.image === "string" && product.image.startsWith("[")) {
      parsedImage = JSON.parse(product.image);
    } else {
      parsedImage = [product.image]; // Treat as a single URL if not JSON
    }
  } catch (error) {
    console.error("Error parsing image JSON:", error);
    parsedImage = [];
  }

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-slate-100">
        {/* Success Message */}
        {displayMessage && (
          <div className="bg-green-100 text-green-700 p-4 rounded-md mb-4 w-full text-center max-w-md">
            <h1 className="font-bold">Product Ordered Successfully!</h1>
            <Link to="/home" className="bg-blue-300 cursor-pointer text-blue-500">
              <h1>Go to Home Page</h1>
            </Link>
          </div>
        )}

        {/* Main Content */}
        <div className="w-full sm:w-5/6 rounded-2xl shadow-lg bg-gradient-to-r from-cyan-400 to-blue-500 md:p-[3px] overflow-hidden">
          <div className="flex flex-col lg:flex-row rounded-xl overflow-hidden justify-around md:justify-items-center bg-white ">
            <div className="left lg:w-[40vw] p-6 w-full">
              <UserInfo />
            </div>

            <div className="right md:w-[40vw] p-6 w-64 items-center">
              <div className="flex flex-col sm:items-center items-start">
                <h1 className="font-extrabold text-lg mb-2">
                  {product.p_name || "Loading..."}
                </h1>
                {parsedImage.length > 0 && (
                  <img
                    src={`http://localhost:3300/uploads/${parsedImage[0]}`}
                    alt={product.p_name || "Product Image"}
                    className="w-56 h-60 rounded-md mb-4"
                  />
                )}
                <h1 className="text-lg font-bold mb-2">Total Amount</h1>
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                  ₹ {product.price || "N/A"}
                </h2>
                <h1 className="text-lg font-bold mb-2">Used</h1>
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                  {product.used_duration || "N/A"}
                </h3>
                <select
                  name="Method"
                  value={paymentMethod}
                  onChange={handlePaymentChange}
                  className="p-2 border border-gray-300 rounded-md w-full max-w-sm"
                >
                  <option value="Cash on delivery">Cash on Delivery</option>
                  <option value="UPI payment">UPI Payment</option>
                  <option value="Credit/Debit card">
                    Credit/Debit Card Payment
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col items-center gap-4">
          <button
            onClick={handleProceed}
            className="text-white px-6 py-2 rounded-md bg-gradient-to-r from-cyan-400 to-blue-500 m-3 transition hover:scale-105"
          >
            Proceed
          </button>
          {displayMessage && (
            <button
              onClick={handleDownloadInvoice}
              className="bg-green-600 text-white px-6 py-2 m-1 rounded-md hover:bg-green-400 transition"
            >
              Download Invoice
            </button>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Payment;
