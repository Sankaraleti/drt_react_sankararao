export type SatelliteItem = {
  noradCatId: string;
  intlDes: string;
  name: string;
  launchDate: string;
  decayDate: string | null;
  objectType: "DEBRIS" | "ROCKET BODY" | "UNKNOWN" | "PAYLOAD";
  launchSiteCode: string;
  countryCode: string;
  orbitCode: string;
};
