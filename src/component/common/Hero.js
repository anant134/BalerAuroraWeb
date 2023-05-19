import './heroStyle.css';
const Hero = (props) => {
    return (
        <>


            < div className={props.cName}>

                <img className={"heroimg"} alt="HeroImg"
                    src={props.heroImg} />
                <div className="hero-text">
                    <h1>{props.title}</h1>
                    <p>{props.text}</p>
                    <img alt=' ' src={props.centerUrl} className={props.booknowimg} style={{ "height": "150px" }} />
                    {/* <a href={props.url} className={props.btnClass}>{props.btnText}</a> */}
                </div>
            </div>
        </>
    )
}
export default Hero;