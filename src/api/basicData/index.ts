import { AxiosResponse } from "axios";
import api from "../index";

const baseUrl = "/region";

// ======================================== Get Regions Api ========================================

export const getRegions = async (): Promise<string[]> => {
  try {
    const { data: regions } = await api({
      method: "get",
      url: `${baseUrl}`,
    });
    console.log("regions", regions);
    return regions?.map((region: { Region: string }) => region.Region);
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
