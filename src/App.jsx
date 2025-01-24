import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import Body from "./Components/Body";
import { Provider } from "react-redux";
import appStore from "../utils/appStore";
import Feed from "./Components/Feed";
import Connections from "./Components/Connections";
import Request from "./Components/Request";

function App() {
  return (
    <>
      {/* Provider is used to provide redux store's access to all the components"*/}
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/login" element={<Login></Login>} />
              <Route path="/profile" element={<Profile></Profile>} />
              <Route path="/feed" element={<Feed></Feed>}></Route>
              <Route
                path="/connections"
                element={<Connections></Connections>}
              ></Route>
              <Route path="/requests" element={<Request></Request>}></Route>

              <Route path=""></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
