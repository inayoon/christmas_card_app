import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import CardPicked from "./pages/CardPicked";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Envelope from "./pages/Envelope";
import SentCard from "./pages/SentCard";
import History from "./pages/History";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header /> <Home />
            </>
          }
        ></Route>
        <Route
          path="/sign-in"
          element={
            <>
              <Header />
              <Signin />
            </>
          }
        ></Route>
        <Route
          path="/sign-up"
          element={
            <>
              <Header />
              <Signup />
            </>
          }
        ></Route>
        <Route
          path="/card-detail/:id"
          element={
            <>
              <Header />
              <CardPicked />
            </>
          }
        ></Route>
        <Route
          path="/envelope"
          element={
            <>
              <Header />
              <Envelope />
            </>
          }
        ></Route>
        <Route
          element={
            <>
              <PrivateRoute />
            </>
          }
        >
          <Route
            path="/profile"
            element={
              <>
                <Header />
                <Profile />
              </>
            }
          />
        </Route>
        <Route
          path="/sent-card/:cardId"
          element={
            <>
              <SentCard />
            </>
          }
        ></Route>
        <Route
          path="/history/:userId"
          element={
            <>
              <Header />
              <History />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
