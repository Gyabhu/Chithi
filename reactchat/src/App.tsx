import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Chats from "./pages/Chats";
import ToggleColorMode from "./components/ToogleColorMode";
import Server from "./pages/Server";
import Login from "./pages/Login";
import { AuthServiceProvider } from "./context/AuthContext";
import TestLogin from "./pages/TestLogin";
import ProtectedRoute from "./services/ProtectedRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home />} />
      <Route path="/server" element={<Server />} />
      <Route path="/chats/:chatId" element={<Chats />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/testlogin"
        element={
          <ProtectedRoute>
            <TestLogin />
          </ProtectedRoute>
        }
      />
    </Route>
  )
);

const App = () => {
  return (
    <AuthServiceProvider>
      <ToggleColorMode>
        <RouterProvider router={router} />
      </ToggleColorMode>
    </AuthServiceProvider>
  );
};

export default App;
