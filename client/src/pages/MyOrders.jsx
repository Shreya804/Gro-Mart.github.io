import React, { useEffect, useState } from 'react';
import { dummyOrders } from '../assets/assets';
import { currency } from "../config";

const MyOrders = () => {
const [myOrders, setMyOrders] = useState([]);

const fetchMyOrders = async () => {
    setMyOrders(dummyOrders);
};

useEffect(() => {
    fetchMyOrders();
}, []);

return (
    <div className='mt-16 pb-16'>
<div className='flex flex-col items-end w-max mb-8'>
        <p className='text-2xl font-medium uppercase'>My orders</p>
        <div className='w-16 h-0.5 bg-primary rounded-full'></div>
      </div>

      {myOrders.map((order, index) => (
        <div
          key={index}
          className='border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl'
        >
          <p className='mb-4'>
            <span className='block'>OrderId: {order._id}</span>
            <span className='block'>Payment: {order.paymentType}</span>
            <span className='block'>Total Amount: {currency}{order.amount}</span>
          </p>

          {order.items.map((item, idx) => (
            <div
              key={idx}
              className={`relative bg-white text-gray-500/70 border-gray-300 flex flex-col md:flex-row md:items-center justify-between p-4 py-5 md:gap-16 w-full max-w-4xl ${
                order.items.length !== idx + 1 ? "border-b" : ""
              }`}
            >
              <div className='flex items-center mb-4 md:mb-0'>
                <div className='bg-primary/10 p-4 rounded-lg'>
                  <img
                    src={item.product.image[0]}
                    alt={item.product.name}
                    className='w-16 h-16'
                  />
                </div>

                <div className='ml-4'>
                  <h2 className='text-xl font-medium text-gray-800'>
                    {item.product.name}
                  </h2>
                  <p>Category: {item.product.category}</p>
                </div>
              </div>

              <div className='flex  flex-col justify-center  md:ml-8 mb-4 md:mb-0'>
                <p>Quantity: {item.quantity ||"1"}</p>
                <p>Status: {order.status}</p>
                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>

              <p className='text-primary text-lg font-medium mt-2'>
                Amount: {currency}{item.product.offerPrice * item.quantity}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
