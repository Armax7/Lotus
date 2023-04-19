import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import * as Chakra from "@chakra-ui/react";
import { getStripe } from "../../lib/stripeLoader";
import * as Components from "../../components";
import style from "../../styles/Cart.module.css";
import * as SupaHelpers from "../../helpers/supabase_helpers/user_management";
import * as ErrorStr from "../../helpers/error_check_strings";

function getLocalStorageFavorite() {
  const favoriteItems = JSON.parse(localStorage.getItem("favoriteItems")) || [];
  return { source: "local", items: favoriteItems || [] };
}

async function getDatabaseFavorite() {
  const id = await SupaHelpers.getUserId();
  const response = await axios
    .get(`${process.env.NEXT_PUBLIC_HOST}/api/favorite?user_id=${id}`)
    .then((resp) => resp.data);
  return { source: "database", items: response || [] };
}

function Favorite() {
  const [favorite, setFavorite] = useState([]);
  const [logged, setLogged] = useState(false);
  

  async function loguearse() {
    let data = await SupaHelpers.loggedStatus();

    setLogged(data);
    return data;
  }

  async function getFavorite() {
    const result = await loguearse();
    if (!result) {
      const localStorageFavorite = getLocalStorageFavorite();
      var favorite = localStorageFavorite; // por defecto, utiliza la información del carrito del almacenamiento local
      var source = localStorageFavorite.source;
    }
    if (result) {
      // si el usuario está logueado, obtiene el carrito desde la API
      const localStorageFavorite = getLocalStorageFavorite();
      const databaseFavorite = await getDatabaseFavorite();
      var favorite = databaseFavorite
      favorite.items = [...databaseFavorite.items, ...localStorageFavorite.items]
      favorite.items = favorite.items.filter((item, index) => {
        return index === favorite.items.findIndex(obj => {
          return obj.name === item.name;
        });
      });

      var source = databaseFavorite.source;
    }

   /*  setFavoriteSource(source); */

   
    
    setFavorite(favorite.items);
   
  }

  useEffect(() => {
    async function fetchData() {
      await getFavorite();
    }
    fetchData();
  }, []);

  async function updateFavorite(updatedFavorite) {
    if (logged) {
      localStorage.setItem("favoriteItems", JSON.stringify(updatedFavorite));
      const id = await SupaHelpers.getUserId();
      await axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/favorite`, {
        user_id: id,
        items: updatedFavorite,
      });
    } else {
      localStorage.setItem("favoriteItems", JSON.stringify(updatedFavorite));
    }
  }

  function onDelete(name) {
    const updatedFavorite = favorite.filter((item) => item.name !== name);

    

   

    setFavorite(updatedFavorite);
    

    updateFavorite(updatedFavorite);
  }

 

  const [isLargerThan590] = Chakra.useMediaQuery("(min-width: 590px)");

  return (
    <div className={style.container}>
      {favorite.length ? (
        <div className={style.wrapper}>
          <div className={style.cards} >
            {favorite.map((favoriteItem, index) => {
              return (
                <Components.CartCard
                  key={index}
                  product={favoriteItem}
                  onDelete={() => onDelete(favoriteItem.name)}
                />
              );
            })}
          </div>
          
        </div>
      ) : (
        <Components.FavoriteEmpty />
      )}
    </div>
  );
}
      

            /*       {logged ? (
                     <Components.FavoriteEmpty />
                    
                  ) : (
                    <Components.BackButton/>
                    
                  )}
              
    </div>
  );
} */

export default Favorite;