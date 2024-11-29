export type ProductDetails = {
    id: number,
    name: string,
    description: string,
    image: string,
    price: number
}

export type CartItem = {
    product: ProductDetails,
    quantity: number
}[]

// Define the Zustand store type
export type CartStore = {
    items: CartItem;
    addProduct: (product: ProductDetails) => void;
    resetCart: () => void;
};

type User = {
    id: number;
    email: string;
    role: string;
    name: string;
    address: string | null; // Can be null based on your example
};

// Define the AuthStore type
export type AuthStore = {
    user: User | null;
    token: string | null;
    setUser: (user: User | null) => void; // Allow setting to `null` to clear user
    setToken: (token: string | null) => void; // Allow setting to `null` to clear token
};

export type productsType = {
    id: number,
    orderId: number,
    productId: number,
    quantity: number,
    name: string,
    description: string,
    image: string,
    price: number
}[]

export type OrderListType = {
    createdAt: string,
    deliveryAddress: string,
    id: number,
    notes: string,
    status: string,
    updatedAt: string,
    userId: number,
    products: productsType
}[]

export type OrderQueryResponse = {
    data: OrderListType,
    error: boolean
}