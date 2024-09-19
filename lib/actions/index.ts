import { url } from "../utils";
import { AddAgentFormSchema, AddListingFormSchema } from "../validation";
import { z } from "zod";


// cities and regions
export const fetchCities = async () => {
    try {
        const response = await fetch(`${url}/cities`, {
          headers: {
             accept: "application/json",
          }
        });
        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error);
    }
}

export const fetchRegions = async () => {
    try {
        const response = await fetch(`${url}/regions`, {
          headers: {
             accept: "application/json",
          }
        });
        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error);
    }
}

//  agent
export const AddAgent = async  (values: z.infer<typeof AddAgentFormSchema>) => {
  const formData = new FormData();

  formData.append("name", values.name);
  formData.append("surname", values.username);
  formData.append("phone", values.phone_number);
  formData.append("email", values.email);
  formData.append("avatar", values.image);

  try {
    const response =  await fetch(`${url}/agents`, {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_REDBERRY_TOKEN}`,
      },
      body: formData,
    });

    return response.status;
  } catch (error: any) {
    throw new Error(`Something went wrong: ${error.message}`);
  }
}

export const fetchAgents = async () => {
   try {
    const response =  await fetch(`${url}/agents`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_REDBERRY_TOKEN}`,
      },
    });
    const data = await response.json();

    return data;
  } catch (error: any) {
    throw new Error(`Something went wrong: ${error.message}`);
  }
};


// real estate
export const fetchRealEstates = async () => {
   try {
    const response =  await fetch(`${url}/real-estates`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_REDBERRY_TOKEN}`,
      },
      cache: 'no-cache',
    });
    const data = await response.json();

    return data;
  } catch (error: any) {
    throw new Error(`Something went wrong: ${error.message}`);
  }
};

export const fetchEachRealEstate = async (id: string) => {
   try {
    const response =  await fetch(`${url}/real-estates/${id}`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_REDBERRY_TOKEN}`,
      },
    });
    const data = await response.json();

    return data;
  } catch (error: any) {
    throw new Error(`Something went wrong: ${error.message}`);
  }
};

export const removeEachRealEstate = async (id: string) => {
   try {
    const response =  await fetch(`${url}/real-estates/${id}`, {
      headers: {
        method: 'DELETE',
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_REDBERRY_TOKEN}`,
      },
    });
    
    return response.status;
  } catch (error: any) {
    throw new Error(`Something went wrong: ${error.message}`);
  }
};

// Define the type based on your schema
type AddListingValues = z.infer<typeof AddListingFormSchema> & {
  city_id: string;
  region_id: string;
  agent_id: string;
};

export const addRealEstate = async (values: AddListingValues) => {
  console.log({ values });
  
  const formData = new FormData();

  const is_rental = values.transactionType === 'იყიდება' ? '0' : '1';

  formData.append("price", values.price);
  formData.append("zip_code", values.zip_code);
  formData.append("description", values.description);
  formData.append("area", values.area);
  formData.append("bedrooms", values.bedrooms);
  formData.append("image", values.image);
  formData.append("city_id", values.city_id);
  formData.append("address", values.location);
  formData.append("agent_id", values.agent_id);
  formData.append("region_id", values.region_id);
  formData.append("is_rental", is_rental);


  try {
    const response =  await fetch(`${url}/real-estates`, {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_REDBERRY_TOKEN}`,
      },
      body: formData,
    });

    return response.status;
  } catch (error: any) {
    throw new Error(`Something went wrong: ${error.message}`);
  }
}