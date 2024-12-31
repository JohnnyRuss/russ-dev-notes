import useSearchParams from "./useSearchParams";

export default function useToggleSideBarNavTree() {
  const { getParam, removeParam, setParam } = useSearchParams();
  const navIsToggled = getParam("nav") === "1";

  const toggleNavBar = () =>
    navIsToggled ? removeParam("nav") : setParam("nav", "1");

  return { navIsToggled, toggleNavBar };
}
