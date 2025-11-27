import { memo, useState } from "react";
import { useRecipes } from "../../../hooks/useRecipes";
import type { Recipe } from "../../../types";
import ErrorBox from "../../atoms/ErrorBox";
import LoaderSpinner from "../../atoms/LoaderSpinner";
import RecipeNotFound from "../../atoms/RecipeNotFound";
import Modal from "../../molecules/Modal";
import FilterRecipe from "../../organisms/FilterRecipe";
import RecipeCard from "../../organisms/RecipeCard";
import RecipeDetails from "../../organisms/RecipeDetails";

const RecipiesModule = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const { recipes, loading, error } = useRecipes(searchQuery, category);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  return (
    <div>
      <FilterRecipe
        onSearchChange={setSearchQuery}
        onCategoryChange={setCategory}
      />

      {loading && <LoaderSpinner />}
      {error && <ErrorBox error={error} />}

      {!loading && !error && recipes?.length === 0 && <RecipeNotFound />}

      {!loading && !error && recipes?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.idMeal}
              recipe={recipe}
              onViewDetails={setSelectedRecipe}
            />
          ))}
        </div>
      )}

      {selectedRecipe && (
        <Modal
          open={true}
          title={selectedRecipe?.strMeal}
          onClose={() => setSelectedRecipe(null)}
        >
          <RecipeDetails recipe={selectedRecipe} />
        </Modal>
      )}
    </div>
  );
};

export default memo(RecipiesModule);
RecipiesModule.displayName = "RecipiesModule";
