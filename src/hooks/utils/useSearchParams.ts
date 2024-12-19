import { useNavigate, useLocation } from "react-router-dom";

export default function useSearchParams() {
  const navigate = useNavigate();
  const { search, pathname } = useLocation();

  const searchParams = new URLSearchParams(search);

  const setParam = (
    key: string,
    value: string,
    isArrayParam = false,
    navigateParams: {
      replace: boolean;
      state: any;
    } = { replace: false, state: null }
  ) => {
    const valuesUnderKey = searchParams.get(key)?.split(",") || [];

    if (valuesUnderKey?.length > 0 && isArrayParam) {
      if (valuesUnderKey.includes(value)) {
        const updatedValues = valuesUnderKey.filter((v) => v !== value);

        updatedValues.length > 0
          ? searchParams.set(key, updatedValues.join(","))
          : searchParams.delete(key);
      } else searchParams.set(key, valuesUnderKey.concat([value]).join(","));
    } else searchParams.set(key, value);

    navigate(`${pathname}?${searchParams.toString()}`, {
      replace: navigateParams.replace,
      state: navigateParams.state,
    });
  };

  const removeParam = (
    key: string,
    navigateParams: {
      replace: boolean;
      state: any;
    } = { replace: false, state: null }
  ) => {
    searchParams.delete(key);
    navigate(`${pathname}?${searchParams.toString()}`, {
      replace: navigateParams.replace,
      state: navigateParams.state,
    });
  };

  const getParam = (key: string) => searchParams.get(key);

  return { setParam, removeParam, getParam };
}
