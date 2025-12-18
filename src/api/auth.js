const BASE_URL = "https://nimbus-uthm.onrender.com/auth";

export async function login(email, password, type) {
    const res = await fetch(`${BASE_URL}/${type}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });
    return await res.json();
}

export async function registerUser(email, password, role) {
    const res = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role })
    });
    return await res.json();
}

export async function refreshToken(token) {
    const res = await fetch(`${BASE_URL}/refresh?refresh_token=${token}`, {
        method: "POST"
    });
    return await res.json();
}
