import { getProductById } from "@/apiHelpers/products";
import { productsType } from "@/apiHelpers/types";
import ProductListItem from "../ProductList";

export default async function ProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  let product: productsType[0] | null = null;
  try {
    product = await getProductById(Number(id));
    console.log(product);
  } catch (err) {}

  return (
    <div className="max-w-[1200px] mx-auto w-full">
      <ProductListItem item={product} />
    </div>
  );
}
