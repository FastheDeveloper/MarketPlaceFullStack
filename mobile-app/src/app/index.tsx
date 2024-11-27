import { FlatList, StyleSheet, Text, View } from "react-native";
import products from "../../assets/products.json";
import ProductListItem from "../component/ProductList";
import { Button, ButtonText } from "@/components/ui/button";

export default function Page() {
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <ProductListItem item={item} />}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        contentContainerClassName="gap-2"
        columnWrapperClassName="gap-2"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },

  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
