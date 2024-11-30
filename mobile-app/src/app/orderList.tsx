import { listOrder } from "@/apiHelper/orders";
import { Text } from "@/components/ui/text";
import { useQuery } from "@tanstack/react-query";
import { router, Stack } from "expo-router";
import { FlatList, Pressable, View } from "react-native";
import {
  OrderListType,
  OrderQueryResponse,
  ProductDetails,
  productsType,
} from "../store/types";
import { ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Divider } from "@/components/ui/divider";

import React, {
  useCallback,
  useRef,
  useMemo,
  useEffect,
  useState,
} from "react";
import { StyleSheet, Button, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Box } from "@/components/ui/box";
import { Image } from "@/components/ui/image";
import { Heading } from "@/components/ui/heading";

dayjs.extend(relativeTime);
export default function OrderList() {
  const [selectedOrder, setSelectedOrder] = useState<OrderListType[0]>();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const totalPrice = selectedOrder?.products.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const {
    data: orders,
    isLoading,
    error,
  } = useQuery<OrderQueryResponse, Error>({
    queryKey: ["orders"],
    queryFn: listOrder,
  });

  const sortedOrders = orders?.data
    .slice()
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["1%", "50%", "90%"], []);

  const handleSheetChange = useCallback((index: number) => {
    setIsBottomSheetOpen(index > 0);
  }, []);

  const handleSnapPress = useCallback((index: number) => {
    sheetRef.current?.snapToIndex(index);
  }, []);

  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  useEffect(() => {
    sheetRef.current?.close();
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: ProductDetails }) => (
      <VStack className="w-full px-2 ">
        <Divider className="my-2  bg-gray-300" />
        <HStack className="flex-1 ">
          <HStack className="flex-1 items-center gap-4">
            <Image
              size="lg"
              source={{
                uri: item.image,
              }}
              alt="image"
              resizeMode="contain"
            />
            <VStack className="flex-1">
              <Heading className="">{item.name}</Heading>
              <Text>{item.description}</Text>
            </VStack>
          </HStack>
          <Heading size="md" className="mb-4">
            ${item.price}
          </Heading>
        </HStack>
      </VStack>
    ),
    []
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <Stack.Screen options={{ headerLeft: undefined, title: "Orders" }} />

      <View style={styles.mainContent}>
        <FlatList
          data={sortedOrders}
          keyExtractor={(item) => item.id.toString()}
          contentContainerClassName="gap-2 max-w-[960px] w-full mx-auto p-2 h-full "
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                handleSnapPress(1);
                setSelectedOrder(item);
              }}
            >
              <HStack className="bg-white p-3 ">
                <VStack space="sm" className=" flex-1">
                  <HStack className=" ">
                    <Text className="text-xl ">Delivery Address: </Text>
                    <Text className="font-bold text-xl  flex-1">
                      {item.deliveryAddress}
                    </Text>
                  </HStack>
                  <Text>{dayjs(item.createdAt).fromNow()}</Text>
                </VStack>
                <Text className="ml-auto">{item.status}</Text>
              </HStack>
            </Pressable>
          )}
        />

        {/* Overlay */}
        {isBottomSheetOpen && (
          <TouchableOpacity
            style={styles.overlay}
            activeOpacity={1}
            onPress={handleClosePress}
          />
        )}
      </View>

      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        onChange={handleSheetChange}
        style={styles.bottomSheet}
      >
        <BottomSheetFlatList
          data={selectedOrder?.products}
          keyExtractor={(i) => i.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.contentContainer}
          ListHeaderComponent={
            <View className="flex-1 mb-6">
              <Text className="font-semibold text-center text-2xl pb-6">{`Order #${selectedOrder?.id}`}</Text>
              <HStack className="bg-white p-3 justify-between flex-1">
                <VStack space="sm" className="flex-1">
                  <HStack className=" flex-1">
                    <Text className="text-xl">Delivery Address: </Text>
                    <Text className="font-bold text-xl flex-1">
                      {selectedOrder?.deliveryAddress}
                    </Text>
                  </HStack>
                  <HStack className="">
                    <Text className="text-xl">Note: </Text>
                    <Text className="text-lg">{selectedOrder?.notes}</Text>
                  </HStack>
                </VStack>
                <VStack>
                  <Text className="ml-auto">{selectedOrder?.status}</Text>
                  <Text>{dayjs(selectedOrder?.createdAt).fromNow()}</Text>
                </VStack>
              </HStack>
            </View>
          }
          ListFooterComponent={
            <HStack className="justify-between">
              <Heading>Total:</Heading>
              <Heading>${totalPrice?.toFixed(2)}</Heading>
            </HStack>
          }
          ListFooterComponentClassName={"px-5 flex-1 mt-10"}
        />
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
  },
  contentContainer: {
    backgroundColor: "white",
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: "#eee",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    zIndex: 0,
  },
  bottomSheet: {
    zIndex: 2,
  },
});
