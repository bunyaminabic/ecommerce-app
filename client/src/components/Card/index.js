import { Box, Image, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Card({ item }) {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="3">
      <Link to="#/">
        <Image
          style={{ width: "300px", height: "200px" }}
          src={item.image}
          alt="product"
          loading="lazy"
        />
        <Box p="6">
          <Box d="plex" alignItems="baseline">
            {item?.rating.rate}
          </Box>
          <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
            {item?.title}
          </Box>
          <Box>{item?.price} TL</Box>
        </Box>
      </Link>

      <Button colorScheme="pink">Add to basket</Button>
    </Box>
  );
}

export default Card;
