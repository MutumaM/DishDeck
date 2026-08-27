import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import AuthForm from "../components/Authform";

function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();

    function handleSuccess() {
        const returnTo = location.state && location.state.from ? location.state.from : "/";
        navigate(returnTo)
    }

    return (
        <div>
            <Navbar />
            <AuthForm onSuccess={handleSuccess} />
        </div>
    )
}

export default LoginPage;