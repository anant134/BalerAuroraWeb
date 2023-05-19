
import { useState } from "react";


import Hero from "src/component/common/Hero";
import Destination from "src/component/Destination/destination";
import Otherdestination from "src/component/OtherDestination/otherdestination";
import NavBar from "src/component/NavBar/NavBar";
import Footer from "src/component/Footer/Footer";

const Home = () => {
    var homelog = process.env.PUBLIC_URL + "/images/hompage.jpeg";
    var centerUrl = process.env.PUBLIC_URL + "/images/center.png";

    return (
        <>

            <NavBar />

            <Hero cName={"hero"}
                heroImg={homelog}
                title={""}
                text={""}
                url={"/book"}
                btnClass={"show"}
                btnText={"Book Now"}
                centerUrl={centerUrl}
            />

            <Destination />
            <Otherdestination />
            <Footer />
        </>
    )
}
export default Home;