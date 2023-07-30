import React from 'react';
import Delete from '@mui/icons-material/Delete';
import { useCart, useDispatchCart } from '../components/ContextReducer';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import './Cart.css'; // Import the custom CSS file

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  const navigate = useNavigate(); // Initialize the useNavigate hook
  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
      </div>
    );
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    let response = await fetch("http://localhost:5000/api/orderData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      })
    });
    console.log("JSON RESPONSE:::::", response.status);
    if (response.status === 200) {
      dispatch({ type: "DROP" });
      navigate("/myOrder"); // Navigate to /myOrder after successful checkout
    }
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);
  return (
    <div>
      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
        <table className='table table-hover '>
          <thead className=' text-success fs-4'>
            <tr>
              <th scope='col' >#</th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
              <th scope='col' ></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope='row' >{index + 1}</th>
                <td className="white-text">{food.name}</td> {/* Apply white text color */}
                <td className="white-text">{food.qty}</td> {/* Apply white text color */}
                <td className="white-text">{food.size}</td> {/* Apply white text color */}
                <td className="white-text">{food.price}</td> {/* Apply white text color */}
                <td >
                  <button type="button" className="btn p-0"><Delete onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button> 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="white-text"><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div> {/* Apply white text color */}
        <div>
          <button className='btn bg-success mt-5' onClick={handleCheckOut} >Check Out</button>
        </div>
      </div>
    </div>
  );
}