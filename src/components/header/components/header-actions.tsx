import Button from "@/components/input/button/button";
import { BOOKMARK_BUTTON_TEXT, SEARCH_BUTTON_TEXT } from "@/consts/text.const";
import useIsSmallScreen from "@/hooks/use-is-small-screen/use-is-small-screen";
import { Heart, Menu, Search } from "react-feather";

interface HeaderActionsProps {
  onClickFavorites: () => void;
  onClickSearch: () => void;
  onOpenMenu: () => void;
}

function HeaderActions({
  onClickFavorites,
  onClickSearch,
  onOpenMenu,
}: Readonly<HeaderActionsProps>) {
  const isSmallScreen = useIsSmallScreen();

  if (isSmallScreen) {
    return <Button onClick={onOpenMenu} icon={<Menu className="h-5 w-5" />} />;
  }

  return (
    <div className="flex flex-row items-center gap-2">
      <Button
        onClick={onClickSearch}
        icon={<Search className="h-5 w-5" />}
        title={SEARCH_BUTTON_TEXT}
      />
      <Button
        onClick={onClickFavorites}
        icon={
          <Heart className="h-3.5 w-3.5 text-red-dark" fill="currentColor" />
        }
        title={BOOKMARK_BUTTON_TEXT}
      />
    </div>
  );
}

export default HeaderActions;
