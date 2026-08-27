import { createContext , useContext , useState , useEffect } from "react";
import { getCurrentUser, loginUser, registerUser, logoutUser } from "../api/auth";

const AuthContext = createContext(null)

export function AuthProvider(props) {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(function () {
        async function checkSession() {
            const user = await getCurrentUser();
            setCurrentUser(user)
            setIsLoading(false);
        }
        checkSession();
    }, []);

    async function login(email, password) {
        const user = await loginUser(email, password);
        setCurrentUser(user);
    }

    async function register(email, password) {
        const user = await registerUser(email, password)
        setCurrentUser(user);
    }

    async function logout() {
        await logoutUser();
        setCurrentUser(null);
    }

    const value = {
        currentUser,
        isLoading,
        login,
        register,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}