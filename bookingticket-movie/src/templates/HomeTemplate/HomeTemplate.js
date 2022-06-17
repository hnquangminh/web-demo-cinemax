import { Fragment, useEffect }  from "react";
import { Route } from "react-router";
import Footer from "./Layout/Footer/Footer";
import Header from "./Layout/Header/Header";
import HonmeCarousel from "./Layout/HomeCarousel/HomeCarousel";

export const HomeTemplate = (props) => { //path, exact, Component
    const {Component,...restProps} = props;

    useEffect(() => {
        window.scrollTo(500, 0);
    })

    return <Route {...restProps} render = {(propsRoute) =>{
        //props.location, props.history, props.match
        //Flagment giống thẻ div nhưng nó k đẩy component mình xuống
        return <Fragment> 
            <Header {...propsRoute} />
             <Component {...propsRoute} />
             <hr className="mt-5"/>
            <Footer {...propsRoute} />
        </Fragment>
    }} />
}