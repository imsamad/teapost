import { ArrowRightIcon } from "@chakra-ui/icons";
import { Stack } from "@chakra-ui/react";
import { TPInput } from "@compo/FormFields";
import TSButton from "@compo/UI/TSButton";
import { useFormikContext } from "formik";
import React from "react";
const ip = {
  variant: "unstyled",
  fontWeight: 700,
  fontSize: "1.25rem",
  borderBottom: "1px",
};
const Index = () => {
  const { isSubmitting } = useFormikContext();
  return (
    <Stack spacing={4}>
      <TPInput name="fullName" inputProps={ip} label="Full Name" isRequired />
      <TPInput name="username" inputProps={ip} label="Username" isRequired />
      <TPInput
        name="email"
        inputProps={{
          isReadOnly: true,
          isDisabled: true,
          ...ip,
        }}
        label="Email"
        isRequired
      />
      <TPInput name="tagLines[0]" inputProps={ip} label="Tag One" />
      <TPInput name="tagLines[1]" inputProps={ip} label="Tag Two" />
      <TPInput name="tagLines[2]" inputProps={ip} label="Tag Three" />
      <TSButton
        rightIcon={<ArrowRightIcon fontSize="sm" />}
        type="submit"
        isFullWidth
        size="md"
        colorScheme="blue"
        variant="outline"
        isLoading={isSubmitting}
      >
        Submit
      </TSButton>
    </Stack>
  );
};

export default Index;
