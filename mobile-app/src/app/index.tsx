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
import { useEffect, useState } from "react";
import { listProduct } from "@/apiHelper/products";
import { useQuery } from "@tanstack/react-query";

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
    return <ActivityIndicator />;
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
