
const Otherdestinationdata = (props) => {
    return (<>
        <div className="t-card">
            <div className="t-image">
                <img alt="img1" src={props.imgUrl} />
            </div>

            <h4>{props.heading}</h4>
            <p>{props.description}</p>

        </div>
    </>);
}
export default Otherdestinationdata;