import Subtitle from "@/components/input/typography/subtitle";
import { RECIPE_DETAIL_PAGE_VIDEO_TITLE } from "@/consts/text.const";
import { extractYouTubeVideoId } from "../utils/extract-youtube-video-id";

interface RecipeDetailVideoProps {
  youtubeId: string;
}

function RecipeDetailVideo({ youtubeId }: RecipeDetailVideoProps) {
  const videoId = extractYouTubeVideoId(youtubeId);

  return (
    <div className="space-y-4">
      <Subtitle>{RECIPE_DETAIL_PAGE_VIDEO_TITLE}</Subtitle>

      <div className="aspect-video w-full rounded-lg overflow-hidden">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    </div>
  );
}

export default RecipeDetailVideo;
