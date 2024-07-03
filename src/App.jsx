import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Profile from "./pages/Profile";
import RegistrationPage from "./pages/RegistrationPage";
import NotFound from "./pages/NotFound";
import PrivateRoutes from "./routes/PrivateRoutes";

function App() {
  return (
    <Routes>
      <Route element={<PrivateRoutes></PrivateRoutes>}>
        <Route path="/" element={<HomePage />} />
        <Route path="/me" element={<Profile />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/registrationPage" element={<RegistrationPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
