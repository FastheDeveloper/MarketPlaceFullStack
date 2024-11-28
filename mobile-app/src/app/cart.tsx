import { View, Text, FlatList } from "react-native";
import React from "react";
import { Redirect, Stack } from "expo-router";
import { useCart } from "../store/cartStore";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Button, ButtonText } from "@/components/ui/button";

const Cart = () => {
  const items = useCart((state) => state.items);
  const resetCart = useCart((state) => state.resetCart);

  const onCheckout = async () => {
    resetCart();
  };

  if (items.length === 0) {
    return <Redirect href={"/"} />;
  }

  return (
    <View>
      <Stack.Screen
        options={{
          title: "Cart",
          headerRight: undefined,
          headerBackButtonDisplayMode: "minimal",
        }}
      />
      <FlatList
        data={items}
        keyExtractor={(item) => String(item.product.id + Math.random())}
        contentContainerClassName="gap-2 max-w-[960px] w-full mx-auto p-2"
        renderItem={({ item }) => (
          <HStack className="bg-white p-3">
            <VStack space="sm">
              <Text>{item.product.name}</Text>
              <Text>$ {item.product.price}</Text>
            </VStack>
            <Text className="ml-auto">{item.quatity}</Text>
          </HStack>
        )}
        ListFooterComponent={() => (
          <Button onPress={onCheckout}>
            <ButtonText>Checkout</ButtonText>
          </Button>
        )}
      />
    </View>
  );
};

export default Cart;
