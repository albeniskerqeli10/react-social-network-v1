import Navbar from "./components/Navbar/Navbar";
import ProtectedRoute from "./screens/ProtectedRoute";
import Loader from "./shared/Loader";
import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const HomeScreen = lazy(
  () => import("./screens/HomeScreen" /* webpackChunkName: "HomeScreen" */)
);

const SearchScreen = lazy(
  () => import("./screens/SearchScreen" /* webpackChunkName: "SearchScreen" */)
);
const LoginScreen = lazy(
  () => import("./screens/LoginScreen" /* webpackChunkName: "LoginScreen" */)
);
const UserScreen = lazy(
  () => import("./screens/UserScreen" /* webpackChunkName: "UserScreen" */)
);
const RegisterScreen = lazy(
  () =>
    import("./screens/RegisterScreen" /* webpackChunkName: "RegisterScreen" */)
);
const ProfileScreen = lazy(
  () =>
    import("./screens/ProfileScreen" /* webpackChunkName: "ProfileScreen" */)
);
const ChatScreen = lazy(
  () => import("./screens/ChatScreen" /* webpackChunkName: "ChatScreen" */)
);

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Navbar />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <HomeScreen />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfileScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/:id"
              element={
                <ProtectedRoute>
                  <UserScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="/messages"
              element={
                <ProtectedRoute>
                  <ChatScreen />
                </ProtectedRoute>
              }
            />

            <Route path="/search/:query" element={<SearchScreen />} />
          </Routes>
        </Suspense>
      </Provider>
    </Router>
  );
}

export default App;
