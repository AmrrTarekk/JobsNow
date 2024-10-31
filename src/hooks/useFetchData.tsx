import axios from "axios";
import { useEffect, useState } from "react";

export default function useFetchData<t>(url: string, delay = 0, news = false) {
  const [data, setData] = useState<t>({} as t);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ code: 0, message: "" });

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    if (url.includes("undefined")) return;
    const cleanUp = setTimeout(() => {
      axios
        .get(`/public${url}`, { signal: controller.signal })
        .then(({ data }) => {
          setData(data);
          setLoading(false);
          setError({ code: 0, message: "" });
        })
        .catch((err: { code: number; message: string }) => {
          setLoading(false);
          setError(() => ({ code: err.code, message: err.message }));
        });
    }, delay);
    return () => {
      controller.abort();
      clearTimeout(cleanUp);
    };
  }, [delay, news, url]);

  return { data, loading, error, setData };
}
