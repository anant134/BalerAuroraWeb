import './ContactusStyle.css';
const ContactUs = () => {
    return (<>
        <div className='contact-container'>
            <h1>send message to us</h1>
            <form>
                <input placeholder="Name" />
                <input placeholder="Contact Number" ></input>
                <input placeholder="Email ID" ></input>
                <input placeholder="Suject" ></input>
                <textarea placeholder="Message" row="4" ></textarea>
                <button>Send Message</button>
            </form>
        </div>
    </>);
}
export default ContactUs;