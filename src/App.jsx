import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignInPage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./components/Layout/AppLayout";
import { AuthProvider } from "./context/AuthenticationContext";
import ProtectedRoute from "./hook/ProtectedRoute";
import ComplaintPage from "./pages/ComplaintPage";
import FeedbackPage from "./pages/FeedbackPage";
import ProfilePage from "./pages/ProfilePage";
import Editor from "./pages/Editor";
import FormEditor from "./utils/Editor/FormEditor";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />

          {/* Protected Route */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              {/* <Route path="/dashboard" element={<Dashboard />} /> */}
              <Route path="/complaints" element={<ComplaintPage />} />
              <Route path="/feedbacks" element={<FeedbackPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              {/* <Route path="/editor" element={<Editor />} /> */}
              {/* <Route path="/form-editor:formId" element={<FormEditor />} /> */}
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
