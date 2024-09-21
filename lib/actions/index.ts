'use server';

import { revalidatePath } from "next/cache";
import { url } from "../utils";


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
export const AddAgent = async  (formData: FormData) => {

  try {
    const response =  await fetch(`${url}/agents`, {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_REDBERRY_TOKEN}`,
      },
      cache: 'no-cache',
      body: formData,
    });

    revalidatePath('/add-listing');
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
      method: 'DELETE',
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_REDBERRY_TOKEN}`,
      },
      
    });
    
    revalidatePath('/')
    return response.status;
  } catch (error: any) {
    throw new Error(`Something went wrong: ${error.message}`);
  }
};



export const addRealEstate = async (formData: FormData) => {
  
  try {
    const response =  await fetch(`${url}/real-estates`, {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_REDBERRY_TOKEN}`,
      },
      body: formData,
    });

    revalidatePath('/')
    return response.status;
  } catch (error: any) {
    throw new Error(`Something went wrong: ${error.message}`);
  }
}