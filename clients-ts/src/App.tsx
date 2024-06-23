import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import Footer from './components/Footer';
import Checkout from './components/Checkout';

interface CartItem {
  id: string; // Unique identifier for each item
  name: string;
  price: number;
  quantity: number;
}

function App() {
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  if (loading) {
    return <Preloader />;
  }



  const addToCart = (menu: { id: string; name: string; price: number }) => {
    const itemExists = cartItems.find((cartItem) => cartItem.id === menu.id);

    if (itemExists) {
      const updatedCart = cartItems.map((cartItem) =>
        cartItem.id === menu.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      );
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, { ...menu, quantity: 1, id: menu.id }]);
    }
  };

  const removeFromCart = (itemId: string) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
  };

  return (
    <Router>
      <Navbar cartItems={cartItems}  removeFromCart={removeFromCart} />
      <Routes>
        <Route path="/" element={<>
          <Hero />
          <About />
        </>} />
        <Route path="/menu" element={<Menu handleAddToCart={addToCart} cartItems={cartItems} />} />
        <Route path="/checkout" element={<Checkout cartItems={cartItems} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
