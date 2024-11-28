import { useAuth } from "@/src/store/authStore";

const API_URL = process.env.EXPO_PUBLIC_API_URL

export async function createOrder(deliveryDeets: {}, items: any[]) {
    const token = useAuth.getState().token
    try {
        const res = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                order: deliveryDeets,
                items: items
            })

        })

        const data = await res.json()
        console.log('====================================');
        console.log(data);
        console.log('====================================');
        if (!res.ok) {
            throw Error('Failed to create order')
        }


        return data
    } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
    }

}
