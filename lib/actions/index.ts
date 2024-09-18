import { url } from "../utils";
import { AddAgentFormSchema } from "../validation";
import { z } from "zod";


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

export const realEstates = async () => {
   try {
    const response =  await fetch(`${url}/real-estates`, {
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

export const eachRealEstate = async (id: string) => {
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

// post real estate