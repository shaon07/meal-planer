import FilterRecipe from "../organisms/FilterRecipe";

export default function HomepageContainer() {
  return (
    <div className="p-4">
      <div>
        <FilterRecipe onCategoryChange={() => {}} onSearchChange={() => {}} />
      </div>
    </div>
  );
}
