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
  error,
}: {
  agents: AgentTypes[];
  onSelectAgent: (agent: AgentTypes) => void;
  error: unknown;
}) => {
  const initialSelectedAgent = JSON.parse(
    (typeof window !== "undefined" && localStorage.getItem("selectedAgent")) ||
      "null"
  );

  const [selectedAgent, setSelectedAgent] = useState<AgentTypes | null>(
    initialSelectedAgent
  );

  const handleAgentSelect = (agent: AgentTypes) => {
    setSelectedAgent(agent);
    onSelectAgent(agent);
    typeof window !== "undefined" &&
      localStorage.setItem("selectedAgent", JSON.stringify(agent));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`w-full h-[40px] p-[10px] rounded-md flex justify-between items-center border border-[#808A93] outline-none ${
          error && !selectedAgent ? "border-[#F93B1D]" : "border-[#808A93]"
        }`}>
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
