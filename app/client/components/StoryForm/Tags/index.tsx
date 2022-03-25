import { Badge, FormLabel, GridItem } from "@chakra-ui/react";
import TagType from "@lib/types/TagType";
import { useField } from "formik";
import { memo } from "react";

import useSWR from "swr";
import AdditionalTags from "./AdditionalTags";
import TagList from "./TagList";

const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/tags";
const Index = () => {
  const { data } = useSWR<{ tags: TagType[] }>(apiUrl);

  const [{ value: isFromHistory }] = useField("isFromHistory");
  return (
    <GridItem p="4px" colSpan={2}>
      {data && (
        <>
          <FormLabel>Tags</FormLabel>
          <TagList tags={data.tags} />
        </>
      )}
      {!isFromHistory && (
        <AdditionalTags
          tagsExisted={data?.tags?.map((tag) => tag.title) || []}
        />
      )}
    </GridItem>
  );
};

export default memo(Index);
