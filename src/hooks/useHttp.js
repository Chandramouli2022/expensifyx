import axios from "axios";
import { useState, useCallback } from "react";

const useHttp = () => {
  const [loading, setLoading] = useState(false);

  const httpRequest = useCallback(
    async (url, method = "GET", data = null, onSuccess, onError) => {
      try {
        setLoading(true);
        const response = await axios({
          method,
          url,
          data,
        });

        if (response.status >= 200 && response.status < 300) {
          onSuccess?.(response.data);
        } else {
          onError?.({
            message: "Unexpected response status",
            status: response.status,
          });
        }
      } catch (error) {
        const errorMessage =
          error.response?.data || error.message || "Something went wrong!";
        onError?.(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return [httpRequest, loading];
};

export default useHttp;
