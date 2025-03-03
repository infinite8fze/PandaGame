import { Routes, Route } from "react-router-dom";
import { SubscriptionPage } from "./components/subscription/SubscriptionPage";
import { LoadingPage } from "./components/LoadingPage";
import { SplashPage } from "./components/SplashPage";
import Rooms from "./components/rooms";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoadingPage />} />
      <Route path="/splash" element={<SplashPage />} />
      <Route path="/game" element={<Rooms />} />
      <Route path="/subscribe" element={<SubscriptionPage />} />
    </Routes>
  );
}

export default App;
