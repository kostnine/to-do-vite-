import React, { useState, useEffect } from "react";
import "./App.css";

const products = [
  { id: 1, name: "Produktas A", price: 10 },
  { id: 2, name: "Produktas B", price: 15 },
  { id: 3, name: "Produktas C", price: 20 },
];

//useState būsena – saugoti krepšelio informaciją
const Cart = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0); // Bendra suma

  // Krepšelio atstatymas iš localStorage kai puslapis užsikrauna
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Išsaugoti krepšelį į localStorage kiekvieną kartą, kai jis keičiasi
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.removeItem("cart"); // Jei nėra prekių, išvalome localStorage
    }

    // Apskaičiuojame bendrą sumą
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(total);
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };
  //Tikrinama, ar prekė jau yra krepšelyje:
//Jei yra, jos kiekis padidinamas +1
//Jei nėra, ji pridedama su quantity: 1

  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === id);
      if (existingItem.quantity > 1) {
        return prevCart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      return prevCart.filter((item) => item.id !== id);
    });
  };
  //Jei prekės kiekis > 1, sumažinamas jos kiekis
//Jei prekė turėjo tik 1 vnt., ji pašalinama iš krepšelio

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart"); // Išvalyti localStorage
  };
//Krepšelis nustatomas į tuščią masyvą []
//Iš localStorage pašalinamos visos prekės
  return (
    <div className="cart-container">
      <h2>Pirkinių Krepšelis</h2>
      <h3>Produktai</h3>
      <div>
        {products.map((product) => (
          <div key={product.id} className="product">
            <span>{product.name} - ${product.price}</span>
            <button className="add-btn" onClick={() => addToCart(product)}>Pridėti</button>
          </div>
        ))}
      </div>

      <h3>Krepšelis</h3>
      {cart.length === 0 ? (
        <p>Krepšelis tuščias</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <span>{item.name} - ${item.price} x {item.quantity}</span>
              <button className="delete-btn" onClick={() => removeFromCart(item.id)}>Pašalinti</button>
            </div>
          ))}
          {/* Bendros sumos atvaizdavimas */}
          <h3 className="total-price">Bendra suma: ${totalPrice.toFixed(2)}</h3>
          <button className="clear-btn" onClick={clearCart}>Išvalyti krepšelį</button>
        </>
      )}
    </div>
  );
};

export default Cart;
