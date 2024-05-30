import React from 'react';
import { Box, Image, Text, Button } from '@chakra-ui/react'; // Import necessary Chakra UI components
import { useCart } from '../Contexts/CartContext';

const CartItem = ({ item }) => {
  console.log("ITem",item)
  const { removeFromCart } = useCart();

  const handleRemoveFromCart = () => {
    removeFromCart(item._id);
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="4" mb="4">
      {/* Display product image */}
      <Image src={item.imageUrl} alt={item.brand} />

      {/* Display product details */}
      <Box mt="3">
        <Text fontWeight="semibold" fontSize="lg" lineHeight="tight">
          {item.brand} - {item.model}
        </Text>
        <Text fontSize="sm" color="gray.500">
          Type: {item.type}
        </Text>
        <Text fontSize="lg" fontWeight="bold" mt="2">
          Price: ${item.price}
        </Text>

        {/* Add button to remove item from cart */}
        <Button mt="3" colorScheme="red" onClick={handleRemoveFromCart}>Remove from Cart</Button>
      </Box>
    </Box>
  );
};

export default CartItem;