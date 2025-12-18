import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import VideoCall from "./pages/VideoCall";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Auth />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/vc" element={<VideoCall />} />
                
            </Routes>
        </BrowserRouter>
    );
}
