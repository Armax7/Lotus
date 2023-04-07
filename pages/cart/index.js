import { useState, useEffect } from "react";
import * as Components from "../../components";

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCart(cartItems);
  }, []);

  function onDelete(name) {
    const updatedCart = cart.filter((item) => item.name !== name);
    setCart(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  }

  return (
    <>
      {cart.length ? (
        <div style={{ margin: "40px 0" }}>
          {cart.map((cartItem, index) => (
            <Components.CartCard
              key={index}
              product={cartItem}
              onDelete={() => onDelete(cartItem.name)}
            />
          ))}
        </div>
      ) : (
        <Components.CartEmpty />
      )}
    </>
  );
}

export default Cart;
