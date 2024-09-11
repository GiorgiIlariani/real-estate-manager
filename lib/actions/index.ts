import { url } from "../utils";

export const fetchCities = async () => {
    try {
        const response = await fetch(`${url}/cities`);
        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error);
    }
}