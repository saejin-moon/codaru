// css
import "@/assets/css/app.css";
import { LocationProvider, Router } from "preact-iso";
import Home from "./pages/Home";
import Join from "./pages/Join";
import { Header } from "./components/Header";
import { AuthProvider } from "./context/auth.tsx";

export function App() {
    return (
        <AuthProvider>
            <LocationProvider>
                <Header/>
                <Router>
                    <Home path="/"/>
                    <Join path="/join"/>
                </Router>
            </LocationProvider>
        </AuthProvider>
    );
}

export default App;
