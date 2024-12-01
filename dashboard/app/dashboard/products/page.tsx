import { listProduct } from "@/apiHelpers/products";
import { productsType } from "@/apiHelpers/types";
import ProductListItem from "./ProductList";

export default async function ProductPage() {
  let products;
  try {
    products = await listProduct();
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="flex flex-row flex-wrap gap-4 max-w-[1400px] mx-auto w-full">
      {products.map((product: productsType[0]) => (
        <ProductListItem key={product.id} item={product} />
      ))}
    </div>
  );
}
