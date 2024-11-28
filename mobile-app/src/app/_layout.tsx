import { Slot, Stack, Link } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Icon } from "@/components/ui/icon";
import { ShoppingCart } from "lucide-react-native";
import { useCart } from "../store/cartStore";
import { Text } from "@/components/ui/text";
import { Pressable } from "react-native";

const queryClient = new QueryClient();

export default function RootLayout() {
  const items = useCart((state) => state.items);
  // Calculate the total quantity of all items
  const totalQuantity = items.reduce((total, item) => total + item.quatity, 0);
  console.log("================st===================");
  console.log(totalQuantity);
  console.log("====================================");
  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider>
        <Stack
          screenOptions={{
            headerRight: () => (
              <Link href={"/cart"} asChild>
                <Pressable className="flex-row gap-2">
                  <Icon as={ShoppingCart} />
                  {totalQuantity > 0 && <Text>{totalQuantity}</Text>}
                </Pressable>
              </Link>
            ),
          }}
        >
          <Stack.Screen name="index" options={{ title: "Shop" }} />
        </Stack>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}
