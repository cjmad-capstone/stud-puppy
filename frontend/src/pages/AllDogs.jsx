import {useEffect, useRef, useState} from "react";
import DogCard from "../components/DogCard/DogCard.jsx";


const AllDogs = () => {

    // Fetches data from api, gets json from the response
    function getDogs(){
        return fetch('/api/dogs').then(res => res.json())
    }

    // State that will hold our dogs array when the data is fetched
    const [dogs, setDogs] = useState();

    // Effect gets called when the component is mounted (put into the DOM)
    // it then uses our getDogs function to fetch and set the state
    useEffect(() => {
        getDogs().then(data => setDogs(data))
    }, [])

    console.log(dogs)

    return(
        <>
            <div className={'flex'}>
            {
                dogs?.map(dog => <DogCard dog={dog} />)
            }
            </div>
        </>
    )
}


export default AllDogs