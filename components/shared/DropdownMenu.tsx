import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FiChevronDown } from "react-icons/fi";
import { AddAgentModal } from "./AddAgentModal";

const DropdownMenuComponent = ({
  agents,
  onSelectAgent,
}: {
  agents: AgentTypes[];
  onSelectAgent: (agent: AgentTypes) => void;
}) => {
  const [selectedAgent, setSelectedAgent] = useState<AgentTypes | null>(null);

  const handleAgentSelect = (agent: AgentTypes) => {
    setSelectedAgent(agent);
    onSelectAgent(agent); // Call the provided function to update form value
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full p-[10px] flex justify-between items-center border border-[#808A93] outline-none">
        <div>
          {selectedAgent
            ? `${selectedAgent.name} ${selectedAgent.surname}`
            : ""}
        </div>
        <FiChevronDown />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[385px]">
        <AddAgentModal type="from-addListing" />

        {agents.map((agent) => (
          <DropdownMenuItem
            key={agent.id}
            className="bg-white text-sm font-normal cursor-pointer"
            onClick={() => handleAgentSelect(agent)}>
            {agent.name} {agent.surname}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownMenuComponent;
