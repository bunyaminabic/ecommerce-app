import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchProduct } from "../../api";
import { Box, Text, Button } from "@chakra-ui/react";
import { useBasket } from "../../contexts/BasketContext";

function ProductDetail() {
  const { product_id } = useParams();
  const { addToBasket, items } = useBasket();

  const { isLoading, isError, data } = useQuery(["product", product_id], () =>
    fetchProduct(product_id)
  );
  if (isLoading) {
    console.log(isLoading);
    return <div>Loding...</div>;
  }

  if (isError) {
    return <div>Error.</div>;
  }

  const findBasketItem = items.find(
    (item) => item.id.toString() === product_id
  );

  console.log(items);
  console.log(product_id);

  return (
    <div>
      <Button
        colorScheme={findBasketItem ? "pink" : "green"}
        onClick={() => addToBasket(data, findBasketItem)}
      >
        {findBasketItem ? "Remove from basket" : "Add to basket"}
      </Button>
      <Text as="h2" fontSize="2xl">
        {data.title}
      </Text>
      <Text>{data.rating.rate}</Text>
      <p>{data.description}</p>
      <Box margin="10">
        <img src={data.image} />
      </Box>
    </div>
  );
}

export default ProductDetail;
