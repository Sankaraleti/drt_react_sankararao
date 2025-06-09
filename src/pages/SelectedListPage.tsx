import { useEffect, useState } from "react";
import { Box, Typography, List, ListItem } from "@mui/material";
import type { SatelliteItem } from "../utils/types";

const SelectedListPage = () => {
  const [selectedItems, setSelectedItems] = useState<SatelliteItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("selectedItems");
    if (stored) {
      setSelectedItems(JSON.parse(stored));
    }
  }, []);

  return (
    <Box className="p-4">
      <Typography variant="h5" gutterBottom>
        Selected Satellite Items
      </Typography>
      {selectedItems.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No selected items found.
        </Typography>
      ) : (
        <Box>
          {/* Table Headers */}
          <Box
            sx={{
              display: "flex",
              fontWeight: "bold",
              bgcolor: "grey.100",
              px: 2,
              py: 1,
              borderRadius: 1,
              mb: 1,
            }}
          >
            <Box sx={{ flex: 2 }}>Name</Box>
            <Box sx={{ flex: 1 }}>NORAD Catalog ID</Box>
          </Box>
          <List disablePadding>
            {selectedItems.map((item) => (
              <ListItem
                key={item.noradCatId}
                sx={{
                  display: "flex",
                  px: 2,
                  py: 1,
                  borderBottom: "1px solid #eee",
                  "&:last-child": { borderBottom: "none" },
                  borderRadius: 1,
                  "&:hover": { bgcolor: "grey.50" },
                }}
              >
                <Box sx={{ flex: 2 }}>{item.name}</Box>
                <Box sx={{ flex: 1 }}>{item.noradCatId}</Box>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default SelectedListPage;
