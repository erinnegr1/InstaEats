import { useEffect, useState } from "react";
import yelp from "../api/yelp";
import * as Location from 'expo-location';



export default () => {
   // const [userAddress, setUserAddress] = useState('');
    const [restaurants, setRestaurants] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const searchApi = async searchAddress => {
    
        console.log('searchapi', searchAddress)
        
    
        const response = await yelp.get('/search', {
                params: {
                    location: searchAddress,
                    term: 'restaurants',
                    radius: 3000,
                    limit: 2,
                    open_now: true,
                    
                },
              
            });
            setRestaurants(response.data.businesses);
            console.log(restaurants)
            ///// Build in an else statement here that takes in the latitude and longitude as params

        };
        
        {/*
        useEffect(() => {
            searchApi("NYC");
        }, []); */}

    return [searchApi, restaurants, errorMessage]
       
    }; 
