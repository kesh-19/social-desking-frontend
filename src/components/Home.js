import useMainStyles from "../styles/MainStyles";
import Navbar from "./Navbar"
import {
    Switch,
    Route,
  } from "react-router-dom";
import Bookings from "./Bookings";
import CreateBooking from "./CreateBooking";
import NewBooking from "./NewBooking";

const Home = () => {
    const mainStyles = useMainStyles();

    return ( 
        <div>
            <Navbar />
                <div className={mainStyles.root}>
                    <Switch>
                        <Route exact path="/index" component={CreateBooking} />
                        <Route exact path="/index/bookings" component={Bookings} />
                        <Route exact path="/index/:id" component={NewBooking} />
                    </Switch>
                </div>
        </div>
     );
}
 
export default Home;