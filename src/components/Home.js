import useMainStyles from "../styles/MainStyles";
import Navbar from "./Navbar"
import {
    BrowserRouter,
    Switch,
    Route,
  } from "react-router-dom";
import Bookings from "./Bookings";
import CreateBooking from "./CreateBooking";

const Home = () => {
    const mainStyles = useMainStyles();

    return ( 
        <div>
            <Navbar />
                <div className={mainStyles.root}>
                    <Switch>
                        <Route exact path="/index" component={CreateBooking} />
                        <Route exact path="/index/bookings" component={Bookings} />
                    </Switch>
                </div>
        </div>
     );
}
 
export default Home;