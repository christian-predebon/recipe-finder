import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./components/layout/layout";
import RecipeDetailPage from "./components/recipe-detail/recipe-detail";
import FavoritePage from "./pages/favorite-page";
import RecipePage from "./pages/recipe-page";
import "./styles.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <RecipePage />,
      },
      {
        path: "recipe/:id",
        element: <RecipeDetailPage />,
      },
      {
        path: "favorites",
        element: <FavoritePage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
