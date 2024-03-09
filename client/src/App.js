import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Signin from "./pages/Auth/Signin";
import Signup from "./pages/Auth/Signup";
import Profile from "./pages/Profile";
import MainLayout from "./components/MainLayout";
import AuthLayout from "./components/AuthLayout";
import Basket from "./pages/Basket";
import Error404 from "./pages/Error404";
function App() {
  return (
    <Router>
      <div>
        <Navbar />

        <div id="content">
          <Routes>
            <Route path="/" exact element={<Products />} />
            <Route
              path="/product/:product_id"
              exact
              element={<ProductDetail />}
            />
            <Route path="/" element={<AuthLayout />}>
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
            </Route>

            <Route path="/" element={<MainLayout />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/basket" element={<Basket />} />
            </Route>
            <Route path="/*" element={<Error404 />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
