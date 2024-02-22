import LoginRegister from "./pages/LoginRegister";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RootLayout from "./pages/RootLayout";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="/auth" element={<LoginRegister />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
