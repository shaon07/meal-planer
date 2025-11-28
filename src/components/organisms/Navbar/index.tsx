import { memo, useCallback, useMemo } from "react";
import { useQueryParams } from "../../../hooks/useQueryParams";
import useCommonData from "../../../resources/useCommonData";
import type { MenuItem } from "../../../types/index.d";
import Logo from "../../atoms/Logo";
import TabBar from "../../molecules/TabBar";

const Navbar = memo(() => {
  const { headerTabMenus } = useCommonData();
  const { params, setParam } = useQueryParams();

  const handleTabChange = useCallback(
    (selectedTab: MenuItem) => {
      setParam("tab", selectedTab.value);
    },
    [setParam]
  );

  const currentTabValue = useMemo(
    () => params.tab || headerTabMenus[0].value,
    [params.tab, headerTabMenus]
  );

  return (
    <nav className="bg-neutral-primary w-full border-b border-default">
      <Logo />

      <TabBar
        value={currentTabValue}
        options={headerTabMenus}
        onTabChange={handleTabChange}
      />
    </nav>
  );
});

export default Navbar;
Navbar.displayName = "Navbar";
