import React from "react";
import { useBasket } from "../../contexts/BasketContext";
import { Alert } from "@chakra-ui/react";

function Basket() {
  const { items } = useBasket();
  console.log(items);
  return (
    <div>
      {items.lenght < 1 && (
        <Alert status="waning">You have not any items in your basket.</Alert>
      )}
    </div>
  );
}

export default Basket;
