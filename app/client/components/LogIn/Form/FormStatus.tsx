import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Box, Collapse, Link, Text, Wrap, WrapItem } from '@chakra-ui/react';
import { useFormikContext } from 'formik';

import { typeOf } from '@lib/utils';
import { AuthResponse } from '@lib/api/authApi';
import TSButton from '@compo/UI/TSButton';

const FormStatus = () => {
  // @ts-ignore
  const { status, setFieldValue, setStatus }: { status: AuthResponse } =
    useFormikContext();

  const handleClick = (email: string) => {
    setFieldValue('identifier', email);
    setFieldValue('type', 'logIn');
    setStatus(null);
  };
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
        ) : typeOf(status?.message, 'array') ? (
          // @ts-ignore
          status?.message?.map((msg: any) => {
            return (
              <Text
                key={msg}
                fontSize="xs"
                color={status.status !== 'ok' ? 'red.500' : 'green.500'}
              >
                {msg}
              </Text>
            );
          })
        ) : (
          <Text
            fontSize="xs"
            color={status?.status !== 'ok' ? 'red.500' : 'green.500'}
          >
            {status?.message}
          </Text>
        )}
        {status?.matchedIdentifiers?.length && (
          <>
            <Text size="md"> Possible matches are :- </Text>
            <Wrap justify="center">
              {status?.matchedIdentifiers?.map((email) => (
                <WrapItem key={email}>
                  <TSButton
                    // variant="link"
                    colorScheme="blue"
                    size="xs"
                    variant="outline"
                    onClick={() => handleClick(email)}
                    my="1"
                  >
                    {email}
                  </TSButton>
                </WrapItem>
              ))}
            </Wrap>
          </>
        )}
      </Box>
    </Collapse>
  );
};

export default FormStatus;
