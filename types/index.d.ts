

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

declare interface AgentTypes {
  id: name;
  name: string;
  surname: string;
  avatar: string;
}

declare interface AddListingProps {
  cities: CityTypes[];
  regions: RegionTypes[];
  agents: AgentTypes[];
}
  