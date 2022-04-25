import "./App.css";
import Home from "./pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./pages/style/dark.scss";
import List from "./pages/list/List";

import Notification from "./pages/Notification/Notification";
import Single from "./pages/single/Single";
import { getSetToken, getUserInfo } from "./redux/action/userAction";
import New from "./pages/new/New";
import { userInputs, BlogInputs } from "./pages/FormSource";
import Blogs from "./pages/allBlogs/Blogs";
import Statistics from "./pages/Statistics/Statistics";
import AcceptedList from "./pages/Acceptedlist/AcceptedList";
import Pending from "./pages/Pending/Pending";
import { useDispatch, useSelector } from "react-redux";
import SignInScreen from "./pages/Loginscreen/SignInScreen";
import SignUpScreen from "./pages/Loginscreen/SignUpScreen";

import RecoveryScreen from "./pages/Loginscreen/RecoveryScreen";
import { useEffect, useState } from "react";
import AdminProfile from "./pages/AdminProfile/AdminProfile";
import Listuser from "./pages/listuser/Listuser";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const darkmode = useSelector((state) => state.setDark.showDark);

  // Sendin Token To Redux
  console.log(darkmode + "hello");
  dispatch(getSetToken(token));
  dispatch(getUserInfo(userInfo));

  // Is User Auth. ?
  const authUser = useSelector((state) => state.userAuth.success);
  console.log(authUser);
  return (
    <div className={darkmode ? "app dark" : "app"}>
      <BrowserRouter>
        <div>
          {/* {authUser ? <Home /> : <SignInScreen />} */}
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              <Route
                exact
                path="/"
                element={!authUser ? <Home /> : <Pending />}
              />
              <Route
                path="login"
                element={!authUser ? <SignInScreen /> : <SignInScreen />}
              />
              <Route
                path="adminprofile"
                element={authUser ? <AdminProfile /> : <SignInScreen />}
              />
              <Route path="signup" element={<SignUpScreen />} />
              <Route path="recovery" element={<RecoveryScreen />} />
              <Route path="pending" element={<Pending />} />
              <Route
                path="notification"
                element={authUser ? <Notification /> : <Pending />}
              />
              <Route
                path="acceptedList"
                element={authUser ? <AcceptedList /> : <SignInScreen />}
              />
              <Route
                path="Statistics"
                element={authUser ? <Statistics /> : <SignInScreen />}
              />
              <Route path="allblogs" element={<Blogs />} />
            </Route>
            <Route path="journalists">
              <Route index element={<List />} />

              <Route path=":userId" element={<Single />} />
              <Route
                path=":userId/new"
                element={<New inputs={userInputs} title="Add users" />}
              />
            </Route>
            <Route path="userslist">
              <Route index element={authUser ? <Listuser /> : <NotFound />} />

              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add users" />}
              />
            </Route>
            <Route path="blogs">
              <Route index element={<List />} />
              <Route path=":blogId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={BlogInputs} title="Add Blog" />}
              />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

// MONGO_URI = mongodb://127.0.0.1:27017
