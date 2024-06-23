// src/components/Navbar.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface NavbarProps {
  cartItems: CartItem[];
  removeFromCart: (itemId: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartItems, removeFromCart }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <>
      <div className="navbar bg-transparent backdrop-blur-xl shadow-xl fixed top-0 z-10 w-full">
        <div className="flex-1 flex items-center">
          <img src="/animated-icon.gif" alt="icon" className="w-16 -top-2 relative" />
          <Link to="/" className="btn btn-ghost text-xl uppercase font-bold text-orange-600 underline-animation ml-4">
            Ngopi Bro
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Link to="/menu" className="btn btn-ghost text-xl uppercase font-bold text-orange-600 underline-animation">
            Menu
          </Link>
          <Link to="/contact" className="btn btn-ghost text-xl uppercase font-bold text-orange-600 underline-animation">
            Contact
          </Link>
          <Link to="/profile" className="btn btn-ghost text-xl uppercase font-bold text-orange-600 underline-animation">
            Profile
          </Link>
        </div>

        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0 2 2 0 014 0z" />
                </svg>
                {cartItems.length > 0 && (
                  <span className="badge badge-sm indicator-item">{cartItems.length}</span>
                )}
              </div>
            </div>

            {cartItems.length > 0 && (
              <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
                <div className="card-body">
                  <span className="font-bold text-lg">{cartItems.length} Items</span>
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between mt-2">
                      <span>{item.name} x {item.quantity} = {item.price * item.quantity} </span>
                      <button className="btn btn-error btn-xs" onClick={() => removeFromCart(item.id)}>Remove</button>
                    </div>
                  ))}
                  <div className="card-actions">
                    <button className="btn btn-primary btn-block" onClick={handleCheckout}>
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="md:hidden flex items-center">
          <button
            className="btn btn-ghost btn-circle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden backdrop-blur-2xl shadow-lg fixed top-16 inset-x-0 z-10">
          <div className="flex flex-col items-center space-y-4 p-4">
            <Link to="/menu" className="btn btn-ghost text-xl uppercase font-bold text-orange-600 underline-animation">
              Menu
            </Link>
            <Link to="/contact" className="btn btn-ghost text-xl uppercase font-bold text-orange-600 underline-animation">
              Contact
            </Link>
            <Link to="/profile" className="btn btn-ghost text-xl uppercase font-bold text-orange-600 underline-animation">
              Profile
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
