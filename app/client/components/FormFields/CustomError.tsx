import { Box, Collapse, Text } from '@chakra-ui/react';

import { typeOf } from '../../lib/utils';

const Error = ({
  errors,
  isError,
  color,
}: {
  isError: boolean;
  errors: any;
  color?: string;
}) => {
  return (
    <Collapse in={isError && !!errors} animateOpacity>
      <Box color={color || 'red.500'} my="1" fontSize="md">
        {isError && typeOf(errors, 'object') ? (
          // @ts-ignore
          <RenderObjectErrors errors={errors} />
        ) : typeOf(errors, 'array') ? (
          <RenderArrayOfErrors errors={errors} />
        ) : typeOf(errors, 'string') ? (
          <RenderStringError error={errors} />
        ) : null}
      </Box>
    </Collapse>
  );
};

export default Error;
const RenderObjectErrors = ({ errors }: { errors: Object }) => {
  return (
    <>
      {Object.keys(errors).map((field: any) =>
        // @ts-ignore
        typeOf(errors[field], 'array') ? ( // @ts-ignore
          <RenderArrayOfErrors errors={errors[field]} />
        ) : (
          // @ts-ignore
          <RenderStringError error={errors} />
        )
      )}
    </>
  );
};
const RenderArrayOfErrors = ({ errors }: { errors: string[] }) => {
  return (
    <>
      {/* @ts-ignore */}
      {[...new Set(errors)].map((err: string) => (
        <RenderStringError error={err} key={err} />
      ))}
    </>
  );
};
const RenderStringError = ({ error }: { error: string }) => {
  return <Text>{error}</Text>;
};
