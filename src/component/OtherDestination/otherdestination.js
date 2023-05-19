
import { useState } from 'react';
import './otherdestination.css';
import Otherdestinationdata from './otherdestinationdata';
const Otherdestination = () => {
    const [trip, setTrip] = useState([
        {
            id: 1,
            title: 'Museo de Baler',
            description: "Cultural hub showcasing artifacts, paintings, memorabilia & ethnic exhibits of the region.",
            imgUrl: 'http://1.bp.blogspot.com/-FalNC3FnbNI/UkhqH_OHwSI/AAAAAAAAfh4/5SI7A6yCbzg/s1600/Museo+de+Baler.jpg',
        },
        {
            id: 2,
            title: 'Zabali Hanging Bridge',
            description: "Famed, long, hanging pedestrian bridge over the Tibag-Sabang River, with dramatic views.",
            imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6d96EnYlnNgoydxOddhnFClzEbfRclWPwEijhb7hJ&s'

        }, {

            id: 3,
            title: 'Sabang Beach',
            description: "Relaxed beach featuring strong waves suitable for surfing, with a peaceful vibe",
            imgUrl: 'https://i0.wp.com/palawanalternative.com/wp-content/uploads/2018/04/545948_10151147477523711_965478264_n-e1556025665338.jpg?fit=600%2C450&ssl=1'
        }

    ]);
    return (<>
        <div className="trip">
            <h1>Destination</h1>
            <p>Many destionatio to explore.</p>
            <div className='tripcard'>
                {trip?.map((item) => {
                    return (
                        <>
                            <Otherdestinationdata
                                heading={item.title}
                                description={item.description}
                                imgUrl={item.imgUrl}

                            />
                        </>
                    )
                })}
            </div>

        </div>
    </>)
}
export default Otherdestination;