import { listProduct } from "@/apiHelpers/products";
import { productsType } from "@/apiHelpers/types";
import ProductListItem from "./ProductList";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { AddIcon, Icon } from "@/components/ui/icon";

export default async function ProductPage() {
  let products;
  try {
    products = await listProduct();
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="flex flex-row flex-wrap gap-4 max-w-[1400px] mx-auto w-full">
      <Link
        href="/dashboard/products/create"
        className="flex flex-1 min-w-[300px]"
      >
        <Card className="w-full h-full p-5 flex items-center justify-center">
          <Icon as={AddIcon} className="w-10 h-10 color-slate-400" />
        </Card>
      </Link>
      {products.map((product: productsType[0]) => (
        <ProductListItem key={product.id} item={product} />
      ))}
    </div>
  );
}
