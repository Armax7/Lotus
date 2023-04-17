import axios from "axios";
import React, { useEffect, useState } from "react";
import * as Chakra from "@chakra-ui/react";
import { getStripe } from "../../lib/stripeLoader";
import * as Components from "../../components";
import style from "../../styles/Cart.module.css";
import * as SupaHelpers from "../../helpers/supabase_helpers/user_management";
import * as ErrorStr from "../../helpers/error_check_strings";

function getLocalStorageCart() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  return { source: "local", items: cartItems || [] };
}

async function getDatabaseCart() {
  const id = await SupaHelpers.getUserId();
  const response = await axios
    .get(`${process.env.NEXT_PUBLIC_HOST}/api/cart?user_id=${id}`)
    .then((resp) => resp.data);
  return { source: "database", items: response || [] };
}

function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [stripeItems, setStripeItems] = useState([]);
  const [logged, setLogged] = useState(false);
  const [notAvailable, setNotAvailable] = useState(false);
  const [cartSource, setCartSource] = useState(null);

  async function loguearse() {
    let data = await SupaHelpers.loggedStatus();

    setLogged(data);
    return data;
  }

  async function getCart() {
    const result = await loguearse();
    if (!result) {
      const localStorageCart = getLocalStorageCart();
      var cart = localStorageCart; // por defecto, utiliza la información del carrito del almacenamiento local
      var source = localStorageCart.source;
    }
    if (result) {
      // si el usuario está logueado, obtiene el carrito desde la API
      const localStorageCart = getLocalStorageCart();
      const databaseCart = await getDatabaseCart();
      var cart = databaseCart
      cart.items = [...databaseCart.items, ...localStorageCart.items]
      cart.items = cart.items.filter((item, index) => {
        return index === cart.items.findIndex(obj => {
          return obj.name === item.name;
        });
      });

      var source = databaseCart.source;
    }

    setCartSource(source);

    const stripeItems = cart.items.map((item) => ({
      price: item.price_id,
      quantity: item.quantity,
    }));

    const total = cart.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    setCart(cart.items);
    setStripeItems(stripeItems);
    setTotal(total);
  }

  useEffect(() => {
    async function fetchData() {
      await getCart();
    }
    fetchData();
  }, []);

  async function updateCart(updatedCart) {
    if (logged) {
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      const id = await SupaHelpers.getUserId();
      await axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/cart`, {
        user_id: id,
        items: updatedCart,
      });
    } else {
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    }
  }

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

    updateCart(updatedCart);
  }

  async function handleCheckout(event) {
    event.preventDefault();

    try {
      const {
        data: { id },
      } = await axios.post("/api/checkout", { items: stripeItems });
      const stripe = await getStripe();
      const result = await stripe.redirectToCheckout({ sessionId: id });
    } catch (error) {
      console.log(error);
      console.log(
        error.response.data.message.endsWith(ErrorStr.PRODUCT_NOT_ACTIVE)
      );
      setNotAvailable(
        error.response.data.message.endsWith(ErrorStr.PRODUCT_NOT_ACTIVE)
      );
    }
  }

  const [isLargerThan590] = Chakra.useMediaQuery("(min-width: 590px)");

  return (
    <div className={style.container}>
      {cart.length ? (
        <div className={style.wrapper}>
          <div className={style.cards} >
            {cart.map((cartItem, index) => {
              return (
                <Components.CartCard
                  key={index}
                  product={cartItem}
                  onDelete={() => onDelete(cartItem.name)}
                />
              );
            })}
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
                      _hover={{
                        background: "var(--color1-3)",
                        transform: "translateY(-4px)",
                      }}
                    >
                      Ir a pagar
                    </Chakra.Button>
                  ) : (
                    <Components.Register />
                  )}
                </Chakra.FormControl>
                {notAvailable && (
                  <Chakra.Alert
                    status="error"
                    margin="50px 0 15px 0"
                    flexFlow={"column wrap"}
                    justifyContent={"flex-start"}
                    maxW={"400px"}
                    minWidth={"210px"}
                  >
                    <Chakra.Flex>
                      <Chakra.AlertIcon />
                      <Chakra.AlertTitle>Lo sentimos...</Chakra.AlertTitle>
                    </Chakra.Flex>
                    <Chakra.AlertDescription textAlign={"center"}>
                      Alguna de estas obras ya no está disponible
                    </Chakra.AlertDescription>
                  </Chakra.Alert>
                )}
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
