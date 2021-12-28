import React, { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "@components/Navbar/Navbar";
import ProtectedRoute from "@screens/ProtectedRoute";
import Loader from "@shared/Loader";

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

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});
function App() {
  return (
    <>
      <Router>
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/*" element={<ProtectedRoute />}>
                <Route path="/*" element={<HomeScreen />} />
              </Route>

              <Route path="/login" element={<LoginScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route path="/profile" element={<ProtectedRoute />}>
                <Route path="/profile" element={<ProfileScreen />} />
              </Route>
              <Route path="/user/:id" element={<ProtectedRoute />}>
                <Route path="/user/:id" element={<UserScreen />} />
              </Route>
              <Route path="/messages" element={<ProtectedRoute />}>
                <Route path="/messages" element={<ChatScreen />} />
              </Route>
              <Route path="/search/:query" element={<SearchScreen />} />
            </Routes>
          </Suspense>
        </QueryClientProvider>
      </Router>
    </>
  );
}

export default App;
