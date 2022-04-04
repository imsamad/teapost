import { ButtonGroup } from "@chakra-ui/react";
import TSButton from "@compo/UI/TSButton";
import TSIconButton from "@compo/UI/TSIconButton";
import { BiCommentAdd, BiDislike, BiLike } from "react-icons/bi";
import dynamic from "next/dynamic";
import { AiFillFileAdd } from "react-icons/ai";

const StoryActions = dynamic(() => import("./StoryActions"), {
  ssr: false,
  loading: () => <Temp />,
});

export default function index({
  storyId,
  noOfLikes,
  noOfDislikes,
  noOfComments,
  share,
}: {
  storyId: string;
  noOfLikes: number;
  noOfDislikes: number;
  noOfComments: number;
  share: {
    title: string;
    text: string;
    url: string;
  };
}) {
  return (
    <StoryActions
      storyId={storyId}
      noOfLikes={noOfLikes}
      noOfDislikes={noOfDislikes}
      noOfComments={noOfComments}
      share={share}
    />
  );
}

const Temp = () => {
  return (
    <ButtonGroup alignItems="center">
      <TSButton
        _active={{
          border: "1px solid blue",
          color: "blue",
        }}
        leftIcon={<BiLike />}
        size="xs"
        variant="solid"
        colorScheme="gray"
      >
        4
      </TSButton>
      <TSButton
        _active={{
          border: "1px solid blue",
          color: "blue",
        }}
        leftIcon={<BiDislike />}
        size="xs"
        variant="solid"
        colorScheme="gray"
      >
        4
      </TSButton>
      <TSIconButton
        aria-label="comment"
        size="xs"
        variant="solid"
        colorScheme="gray"
        icon={<BiCommentAdd />}
      />
      <TSIconButton
        variant="solid"
        colorScheme="gray"
        icon={<AiFillFileAdd fontSize="19px" />}
        size="xs"
        aria-label="add to reading list"
      />
    </ButtonGroup>
  );
};
