import { AiFillFileAdd } from "react-icons/ai";
import { BiCommentAdd } from "react-icons/bi";

import { useUICtx } from "@compo/Context";
import TSIconButton from "@compo/UI/TSIconButton";
import TSButton from "@compo/UI/TSButton";

const CommentsAndCollections = ({
  storyId,
  size,
  displayFull,
}: {
  storyId: string;
  size: string;
  displayFull: boolean;
}) => {
  const { drawer, comment } = useUICtx();
  return (
    <>
      <TSIconButton
        aria-label="comment"
        size={size}
        variant={displayFull ? "outline" : "solid"}
        colorScheme={displayFull ? "purple" : "gray"}
        icon={<BiCommentAdd />}
        onClick={() => comment.onOpen(storyId)}
      />
      {displayFull ? (
        <TSButton
          onClick={() => {
            drawer.onOpen(storyId);
          }}
          _active={{
            outline: "none",
          }}
          leftIcon={<AiFillFileAdd fontSize="19px" />}
          size={size}
          variant="outline"
          colorScheme="purple"
        >
          Add To Collections
        </TSButton>
      ) : (
        <TSIconButton
          onClick={() => {
            drawer.onOpen(storyId);
          }}
          _active={{
            outline: "none",
          }}
          icon={<AiFillFileAdd fontSize="19px" />}
          size={size}
          aria-label="add to reading list"
        />
      )}
    </>
  );
};

export default CommentsAndCollections;
