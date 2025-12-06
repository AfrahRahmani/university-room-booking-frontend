// 🔄 Reusable fetch hook to load data easily in any page
import { useEffect, useState } from "react";

function useFetch(asyncFunction, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    setLoading(true);
    asyncFunction()
      .then((res) => {
        if (isMounted) setData(res);
      })
      .catch((err) => {
        if (isMounted) setError(err.message || "Something went wrong");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => (isMounted = false);
  }, deps);

  return { data, loading, error };
}

export default useFetch;