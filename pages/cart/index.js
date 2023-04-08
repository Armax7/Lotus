import axios from "axios";
import { useState, useEffect } from "react";
import * as Chakra from "@chakra-ui/react";
import { getStripe } from "../../lib/stripeLoader";
import * as Components from "../../components";
import * as SupaHelpers from "../../helpers/supabase_helpers/user_management";

function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [stripeItems, setStripeItems] = useState([]);
  const [logged, setLogged] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

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

  async function handleOnSubmit(event) {
    event.preventDefault();

    if (!logged) {
      setErrorAlert(true);
      return;
    }

    const {
      data: { id },
    } = await axios.post("/api/checkout", { items: stripeItems });

    const stripe = await getStripe();
    await stripe.redirectToCheckout({ sessionId: id });
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

          <form onSubmit={handleOnSubmit}>
            <Chakra.Flex justify={"flex-end"}>
              <Chakra.Box>
                <Chakra.FormControl>
                  <Chakra.Text as={"b"} fontSize={"5xl"} mr={"5rem"}>
                    Total: {total}
                  </Chakra.Text>
                  <Chakra.Box>
                    <Chakra.Button type="submit" role="link">
                      Ir a pagar
                    </Chakra.Button>
                    {errorAlert && (
                      <Chakra.Alert status="error">
                        Debes iniciar sesión para continuar con el pago.
                      </Chakra.Alert>
                    )}
                  </Chakra.Box>
                </Chakra.FormControl>
              </Chakra.Box>
            </Chakra.Flex>
          </form>
        </div>
      ) : (
        <Components.CartEmpty />
      )}
    </>
  );
}

export default Cart;
