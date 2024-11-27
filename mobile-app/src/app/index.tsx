import { FlatList, StyleSheet, Text, View } from "react-native";
import products from "../../assets/products.json";
import ProductListItem from "../component/ProductList";
import { Button, ButtonText } from "@/components/ui/button";

export default function Page() {
  return (
    <View style={styles.container}>
      {/* <FlatList
        data={products}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <ProductListItem item={item} />}
      /> */}
      <Button variant="outline">
        <ButtonText>PRESS ME</ButtonText>
      </Button>
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
