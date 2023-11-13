import api from "../index";

// ======================================== Get Session Types Api ========================================

export const getPhotographerSessions = async (query?: string) => {
  try {
    const { data } = await api({
      method: "get",
      url: `session/photographers?${query}`,
    });
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
