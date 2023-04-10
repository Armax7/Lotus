import axios from "axios";
import { useState, useEffect } from "react";
import * as Chakra from "@chakra-ui/react";
import { getStripe } from "../../lib/stripeLoader";
import * as Components from "../../components";
import style from "../../styles/Cart.module.css";

function Cart({ success }) {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [stripeItems, setStripeItems] = useState([]);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    const stripeItemsHolder = cartItems.map(
      (item) => {
        return { price: item.price_id, quantity: item.quantity };
      },
      [cartItems]
    );

    let totalHolder = 0;
    cartItems.forEach((item) => {
      totalHolder += item.price * item.quantity;
    });

    setCart(cartItems);
    setStripeItems(stripeItemsHolder);
    setTotal(totalHolder);
  }, []);

  function onDelete(name) {
    const updatedCart = cart.filter((item) => item.name !== name);

    const stripeItemsHolder = updatedCart.map((item) => {
      return { price: item.price_id, quantity: item.quantity };
    });

    let totalHolder = 0;
    updatedCart.forEach((item) => {
      totalHolder += item.price * item.quantity;
    });

    setCart(updatedCart);
    setStripeItems(stripeItemsHolder);
    setTotal(totalHolder);

    localStorage.setItem("cartItems", JSON.stringify(updatedCart));

    if (updatedCart.length === 0) {
      handleCheckout();
    }
  }

  function handleOnSubmit(event) {
    event.preventDefault();
    handleCheckout();
  }

  async function handleCheckout() {
    localStorage.removeItem("cartItems");

    const stripe = await getStripe();
    const {
      data: { id },
    } = await axios.post("/api/checkout", { items: stripeItems });

    const result = await stripe.redirectToCheckout({ sessionId: id });
    if (success === "true") {
      setStripeItems([]);
      setTotal(0);

      localStorage.removeItem("cartItems");
    }
  }

  return (
    <div className={style.container}>
      {cart.length ? (
        <div className={style.wrapper}>
          <div className={style.cards}>
            {cart.map((cartItem, index) => (
              <Components.CartCard
                key={index}
                product={cartItem}
                onDelete={() => onDelete(cartItem.name)}
              />
            ))}
          </div>
          <form className={style.form} onSubmit={handleOnSubmit}>
            <Chakra.Flex>
              <Chakra.Box>
                <Chakra.FormControl
                  display={"flex"}
                  flexDir={"column"}
                >
                  <Chakra.Text as={"b"} fontSize={"5xl"}>
                    Total: ${total}
                  </Chakra.Text>
                  <Chakra.Button
                    onClick={handleCheckout}
                    type="submit"
                    role="link"
                    bg={"var(--color1)"}
                    color={"var(--color5)"}
                  >
                    Ir a pagar
                  </Chakra.Button>
                </Chakra.FormControl>
              </Chakra.Box>
            </Chakra.Flex>
          </form>
        </div>
      ) : (
        <Components.CartEmpty />
      )}
    </div>
  );
}

export default Cart;
