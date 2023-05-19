import { useState } from 'react';
import './destination.css';
import Destinationdata from './destinationdata';
const Destination = () => {
    const [des, setDestination] = useState([
        {
            id: 1,
            title: 'Dicasalarin Cove',
            cName: "first-des",
            description: "Dicasalarin Cove is a private white beach in Baler. Baler, Aurora's piece of Paradise famous for its white sand, crystal blue beach, The Lighthouse and stunning views you can't find anywhere else",
            imgUrl1: 'https://mystormlesssky.files.wordpress.com/2016/08/1467261073189.png?w=1024&h=633&crop=1',
            imgUrl2: 'https://mystormlesssky.files.wordpress.com/2016/08/2016-06-30-11-32-56-1.jpg?w=595&zoom=2'
        },
        {
            id: 2,
            title: 'Ditumabo Mother Falls',
            cName: "first-des-reverse",
            description: "Ditumabo Mother Falls is a hidden gem located in Barangay Ditumabo, San Luis, Aurora. It provides a stress-relieving view and one of a kind swimming experience for visitors and nature lovers. Ditumabo Mother Falls has a height of 42 meters or 140 feet. Because of its towering height, a thirty-five-meter-wide basin provides tourists with a natural cold swimming pool and insanely cold water coming from the Sierra Madre mountain range, it’s become one of the best tourist destinations in the province of Aurora.",
            imgUrl1: 'https://2.bp.blogspot.com/-OWJOQJiicsk/U1ZNF2Pf1mI/AAAAAAAAVi8/vGSJgjwh9FQ/s1200/ditumabo-falls.jpg',
            imgUrl2: 'https://i.ytimg.com/vi/z_lc3SyJ0Y8/maxresdefault.jpg'

        }

    ]);
    return (
        <>
            <div className="destination">
                <h1>Popular Destination</h1>
                <p>Tour give you opportunity to see a lot with in time frame </p>
                {des?.map((item) => {
                    return (
                        <>
                            <Destinationdata
                                cName={item.cName}
                                title={item.title}
                                description={item.description}
                                imgUrl1={item.imgUrl1}
                                imgUrl2={item.imgUrl2}

                            />
                        </>
                    )
                })}
            </div>
        </>
    );
}
export default Destination;