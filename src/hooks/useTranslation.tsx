import { useAppSelector } from "../redux/hook/reduxHook";
import data from "../utilities/translation.json";

export interface dataType {
  [key: string]: {
    [key: string]: string;
  };
}

function useTranslation() {
  const { lang } = useAppSelector((state) => state.language);
  function t(value: string): string {
    try {
      return (data as dataType)[value.toLowerCase()][lang];
    } catch (error) {
      return value;
    }
  }
  return { t, language: lang };
}

export default useTranslation;
