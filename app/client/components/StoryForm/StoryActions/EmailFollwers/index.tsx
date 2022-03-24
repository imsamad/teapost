import { Heading, HStack, Switch } from "@chakra-ui/react";
import { useField } from "formik";
import { memo } from "react";

const Index = () => {
  const [{ value }] = useField<boolean>("isPublished");

  const handleChange = async () => {};

  return (
    <HStack>
      <Heading size="sm">Email To Followers</Heading>
      <Switch size="lg" onChange={handleChange} disabled={!value} />
    </HStack>
  );
};

export default memo(Index);
