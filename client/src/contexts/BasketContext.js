import { useState, useEffect, createContext, useContext } from "react";

const BasketContext = createContext();

const BasketProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const storedItems = localStorage.getItem("basketItems");
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  const addToBasket = (data, findBasketItem) => {
    let updatedItems;
    if (!findBasketItem) {
      updatedItems = [data, ...items];
    } else {
      updatedItems = items.filter(
        (item) => item.id.toString() !== findBasketItem.id.toString()
      );
    }
    setItems(updatedItems);
    localStorage.setItem("basketItems", JSON.stringify(updatedItems));
  };

  const removeFromBasket = (productId) => {
    const updatedItems = items.filter(
      (item) => item.id.toString() !== productId.toString()
    );
    setItems(updatedItems);
    localStorage.setItem("basketItems", JSON.stringify(updatedItems));
  };

  const values = {
    items,
    setItems,
    addToBasket,
    removeFromBasket,
  };

  return (
    <BasketContext.Provider value={values}>{children}</BasketContext.Provider>
  );
};

const useBasket = () => useContext(BasketContext);

export { BasketProvider, useBasket };
