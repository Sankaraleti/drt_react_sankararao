import { Box, Checkbox } from "@mui/material";
import { type ListChildComponentProps } from "react-window";
import type { SatelliteItem } from "../utils/types";

type RowProps = ListChildComponentProps<SatelliteItem[]> & {
  selectedIds: string[];
  onToggle: (item: SatelliteItem) => boolean;
};

const SatelliteRow = ({
  index,
  style,
  data,
  selectedIds,
  onToggle,
}: RowProps) => {
  const item = data[index];
  const checked = selectedIds.includes(item.noradCatId);

  return (
    <Box
      style={style}
      display="flex"
      alignItems="center"
      px={2}
      py={0.5}
      borderBottom="1px solid #eee"
      className="text-sm"
    >
      <Checkbox
        checked={checked}
        onChange={() => onToggle(item)}
        size="small"
      />
      <Box className="w-[150px] mx-2 truncate">{item.name}</Box>
      <Box className="w-[150px] mx-2 truncate">{item.noradCatId}</Box>
      <Box className="w-[150px] mx-2 truncate">{item.orbitCode}</Box>
      <Box className="w-[150px] mx-2 truncate">{item.objectType}</Box>
      <Box className="w-[150px] mx-2 truncate">{item.countryCode}</Box>
      <Box className="w-[150px] mx-2 truncate">{item.launchDate}</Box>
    </Box>
  );
};

export default SatelliteRow;
