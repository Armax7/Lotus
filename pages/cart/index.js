import axios from "axios";
import React, { useEffect, useState } from "react";
import * as Chakra from "@chakra-ui/react";
import { getStripe } from "../../lib/stripeLoader";
import * as Components from "../../components";
import style from "../../styles/Cart.module.css";
import * as SupaHelpers from "../../helpers/supabase_helpers/user_management";

function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [stripeItems, setStripeItems] = useState([]);
  const [logged, setLogged] = useState(false);

  const loguearse = async () => {
    let data = await SupaHelpers.loggedStatus();
    setLogged(data);
  };

  useEffect(() => {
    loguearse();
  }, []);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    const stripeItemsHolder = cartItems.map((item) => {
      return { price: item.price_id, quantity: item.quantity };
    });

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
  }

  async function handleCheckout(event) {
    event.preventDefault();

    const {
      data: { id },
    } = await axios.post("/api/checkout", { items: stripeItems });

    const stripe = await getStripe();
    const result = await stripe.redirectToCheckout({ sessionId: id });
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
          <form className={style.form} onSubmit={handleCheckout}>
            <Chakra.Flex>
              <Chakra.Box>
                <Chakra.FormControl display={"flex"} flexDir={"column"}>
                  <Chakra.Text as={"b"} fontSize={"5xl"}>
                    Total: ${total}
                  </Chakra.Text>

                  {logged ? (
                    <Chakra.Button
                      type="submit"
                      role="link"
                      bg={"var(--color1)"}
                      color={"var(--color5)"}
                    >
                      Ir a pagar
                    </Chakra.Button>
                  ) : (
                    <Components.Register />
                  )}
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
