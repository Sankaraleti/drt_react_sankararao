import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  CircularProgress,
  Snackbar,
  Alert,
  Typography,
  TextField,
} from "@mui/material";
import SatelliteTable from "../components/SatelliteTable";
import SelectedItems from "../components/SelectedItems";
import fetchSatelliteData from "../utils/fetchSatelliteData";
import type { SatelliteItem } from "../utils/types";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import Filters from "../components/Filters";

const Table = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["satellites"],
    queryFn: fetchSatelliteData,
  });

  const [selectedItems, setSelectedItems] = useState<SatelliteItem[]>(() => {
    const stored = localStorage.getItem("selectedItems");
    return stored ? JSON.parse(stored) : [];
  });
  const [searchInput, setSearchInput] = useState("");
  const [searchText, setSearchText] = useState("");
  const debouncedSearch = useDebouncedValue(searchText, 200);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchText(searchInput);
    }
  };
  const [showLimitAlert, setShowLimitAlert] = useState(false);
  const [filters, setFilters] = useState<{
    objectTypes: string[];
    orbitCodes: string[];
  }>({
    objectTypes: [],
    orbitCodes: [],
  });

  const handleApplyFilters = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const toggleSelect = (item: SatelliteItem): boolean => {
    const exists = selectedItems.find((s) => s.noradCatId === item.noradCatId);
    if (exists) {
      const updated = selectedItems.filter(
        (s) => s.noradCatId !== item.noradCatId
      );
      setSelectedItems(updated);
      localStorage.setItem("selectedItems", JSON.stringify(updated));
      return true;
    } else {
      if (selectedItems.length >= 10) {
        setShowLimitAlert(true);
        return false;
      }
      const updated = [...selectedItems, item];
      setSelectedItems(updated);
      localStorage.setItem("selectedItems", JSON.stringify(updated));
      return true;
    }
  };

  const filteredData = data
    ?.filter((item) => {
      const lower = debouncedSearch.toLowerCase();
      return (
        item.name.toLowerCase().includes(lower) ||
        item.noradCatId.toLowerCase().includes(lower)
      );
    })
    ?.filter((item) => {
      const matchObjectType =
        filters.objectTypes.length === 0 ||
        filters.objectTypes.includes(item.objectType);
      const matchOrbitCode =
        filters.orbitCodes.length === 0 ||
        filters.orbitCodes.includes(item.orbitCode);
      return matchObjectType && matchOrbitCode;
    });
  if (isLoading)
    return (
      <Box className="p-4 text-center">
        <CircularProgress />
      </Box>
    );

  if (isError)
    return (
      <Box className="p-4 text-center text-red-600">
        Failed to load satellite data.
      </Box>
    );

  return (
    <Box className="p-4">
      <Box className="flex justify-between items-center mb-2">
        <Typography variant="h5">Satellites Table</Typography>
        <Typography variant="body2" color="text.secondary">
          Total Records: {filteredData?.length}
        </Typography>
      </Box>
      <Box className="mb-4 flex justify-between">
        <TextField
          variant="outlined"
          label="Search by Name or NORAD ID"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-[300px]"
        />
        <Filters onApply={handleApplyFilters} />
      </Box>

      <Box className="flex gap-4">
        <SatelliteTable
          data={filteredData ?? []}
          selectedIds={selectedItems.map((s) => s.noradCatId)}
          onToggle={toggleSelect}
        />
        <SelectedItems
          selectedItems={selectedItems}
          onRemove={(item) => toggleSelect(item)}
          onClearAll={() => {
            setSelectedItems([]);
            localStorage.setItem("selectedItems", "[]");
          }}
        />
      </Box>

      <Snackbar
        open={showLimitAlert}
        autoHideDuration={2000}
        onClose={() => setShowLimitAlert(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" onClose={() => setShowLimitAlert(false)}>
          You can only select up to 10 items.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Table;
