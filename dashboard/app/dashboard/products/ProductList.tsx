import React from "react";
import { Card } from "@/components/ui/card";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";

import Link from "next/link";

export default function ProductListItem({ item }: any) {
  return (
    <Link href={`/products/${item.id}`} className="flex flex-1 min-w-[300px]">
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
    </Link>
  );
}
