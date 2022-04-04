import { CheckCircleIcon } from "@chakra-ui/icons";
import { CustomError } from "@compo/FormFields";
import TSButton from "@compo/UI/TSButton";
import TagType from "@lib/types/TagType";
import { useField } from "formik";
import React from "react";

const TagList = ({ tags }: { tags: TagType[] }) => {
  const [
    { value: tagValues },
    { initialValue: tagInitialValues, error, touched },
    { setValue, setTouched },
  ] = useField("tags");

  const [{ value: isFromHistory }] = useField("isFromHistory");
  return (
    <>
      {tags.length &&
        tags.map((tag) => (
          <TSButton
            key={tag._id}
            size="xs"
            m="1"
            disabled={isFromHistory}
            _disabled={{
              color: "gray.700",
              fontWeight: 800,
            }}
            variant={tagValues.includes(tag._id) ? "solid" : "outline"}
            leftIcon={tagValues.includes(tag._id) && <CheckCircleIcon />}
            // colorScheme="purple"
            onClick={() => {
              setValue(
                tagValues.includes(tag._id)
                  ? tagValues.filter((tagId: string) => tagId !== tag._id)
                  : [tag._id, ...tagValues]
              );
            }}
          >
            {tag.title}
          </TSButton>
        ))}
      <CustomError errors={error} isError={Boolean(error && touched)} />
    </>
  );
};

export default TagList;
