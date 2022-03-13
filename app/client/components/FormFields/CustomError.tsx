import { Box, Collapse, Text } from "@chakra-ui/react";
import { nanoid } from "nanoid";
import { typeOf } from "../../lib/utils";

const Error = ({
  errors,
  isError,
}: {
  isError: boolean;
  errors: string | string[];
}) => {
  return (
    // @ts-ignore
    <Collapse in={isError} animateOpacity>
      <Box color="red.600">
        {isError && typeOf(errors, "array") ? (
          // @ts-ignore
          [...new Set(errors)].map((err: string) => (
            <Text fontSize="md" key={err || nanoid(10)} color="red.500">
              {err}
            </Text>
          ))
        ) : isError ? (
          <Text fontSize="md">{errors}</Text>
        ) : null}
      </Box>
    </Collapse>
  );
};

export default Error;
