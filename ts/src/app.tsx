// css
import "@/assets/css/app.css";
import { LocationProvider, Router } from "preact-iso";
import Home from "@/pages/Home";

export function App() {
    return (
        <LocationProvider>
            <Router>
                <Home path="/"/>
            </Router>
        </LocationProvider>
    );
}

export default App;
