import api from "../index";
import { Region } from "../../utils/models";

const baseUrl = "/region";

// ======================================== Get Regions Api ========================================

export const getRegions = async (): Promise<Region[]> => {
  try {
    const { data: regions } = await api({
      method: "get",
      url: `${baseUrl}`,
    });

    return regions.map((region: Region) => {
      return {
        ...region,
        Latitude: Number(region.Latitude),
        Longitude: Number(region.Longitude),
      };
    });
  } catch (err) {
    console.log("err", err);
    throw err;
  }
};

// ======================================== Get Session Types Api ========================================

export const getSessions = async (): Promise<string[]> => {
  try {
    const { data: sessions } = await api({
      method: "get",
      url: "session",
    });
    return sessions?.map(
      (session: { SessionType: string }) => session.SessionType
    );
  } catch (err) {
    console.log("err", err);
    throw err;
  }
};
