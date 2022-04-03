import { Box } from "@chakra-ui/react";
import { replyComment } from "@lib/api/commentApi";
import { PrimaryComment } from "@lib/types/CommentTypes";
import useSWR from "swr";
import { boolean } from "yup";
import Comment from "../Comment";
import InputField from "../InputField";
import Skeleton from "../Skeleton";

const Index = ({
  url,
  isPrimary,
  isReplyOpen,
}: {
  url: string;
  isPrimary: boolean;
  isReplyOpen?: boolean;
}) => {
  const {
    data,
    isValidating,
    mutate: mutateSec,
  } = useSWR<{ comments: PrimaryComment[] }>(() => url && url);
  const mutate = isPrimary ? () => {} : () => mutateSec();
  const onSave = async (val: string) => {
    replyComment({
      isReplyToPrimary: true,
      // @ts-ignore
      commentId: url.split("/").pop(),
      text: val,
    }).then(async (res) => {
      // const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/comments/secondaries/${commentId}`;
      // mutateSWR([endpoint]);
      mutateSec();
    });
  };
  return (
    <>
      {isValidating && !isReplyOpen ? (
        <Skeleton />
      ) : (
        <>
          {data &&
            data?.comments.map((comment) => (
              <Comment
                mutate={() => mutate()}
                key={comment._id}
                comment={comment}
                isPrimary={isPrimary}
              />
            ))}
        </>
      )}
    </>
  );
};

export default Index;
