import { BrowserRouter, Routes , Route} from "react-router"
import Login from "./Login"
import Profile from "./Profile"
import Body from "./Body"

function App() {

  return (
    <>
    <BrowserRouter basename="/">
      <Routes>
        <Route path = "/" element = {<Body/>}>
          <Route path = "/login" element = {<Login></Login>} /> 
          <Route path = "/profile" element = {<Profile></Profile>} /> 
        </Route>
        
      </Routes>
      
    </BrowserRouter>     
    </>
  )
}

export default App
