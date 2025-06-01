import { Bookmark } from "react-feather";
import { Outlet, useNavigate } from "react-router";

export const LAYOUT_TITLE = "La mia cucina";
const BOOKMARK_BUTTON_TEXT = "Preferiti";

function StickyHeader() {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <h2 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
              {LAYOUT_TITLE}
            </h2>
          </div>
          <button
            className="flex items-center gap-2 px-4 py-1.5 cursor-pointer rounded-md transition-all duration-200
                     shadow-sm border border-gray-200 text-sm font-semibold
                     hover:bg-gray-50 focus:bg-gray-50
                     focus:outline-none focus:ring-2 focus:ring-gray-200 bg-white"
            onClick={() => navigate("/favorites")}
          >
            <Bookmark className="h-4 w-4 text-orange-600" />
            {BOOKMARK_BUTTON_TEXT}
          </button>
        </div>
      </div>
    </div>
  );
}

function Layout() {
  return (
    <div className="min-h-screen">
      <StickyHeader />
      <div className="max-w-6xl mx-auto px-4 py-8 mt-16">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
