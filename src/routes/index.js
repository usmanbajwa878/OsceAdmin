import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


import Nav from "../components/nav";
import Auth from '../containers/Auth';
import Complaints from '../containers/Complaints';
import History from '../containers/History';
import Conditions from '../containers/Conditions';
import Feedbacks from '../containers/Feedbacks';
import Cards from '../containers/Cards';
export default function App() {
  const [isAuth, setAuth] = useState(false);

  useEffect(()=>{
    if(localStorage.getItem("token")) setAuth(true);
  },[])
  const logOut = () => {
    localStorage.clear();
    setAuth(false);
  }
  const logIn = () => setAuth(true)


  return (
    <Router>
      <Switch>
        {
          !isAuth ?
            <Route path="/" component={() => <Auth logIn={logIn} />} />
            :
            <Nav logOut={logOut} >
              <Route exact path="/" component={Complaints} />
              <Route exact path="/history/:complaintId" component={History} />
              <Route exact path="/condition/:historyId" component={Conditions} />
              <Route exact path="/feedback/:historyId" component={Feedbacks} />
              <Route exact path="/card/:feedbackId" component={Cards} />
            </Nav>
        }
      </Switch>
    </Router>
  );
}