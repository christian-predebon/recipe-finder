import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout/layout";
import { ROUTES } from "./consts/routes.const";
import {
  BOOKMARK_BUTTON_TEXT,
  HOME_BUTTON_TEXT,
  RECIPE_DETAIL_PAGE_TITLE,
  SEARCH_BUTTON_TEXT,
} from "./consts/text.const";
import FavoritePage from "./pages/favorite-page";
import RecipeDetailPage from "./pages/recipe-detail-page";
import RecipePage from "./pages/recipe-page";
import SearchPage from "./pages/recipe-search-page";
import "./styles.css";

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Layout />,
    handle: { breadcrumb: HOME_BUTTON_TEXT },
    children: [
      {
        index: true,
        element: <RecipePage />,
      },
      {
        path: ROUTES.RECIPE,
        element: <RecipeDetailPage />,
        handle: { breadcrumb: RECIPE_DETAIL_PAGE_TITLE },
      },
      {
        path: ROUTES.FAVORITES,
        element: <FavoritePage />,
        handle: { breadcrumb: BOOKMARK_BUTTON_TEXT },
      },
      {
        path: ROUTES.SEARCH,
        element: <SearchPage />,
        handle: { breadcrumb: SEARCH_BUTTON_TEXT },
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
