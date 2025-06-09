import React, { useState } from "react";
import Select, { type MultiValue } from "react-select";
import { Box, Button, Typography } from "@mui/material";

const objectTypeOptions = [
  { value: "DEBRIS", label: "DEBRIS" },
  { value: "ROCKET BODY", label: "ROCKET BODY" },
  { value: "PAYLOAD", label: "PAYLOAD" },
  { value: "UNKNOWN", label: "UNKNOWN" },
];

const orbitCodeOptions = [
  "LEO",
  "LEO1",
  "LEO2",
  "LEO3",
  "LEO4",
  "MEO",
  "GEO",
  "HEO",
  "IGO",
  "EGO",
  "NSO",
  "GTO",
  "GHO",
  "HAO",
  "MGO",
  "LMO",
  "UFO",
  "ESO",
  "UNKNOWN",
].map((code) => ({ value: code, label: code }));

type OptionType = { value: string; label: string };

type FiltersProps = {
  onApply: (filters: { objectTypes: string[]; orbitCodes: string[] }) => void;
};

const Filters: React.FC<FiltersProps> = ({ onApply }) => {
  const [selectedObjectTypes, setSelectedObjectTypes] = useState<
    MultiValue<OptionType>
  >([]);
  const [selectedOrbitCodes, setSelectedOrbitCodes] = useState<
    MultiValue<OptionType>
  >([]);

  const handleApply = () => {
    onApply({
      objectTypes: selectedObjectTypes.map((opt) => opt.value),
      orbitCodes: selectedOrbitCodes.map((opt) => opt.value),
    });
  };

  return (
    <Box className="flex gap-4 items-end mb-4">
      <Box className="w-60">
        <Typography variant="body2">
          Object Type ({selectedObjectTypes.length})
        </Typography>
        <Select
          isMulti
          options={objectTypeOptions}
          value={selectedObjectTypes}
          onChange={setSelectedObjectTypes}
        />
      </Box>
      <Box className="w-60">
        <Typography variant="body2">
          Orbit Code ({selectedOrbitCodes.length})
        </Typography>
        <Select
          isMulti
          options={orbitCodeOptions}
          value={selectedOrbitCodes}
          onChange={setSelectedOrbitCodes}
        />
      </Box>
      <Button variant="contained" onClick={handleApply}>
        Apply Filters
      </Button>
    </Box>
  );
};

export default Filters;
