import { FixedSizeList } from "react-window";
import SatelliteRow from "./SatelliteRow";
import type { SatelliteItem } from "../utils/types";
import { Box } from "@mui/material";

type Props = {
  data: SatelliteItem[];
  selectedIds: string[];
  onToggle: (item: SatelliteItem) => boolean;
};

const SatelliteTable = ({ data, selectedIds, onToggle }: Props) => (
  <div className="flex-1 h-[500px] overflow-hidden border rounded shadow">
    <div className="flex px-4 py-2 bg-gray-100 font-semibold text-sm">
      <Box className="w-[40px]" />
      <Box className="w-[150px] mx-2">Name</Box>
      <Box className="w-[150px] mx-2">NORAD ID</Box>
      <Box className="w-[150px] mx-2">Orbit</Box>
      <Box className="w-[150px] mx-2">Object Type</Box>
      <Box className="w-[150px] mx-2">Country</Box>
      <Box className="w-[150px] mx-2">Launch Date</Box>
    </div>
    <FixedSizeList
      height={460}
      itemSize={36}
      itemCount={data.length}
      itemData={data}
      width="100%"
    >
      {(props) => (
        <SatelliteRow
          {...props}
          selectedIds={selectedIds}
          onToggle={onToggle}
        />
      )}
    </FixedSizeList>
  </div>
);

export default SatelliteTable;
