declare interface CustomProps {
  error: any;
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
  fieldType: FormFieldType;
  radioGroupValues?: {
    id: number;
    name: string;
  }[];
  bottomText?: string;
  setValue?: UseFormSetValue<{
    name: string;
    username: string;
    email: string;
    phone_number: string;
    image: string;
  }>;
  onChange?: (value: string) => void; // Add this line for onChange
}

declare interface CityTypes {
    id: number;
    name: string;
    region_id: number;
}

declare interface RegionTypes {
    id: number;
    name: string;
}


declare interface AddListingProps {
  cities: CityTypes[];
  regions: RegionTypes[];
  agents: AgentTypes[];
}

type City = {
  id: number;
  name: string;
  region_id: number;
  region: RegionTypes;
};

declare interface AgentTypes {
  id: number;
  name: string;
  surname: string;
  email: string;
  avatar: string;
  phone: string;
}

declare interface RealEstateListing {
  id: number;
  address: string;
  image: string;
  zip_code: string;
  description: string;
  price: number;
  bedrooms: number;
  area: number;
  is_rental: number;
  agent_id: number;
  city_id: number;
  created_at: string; 
  city: City; 
  agent: AgentTypes;
}
