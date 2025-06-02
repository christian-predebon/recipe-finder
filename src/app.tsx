import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./components/layout/layout";
import RecipeDetailPage from "./components/recipe-detail/recipe-detail";
import { ROUTES } from "./consts/routes.const";
import FavoritePage from "./pages/favorite-page";
import RecipePage from "./pages/recipe-page";
import "./styles.css";

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <RecipePage />,
      },
      {
        path: ROUTES.RECIPE,
        element: <RecipeDetailPage />,
      },
      {
        path: ROUTES.FAVORITES,
        element: <FavoritePage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
