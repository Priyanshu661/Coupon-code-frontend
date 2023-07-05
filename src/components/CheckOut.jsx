import React, { useState } from 'react';
import axios from 'axios';


const CheckOut = () => {
const [couponCode, setCouponCode] = useState('');
const [discountAmount, setDiscountAmount] = useState(0);
const [finalPrice, setFinalPrice] = useState(0);
const [error, setError] = useState(null);
const [loading,setLoading]=useState(false)

const handleCheckout = async () => {
  setError(null);
    setLoading(true)
  try {
    const response = await axios.post('https://coupon-code.onrender.com/checkout', {
      couponCode,
      totalPrice: 100, 
    });

    const { discountAmount, finalPrice } = response.data;
    setDiscountAmount(discountAmount);
    setFinalPrice(finalPrice);
    setLoading(false)
    
  } catch (error) {
    setCouponCode("")
    setError(error.response.data.error);
    setLoading(false)
  }
};


  return (
  <div className="container">
    <input
      type="text"
      placeholder="Enter coupon code"
      value={couponCode}
      onChange={(e) => setCouponCode(e.target.value)}
      className="input-field"
    />
    <button disabled={loading} onClick={handleCheckout} className="checkout-btn">
      {loading?"loading":"Checkout"}
    </button>
    {discountAmount > 0 && (
      <div className="result">
      <p>Coupon-Code: {couponCode}</p>
        <p>Discount amount: {discountAmount}</p>
        <p>Final price: {finalPrice}</p>
      </div>
    )}
    {error && <p className="error">Error: {error}</p>}
  </div>
);


}

export default CheckOut