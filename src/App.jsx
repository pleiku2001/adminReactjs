// import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import { userInputs, productInputs } from "./formSource";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import Users from "./pages/Users/Users";
import Single from "./pages/Single/Single";
import Profile from "./pages/Profile/Profile";
import { DarkModeContext } from "./context/ColorContext";
import { useContext } from "react";
import "./darkMode/dark.scss";
import Login from "./pages/Login/Login";
import { AuthContext } from "./context/AuthContext";
import SinglePro from "./pages/SinglePro/SinglePro";
import New from "./pages/New/New";


function App() {
  const { darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);
  
  // console.log(currentUser);
  // const RequireAuth = ({ children }) => {
  //   return currentUser ? children : <Navigate to="/login" />;
  // };
  // console.log(darkMode);
  return (
    <div className={darkMode ? "app dark" : "app"}>
      {currentUser ? <Navbar /> : ""}

      <Routes>
        <Route path="/">
          <Route path="login" element={currentUser ? <Home /> : <Login />} />
          <Route index element={currentUser ? <Home /> : <Login />} />
          <Route path="users">
            <Route index element={currentUser ? <Users /> : <Login />} />
            <Route
              path=":userId"
              element={currentUser ? <Single /> : <Login />}
            />
            <Route
              path="new"
              element={<New inputs={userInputs} title="Add New User" />}
            />
          </Route>
          <Route path="products">
            <Route index element={currentUser ? <Products /> : <Login />} />
            <Route
              path=":productId"
              element={currentUser ? <SinglePro /> : <Login />}
            />
            <Route
              path="new"
              element={<New inputs={productInputs} title="Add New Product" />}
            />
          </Route>
          <Route path="profile" element={currentUser ? <Profile /> : <Login />} />
        </Route>
      </Routes>
      {/* <RequireAuth> */}
      {currentUser ? <Footer /> : ""}

      {/* </RequireAuth> */}
    </div>
  );
}

export default App;
