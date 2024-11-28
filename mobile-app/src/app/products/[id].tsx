import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Stack, useLocalSearchParams } from "expo-router";
import products from "@/assets/products.json";
import { Card } from "@/components/ui/card";
import { Image } from "@/components/ui/image";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Button, ButtonText } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/apiHelper/products";
import { ActivityIndicator } from "react-native";
import { useCart } from "@/src/store/cartStore";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const addProduct = useCart((state) => state.addProduct);
  const cartItems = useCart((state) => state.items);
  // const myProduct = products.find((product) => product.id === Number(id));

  const {
    data: myProduct,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", id],
    queryFn: () => getProductById(Number(id)),
  });

  const addToCart = () => {
    addProduct(myProduct);
  };
  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Product not found</Text>;
  }

  return (
    <Box className="bg-white flex-1 items-center">
      <Card className="p-5 rounded-lg  max-w-[960px] w-full flex-1">
        <Stack.Screen
          options={{
            headerTitle: `${myProduct.name}`,
            headerLeft: undefined,
            headerBackButtonDisplayMode: "minimal",
          }}
        />

        <Image
          source={{
            uri: myProduct.image,
          }}
          className="mb-6 h-[240px] w-full rounded-md "
          alt={`${myProduct.name} image`}
          resizeMode="contain"
        />
        <Text className="text-sm font-normal mb-2 text-typography-700">
          {myProduct.name}
        </Text>
        <VStack className="mb-6">
          <Heading size="md" className="mb-4">
            ${myProduct.price}
          </Heading>
          <Text size="sm">{myProduct.description}</Text>
        </VStack>
        <Box className="flex-col sm:flex-row">
          <Button
            onPress={addToCart}
            className="px-4 py-2 mr-0 mb-3 sm:mr-3 sm:mb-0 sm:flex-1"
          >
            <ButtonText size="sm">Add to cart</ButtonText>
          </Button>
          <Button
            variant="outline"
            className="px-4 py-2 border-outline-300 sm:flex-1"
          >
            <ButtonText size="sm" className="text-typography-600">
              Wishlist
            </ButtonText>
          </Button>
        </Box>
      </Card>
    </Box>
  );
}
