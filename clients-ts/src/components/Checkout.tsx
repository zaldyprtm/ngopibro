import React, { useEffect, useState } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CheckoutProps {
  cartItems: CartItem[];
}

const Checkout: React.FC<CheckoutProps> = ({ cartItems }) => {
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    const loadSnapScript = () => {
      return new Promise<void>((resolve) => {
        const existingScript = document.getElementById('midtrans-script');

        if (!existingScript) {
          const script = document.createElement('script');
          script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
          script.id = 'midtrans-script';
          script.setAttribute('data-client-key', 'SB-Mid-client-EwM7w_CRvOiEbXyR'); // Replace with your actual client key
          script.onload = () => {
            resolve();
          };
          document.body.appendChild(script);
        } else {
          resolve();
        }
      });
    };

    const createOrder = async () => {
      try {
        const response = await fetch('https://ngopibro.vercel.app/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cartItems }),
        });
        const data = await response.json();
        setOrderId(data.orderId);

        await loadSnapScript(); // Ensure Snap.js script is loaded

        window.snap.pay(data.token, {
          onSuccess: function(result: any) {
            console.log('success:', result);
            window.location.href = '/';
          },
          onPending: function(result :any) {
            console.log('pending:', result);
            window.location.href = '/';
          },
          onError: function(result: any) {
            console.log('error:', result);
            window.location.href = '/';
          },
          onClose: function() {
            console.log('customer closed the popup without finishing the payment');
            window.location.href = '/';
          },
        });
      } catch (error) {
        console.error('Error creating order:', error);
      }
    };

    createOrder();
  }, [cartItems]);

  return (
    <div>
      <h1>Checkout</h1>
      {orderId ? <p>Order ID: {orderId}</p> : <p>Loading...</p>}
    </div>
  );
};

export default Checkout;
