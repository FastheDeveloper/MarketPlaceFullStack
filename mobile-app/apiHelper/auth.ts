const API_URL = process.env.EXPO_PUBLIC_API_URL

export async function login(email: string, password: string) {
    console.log('====================================');
    console.log(email, password);
    console.log('====================================');
    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })

    const data = await res.json()

    if (!res.ok) {
        throw Error('Failed to Login')
    }


    return data
}

export async function register(email: string, password: string, name: string) {
    try {


        const res = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, name })
        })

        const data = await res.json()
        console.log('====================================');
        console.log(data);
        console.log('====================================');
        if (!res.ok) {
            throw Error('Failed to register')
        }
        return data
    } catch (e) {
        throw Error('Failed to register')

    }
}