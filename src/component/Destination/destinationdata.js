
const Destinationdata = (props) => {
    return (<>
        <div className={props.cName}>
            <div className="des-text">
                <h2>{props.title}</h2>
                <p>{props.description}</p>
            </div>
            <div className="image">
                <img alt="img1" src={props.imgUrl1} />
                <img alt="img1" src={props.imgUrl2} />
            </div>

        </div>
    </>);
}
export default Destinationdata;