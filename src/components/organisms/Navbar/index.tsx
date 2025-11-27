import Logo from "../../atoms/Logo";
import TabBar from "../../molecules/TabBar";

export default function Navbar() {
  return (
    <nav className="bg-neutral-primary w-full border-b border-default">
      <Logo />
      <TabBar
        options={[
          { value: "recipes", label: "Recipes" },
          { value: "plan", label: "Meal Plan" },
          { value: "shopping", label: "Shopping List" },
        ]}
        onTabChange={(selectedTab) => {
          console.log("Selected Tab:", selectedTab);
        }}
      />
    </nav>
  );
}
