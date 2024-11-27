import React from "react";
import { Card } from "@/components/ui/card";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Link } from "expo-router";
import { Pressable } from "react-native";

export default function ProductListItem({ item }: any) {
  return (
    <Link href={`/products/${item.id}`} asChild>
      <Pressable className="flex-1">
        <Card className="p-5 rounded-lg  flex-1">
          <Image
            source={{
              uri: item.image,
            }}
            className="mb-6 h-[240px] w-full rounded-md"
            alt={`${item.name} image`}
            resizeMode="contain"
          />
          <Text className="text-sm font-normal mb-2 text-typography-700">
            {item.name}
          </Text>

          <Heading size="md" className="mb-4">
            ${item.price}
          </Heading>
        </Card>
      </Pressable>
    </Link>
  );
}
