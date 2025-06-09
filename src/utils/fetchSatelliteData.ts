import type { SatelliteItem } from "./types";

const ENDPOINT = `https://backend.digantara.dev/v1/satellites?objectTypes=ROCKET%20BODY,DEBRIS&attributes=noradCatId,intlDes,name,launchDate,decayDate,objectType,launchSiteCode,countryCode,orbitCode`;

const fetchSatelliteData = async (): Promise<SatelliteItem[]> => {
  const response = await fetch(ENDPOINT, {
    headers: {
      Accept: "application/json",
    },
  });
  // console.log("response => ", response);
  if (!response.ok) {
    throw new Error("Failed to fetch satellite data");
  }

  const data = await response.json();
  console.log("data => ", data);
  return data?.data;
};

export default fetchSatelliteData;
