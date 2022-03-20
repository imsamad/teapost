import { AiFillFileAdd } from "react-icons/ai";
import { BiCommentAdd } from "react-icons/bi";

import { useUICtx } from "@compo/Context";
import TSIconButton from "@compo/UI/TSIconButton";

const CommentsAndCollections = ({ storyId }: { storyId: string }) => {
  const { drawer, comment } = useUICtx();
  return (
    <>
      <TSIconButton
        onClick={() => {
          drawer.onOpen(storyId);
        }}
        _active={{
          outline: "none",
        }}
        icon={<AiFillFileAdd fontSize="19px" />}
        size="xs"
        aria-label="add to reading list"
      />
      <TSIconButton
        aria-label="comment"
        size="xs"
        icon={<BiCommentAdd />}
        onClick={() => comment.onOpen(storyId)}
      />
    </>
  );
};

export default CommentsAndCollections;
