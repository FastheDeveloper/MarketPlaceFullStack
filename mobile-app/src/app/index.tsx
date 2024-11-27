import {
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import products from "../../assets/products.json";
import ProductListItem from "../component/ProductList";
import { Button, ButtonText } from "@/components/ui/button";
import { useBreakpointValue } from "@/components/ui/utils/use-break-point-value";

export default function Page() {
  const numColumns = useBreakpointValue({
    default: 2,
    sm: 3,
    xl: 4,
  });
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
