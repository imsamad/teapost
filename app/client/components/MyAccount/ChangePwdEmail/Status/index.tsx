import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Box, Collapse, Link, Text } from "@chakra-ui/react";
import { useFormikContext } from "formik";

import { typeOf } from "@lib/utils";
import { AuthResponse } from "@lib/api/authApi";

const FormStatus = () => {
  // @ts-ignore
  const { status }: { status: AuthResponse } = useFormikContext();

  return (
    <Collapse in={Boolean(status)} animateOpacity>
      <Box textAlign="center">
        {status?.redirectUrl ? (
          <Link
            isExternal
            target="_blank"
            href={status.redirectUrl}
            color="blue.500"
          >
            {status.message} <ExternalLinkIcon mx="2px" />
          </Link>
        ) : typeOf(status?.message, "array") ? (
          // @ts-ignore
          status?.message?.map((msg: any) => {
            return (
              <Text
                key={msg}
                fontSize="xs"
                color={status.status !== "ok" ? "red.500" : "green.500"}
              >
                {msg}
              </Text>
            );
          })
        ) : (
          <Text
            fontSize="xs"
            color={status?.status !== "ok" ? "red.500" : "green.500"}
          >
            {status?.message}
          </Text>
        )}
      </Box>
    </Collapse>
  );
};

export default FormStatus;
