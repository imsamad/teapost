import { ButtonGroup, ThemingProps } from "@chakra-ui/react";
import TSButton from "@compo/UI/TSButton";
import TSIconButton from "@compo/UI/TSIconButton";
import { BiCommentAdd, BiDislike, BiLike } from "react-icons/bi";
import dynamic from "next/dynamic";
import { AiFillFileAdd } from "react-icons/ai";
// import StoryActions from "./StoryActions";
const StoryActions = dynamic(() => import("./StoryActions"), {
  ssr: false,
  loading: () => <Temp />,
});

export default function index({
  storyId,
  like,
  dislike,
  btnSize = "xs",
  displayFull = false,
}: {
  storyId: string;
  like: number;
  dislike: number;
  btnSize?: ThemingProps<"Button">["size"];
  displayFull?: boolean;
}) {
  return (
    <StoryActions
      storyId={storyId}
      like={like}
      dislike={dislike}
      btnSize={btnSize}
      displayFull={displayFull}
    />
  );
}
const Temp = () => {
  return (
    <ButtonGroup spacing={3} alignItems="center">
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
