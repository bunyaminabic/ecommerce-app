import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchProduct } from "../../api";
import { Box, Text, Button } from "@chakra-ui/react";

function ProductDetail() {
  const { product_id } = useParams();

  const { isLoading, isError, data } = useQuery(["product", product_id], () =>
    fetchProduct(product_id)
  );
  if (isLoading) {
    console.log(isLoading);
    return <di>Loding...</di>;
  }

  if (isError) {
    return <di>Error.</di>;
  }

  return (
    <div>
      <Button colorScheme="pink">Add to basket</Button>
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
