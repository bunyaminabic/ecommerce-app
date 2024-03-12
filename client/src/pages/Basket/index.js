import React from "react";
import { Link } from "react-router-dom";
import { useBasket } from "../../contexts/BasketContext";
import { Alert, Box, Button, Image, Text } from "@chakra-ui/react";

function Basket() {
  const { items, removeFromBasket } = useBasket();
  const total = items.reduce((acc, obj) => acc + obj.price, 0);

  const handleRemoveFromBasket = (productId) => {
    removeFromBasket(productId);
  };

  return (
    <Box p="5">
      {items.length < 1 && (
        <Alert status="warning">You have not any items in your basket.</Alert>
      )}

      {items.length > 0 && (
        <>
          <ul>
            {items.map((item) => (
              <li key={item.id} style={{ marginBottom: 15 }}>
                <Link to={`/product/${item.id}`}>
                  {item.title}-{item.price} TL
                  <Image htmlWidth={200} src={item.image} alt="basket item" />
                </Link>
                <Button
                  mt="2"
                  size="sm"
                  colorScheme="pink"
                  onClick={() => handleRemoveFromBasket(item.id)}
                >
                  Remove from basket
                </Button>
              </li>
            ))}
          </ul>
          <Box mt="10">
            <Text fontSize="22">Total: {total} </Text>
          </Box>
        </>
      )}
    </Box>
  );
}

export default Basket;
