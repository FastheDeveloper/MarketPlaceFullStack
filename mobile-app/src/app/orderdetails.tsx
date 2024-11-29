import { Text } from "@/components/ui/text";
import { Stack, useLocalSearchParams } from "expo-router";
import { View } from "react-native";

export default function OrderDetails() {
  const item = useLocalSearchParams();
  let products = [];

  if (typeof item?.products === "string") {
    try {
      products = JSON.parse(item.products);
    } catch (error) {
      console.error("Failed to parse products:", error);
    }
  }

  return (
    <View>
      <Stack.Screen
        options={{
          headerLeft: undefined,
          title: `Order #${item.id}`,
          headerRight: undefined,
        }}
      />
    </View>
  );
}
