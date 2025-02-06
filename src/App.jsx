import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignInPage/SignIn";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./components/Layout/AppLayout";
import { AuthProvider } from "./context/AuthenticationContext";
import ProtectedRoute from "./pages/Authentication/ProtectedRoute";
import ComplaintPage from "./pages/ComplaintPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />

          {/* Protected Dashboard Route */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              {/* <Route path="/dashboard" element={<Dashboard />} /> */}
              <Route path="/complaints" element={<ComplaintPage />} />
              {/* Default route */}
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
