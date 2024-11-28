import { create } from "zustand";
import { CartItem, CartStore } from "./types";

export const useCart = create<CartStore>((set) => ({
    items: [],

    addProduct: (product: any) =>
        set((state: any) => {
            // Check if the product already exists in the cart
            const existingProductIndex = state.items.findIndex(
                (item: CartItem[0]) => item.product.id === product.id
            );
            if (existingProductIndex !== -1) {
                const updatedItems = state.items.map((item: CartItem[0], index: number) =>
                    index === existingProductIndex
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );

                return { items: updatedItems };
            }

            return { items: [...state.items, { product, quantity: 1 }] }
        }),

    resetCart: () => set({ items: [] })
}))

