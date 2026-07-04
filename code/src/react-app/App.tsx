import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/react-app/lib/authContext";
import ProtectedRoute from "@/react-app/components/ProtectedRoute";
import HomePage from "@/react-app/pages/Home";
import BlogPage from "@/react-app/pages/Blog";
import BlogPostPage from "@/react-app/pages/BlogPost";
import AdminSignIn from "@/react-app/pages/admin/SignIn";
import AdminSignUp from "@/react-app/pages/admin/SignUp";
import AdminPosts from "@/react-app/pages/admin/Posts";
import PostEditor from "@/react-app/pages/admin/PostEditor";
import PostPreview from "@/react-app/pages/admin/PostPreview";

export default function App() {
  return (
    <HelmetProvider>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/admin" element={<Navigate to="/admin/posts" replace />} />
          <Route path="/admin/signin" element={<AdminSignIn />} />
          <Route path="/admin/signup" element={<AdminSignUp />} />
          <Route
            path="/admin/posts"
            element={<ProtectedRoute><AdminPosts /></ProtectedRoute>}
          />
          <Route
            path="/admin/posts/new"
            element={<ProtectedRoute><PostEditor /></ProtectedRoute>}
          />
          <Route
            path="/admin/posts/:id/edit"
            element={<ProtectedRoute><PostEditor /></ProtectedRoute>}
          />
          <Route
            path="/admin/posts/:id/preview"
            element={<ProtectedRoute><PostPreview /></ProtectedRoute>}
          />
        </Routes>
      </Router>
    </AuthProvider>
    </HelmetProvider>
  );
}
