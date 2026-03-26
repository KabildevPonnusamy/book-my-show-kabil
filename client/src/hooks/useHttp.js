import { useReducer } from "react";

const httpReducer = (state, action) => {
  if (action.type === "PENDING") {
    return {
      data: null,
      isLoading: true,
      error: null,
    };
  }

  if (action.type === "SUCCESS") {
    return {
      data: action.payload,
      isLoading: false,
      error: null,
    };
  }
  if (action.type === "ERROR") {
    return {
      data: null,
      isLoading: false,
      error: action.error,
    };
  }

  throw new Error("Invalid Event.");
};
//
const useHttp = (requestFunction, isPending = false) => {
  const [httpState, dispatch] = useReducer(httpReducer, {
    data: null,
    isLoading: isPending,
    error: null,
  });

  const sendRequest = async (...requestData) => {
    try {
      dispatch({ type: "PENDING" });
      const data = await requestFunction(...requestData);
      console.log("data: ", data);
      dispatch({ type: "SUCCESS", payload: data.payload });
    } catch (err) {
      console.log(err);
      const apiMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "something went wrong";
      dispatch({ type: "ERROR", error: apiMessage });
    }
  };

  return { ...httpState, sendRequest };
  // It returns httpState like => data, isLoading and error; And sendRequest function.
};

export default useHttp;
