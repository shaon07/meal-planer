import { memo, useCallback } from "react";
import useCommonData from "../../../resources/useCommonData";
import type { MenuItem } from "../../../types/index.d";
import { updateQueryParams } from "../../../utils";
import Logo from "../../atoms/Logo";
import TabBar from "../../molecules/TabBar";

const Navbar = memo(() => {
  const { headerTabMenus } = useCommonData();
  const handleTabChange = useCallback((selectedTab: MenuItem) => {
    updateQueryParams(selectedTab.value);
  }, []);

  return (
    <nav className="bg-neutral-primary w-full border-b border-default">
      <Logo />

      <TabBar options={headerTabMenus} onTabChange={handleTabChange} />
    </nav>
  );
});

export default Navbar;
Navbar.displayName = "Navbar";
