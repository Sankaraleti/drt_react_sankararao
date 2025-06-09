import { Typography, Paper, Box, IconButton, Button } from "@mui/material";
import { useNavigate } from "react-router";
import type { SatelliteItem } from "../utils/types";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  selectedItems: SatelliteItem[];
  onRemove: (item: SatelliteItem) => void;
  onClearAll: () => void;
};

const SelectedItems = ({ selectedItems, onRemove, onClearAll }: Props) => {
  const navigate = useNavigate();

  const handleProceed = () => {
    navigate("/selected");
  };

  return (
    <Paper className="w-[400px] p-4 max-h-[600px] overflow-y-auto flex flex-col justify-between shadow-md">
      {/* Header */}
      <Box className="flex items-center justify-between mb-2">
        <Typography variant="h6">Selected ({selectedItems.length})</Typography>
        <Button
          size="small"
          color="error"
          onClick={onClearAll}
          disabled={selectedItems.length === 0}
        >
          Clear All
        </Button>
      </Box>

      {/* Table Header */}
      <Box
        sx={{
          display: "flex",
          fontWeight: "bold",
          bgcolor: "grey.100",
          px: 1,
          py: 0.5,
          borderRadius: 1,
          mb: 1,
          fontSize: 14,
        }}
      >
        <Box sx={{ flex: 1, minWidth: 100 }}>NORAD ID</Box>
        <Box sx={{ flex: 2, minWidth: 140 }}>Name</Box>
        <Box sx={{ width: 36 }} />
      </Box>

      {/* Table Rows */}
      <Box sx={{ flex: 1, overflowY: "auto" }}>
        {selectedItems.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            No items selected.
          </Typography>
        ) : (
          selectedItems.map((item) => (
            <Box
              key={item.noradCatId}
              sx={{
                display: "flex",
                alignItems: "center",
                px: 1,
                py: 0.5,
                borderBottom: "1px solid #eee",
                "&:last-child": { borderBottom: "none" },
                fontSize: 14,
                bgcolor: "background.paper",
                borderRadius: 1,
                mb: 0.5,
              }}
            >
              <Box sx={{ flex: 1, minWidth: 100 }}>{item.noradCatId}</Box>
              <Box sx={{ flex: 2, minWidth: 140 }}>{item.name}</Box>
              <IconButton
                size="small"
                color="error"
                onClick={() => onRemove(item)}
                sx={{ ml: 1 }}
                aria-label="Remove"
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          ))
        )}
      </Box>

      {/* Proceed Button */}
      <Button
        variant="contained"
        color="primary"
        className="mt-4"
        onClick={handleProceed}
        disabled={selectedItems.length === 0}
        fullWidth
        sx={{ mt: 2 }}
      >
        Proceed
      </Button>
    </Paper>
  );
};

export default SelectedItems;
