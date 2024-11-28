import { View, Text, FlatList } from "react-native";
import React from "react";
import { Redirect, Stack } from "expo-router";
import { useCart } from "../store/cartStore";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Button, ButtonText } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { createOrder } from "@/apiHelper/orders";

const Cart = () => {
  const items = useCart((state) => state.items);
  const resetCart = useCart((state) => state.resetCart);
  const createOrderMutation = useMutation({
    mutationFn: () =>
      createOrder(
        {
          notes: "fly fishing pole",
          deliveryAddress: "Shagamu",
        },
        items.map((item: any) => ({
          productId: item.product.id,
          quantity: item.quantity,
        }))
      ),
    onSuccess: (data) => {
      console.log("success");
      resetCart();
    },
    onError: () => {
      console.log("error");
    },
  });

  const onCheckout = async () => {
    createOrderMutation.mutate();
  };

  const totalPrice = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return <Redirect href={"/"} />;
  }

  return (
    <View>
      <Stack.Screen
        options={{
          title: "Cart",
          headerRight: undefined,
          headerLeft: undefined,
          headerBackButtonDisplayMode: "minimal",
        }}
      />
      <FlatList
        data={items}
        keyExtractor={(item) => String(item.product.id + Math.random())}
        contentContainerClassName="gap-2 max-w-[960px] w-full mx-auto p-2 h-full "
        renderItem={({ item }) => (
          <HStack className="bg-white p-3">
            <VStack space="sm">
              <Text>{item.product.name}</Text>
              <Text>$ {item.product.price}</Text>
            </VStack>
            <Text className="ml-auto">{item.quantity}</Text>
          </HStack>
        )}
        ListFooterComponent={() => (
          <VStack>
            <Text className="font-bold text-3xl">
              Total: ${totalPrice.toFixed(2)}
            </Text>
            <Button onPress={onCheckout}>
              <ButtonText>Checkout</ButtonText>
            </Button>
          </VStack>
        )}
        ListFooterComponentClassName="flex-1  justify-end mb-20"
      />
    </View>
  );
};

export default Cart;
