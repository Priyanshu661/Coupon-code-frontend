import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Coupon = () => {
  const [coupons, setCoupons] = useState([]);
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discountType: 'percentage',
    discountAmount: 0,
    expirationDate: '',
  });
const [loading,setLoading]=useState(false)

  useEffect(() => {
    getCoupons();
  }, []);

  const getCoupons = async () => {
     setLoading(false)
    try {
      const response = await axios.get('https://coupon-code.onrender.com/coupons');
      setCoupons(response.data);
       setLoading(false)
    } catch (error) {
      console.error(error);
      setLoading(false)
    }
  };

  const createCoupon = async () => {
    setLoading(true)
    try {
     
      const response = await axios.post('https://coupon-code.onrender.com/coupons', newCoupon);
      setCoupons([...coupons, response.data]);
      setNewCoupon({
        code: '',
        discountType: 'percentage',
        discountAmount: 0,
        expirationDate: '',
      });
       setLoading(false)
    } catch (error) {
      console.error(error);
      setLoading(false)
    }
  };

  const deleteCoupon = async (id) => {
   
    try {
      await axios.delete(`https://coupon-code.onrender.com/coupons/${id}`);
      setCoupons(coupons.filter((coupon) => coupon._id !== id));
      setLoading(false)
    } catch (error) {
      console.error(error);
      setLoading(false)
    }
  };

  return (
    <div className="container">
      <h1>Coupon Codes</h1>
      <ul className="coupon-codes">
        {coupons.map((coupon) => (
          <li key={coupon._id}>
            {coupon.code} - {coupon.discountAmount} {coupon.discountType}
            <button className='del-coupon' onClick={() => deleteCoupon(coupon._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Create Coupon</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createCoupon();
        }}
      >
        <input
          type="text"
          placeholder="Coupon Code"
          value={newCoupon.code}
          onChange={(e) =>
            setNewCoupon({ ...newCoupon, code: e.target.value })
          }
          required
          className="input-field"
        />
        <input
          type="text"
          placeholder="Discount Amount"
          value={newCoupon.discountAmount}
          onChange={(e) =>
            setNewCoupon({ ...newCoupon, discountAmount: e.target.value })
          }
          required
          className="input-field"
        />
        <select
          value={newCoupon.discountType}
          onChange={(e) =>
            setNewCoupon({ ...newCoupon, discountType: e.target.value })
          }
          required
          className="input-field"
        >
          <option value="percentage">Percentage</option>
          <option value="fixed">Fixed Amount</option>
        </select>
        <input
          type="date"
          placeholder="Expiration Date"
          value={newCoupon.expirationDate}
          onChange={(e) =>
            setNewCoupon({ ...newCoupon, expirationDate: e.target.value })
          }
          required
          className="input-field"
        />
        <button disabled={loading} type="submit" className="submit-btn">
        {loading?"Creating":"Create"}
        </button>
      </form>
    </div>
  );

}

export default Coupon