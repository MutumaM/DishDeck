const BASE_URL = "http://localhost:5555";

export async function registerUser(email, password) {
    const response = await fetch(`${BASE_URL}/api/register`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify({email, password})
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Registration failed");
    }
    return response.json()
}

export async function loginUser(email, password) {
    const response = await fetch(`${BASE_URL}/api/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify({email, password})
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Login failed");
    }
    return response.json()
}

export async function logoutUser() {
    await fetch(`${BASE_URL}/api/logout`, {
        method: "DELETE",
        credentials: "include"
    });
}

export async function getCurrentUser() {
    const response = await fetch(`${BASE_URL}/api/me`, {
        credentials: "include",
    });

    if (!response.ok) {
        return null;
    }
    return response.json();
}