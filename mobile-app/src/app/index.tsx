import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
// import products from "../../assets/products.json";
import ProductListItem from "../component/ProductList";
import { Button, ButtonText } from "@/components/ui/button";
import { useBreakpointValue } from "@/components/ui/utils/use-break-point-value";
import React, { useEffect, useState } from "react";
import { listProduct } from "@/apiHelper/products";
import { useQuery } from "@tanstack/react-query";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Skeleton, SkeletonText } from "@/components/ui/skeleton";

const LoadingSkeleton = () => (
  <Box className="flex-1 gap-4 p-3 rounded-md bg-background-100">
    <Skeleton variant="rounded" speed={4} className="h-[240px] p-5 mb-6" />
    <HStack className="gap-2 align-left mb-2">
      <SkeletonText _lines={2} gap={1} className="h-2 w-2/5" />
    </HStack>
  </Box>
);

export default function Page() {
  // const [products, setProducts] = useState();
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const data = await listProduct();
  //     setProducts(data);
  //   };
  //   fetchProducts();
  // }, []);

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({ queryKey: ["products"], queryFn: listProduct });

  const numColumns = useBreakpointValue({
    default: 2,
    sm: 3,
    xl: 4,
  });

  if (isLoading) {
    return (
      <FlatList
        data={[0, 1, 2, 3, 4, 5, 6, 7]}
        key={numColumns}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => <LoadingSkeleton />}
        showsVerticalScrollIndicator={false}
        numColumns={numColumns}
        contentContainerClassName="gap-2 max-w-[960px]  mx-auto mx-auto w-full"
        columnWrapperClassName="gap-2"
      />
    );
  }

  if (error) {
    return <Text>Error fetchind</Text>;
  }
  return (
    <FlatList
      data={products}
      key={numColumns}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => <ProductListItem item={item} />}
      showsVerticalScrollIndicator={false}
      numColumns={numColumns}
      contentContainerClassName="gap-2 max-w-[960px]  mx-auto mx-auto w-full"
      columnWrapperClassName="gap-2"
    />
  );
}
