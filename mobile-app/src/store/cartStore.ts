import { create } from "zustand";

export const useCart = create((set) => ({
    items: [],

    addProduct: (product: any) =>
        set((state: any) => {
            // Check if the product already exists in the cart
            const existingProductIndex = state.items.findIndex(
                (item) => item.product.id === product.id
            );
            if (existingProductIndex !== -1) {
                const updatedItems = state.items.map((item, index) =>
                    index === existingProductIndex
                        ? { ...item, quatity: item.quatity + 1 }
                        : item
                );

                return { items: updatedItems };
            }

            return { items: [...state.items, { product, quatity: 1 }] }
        }),

    resetCart: () => set({ items: [] })
}))

