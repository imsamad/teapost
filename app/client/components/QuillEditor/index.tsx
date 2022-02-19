import { FormLabel, Text } from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import dynamic from 'next/dynamic';
import { typeOf } from '../../lib/utils';

const Quill = dynamic(() => import('./Quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const Index = () => {
  const {
    errors: { body: bodyErrors },
    touched: { body: bodyTouched },
  } = useFormikContext();
  const isError = Boolean(bodyErrors && bodyTouched);
  return (
    <>
      <FormLabel>Write...</FormLabel>
      {isError && typeOf(bodyErrors, 'array') ? (
        // @ts-ignore
        [...new Set(bodyErrors)].map((err: string) => (
          <Text fontSize="sm" key={err} color="red.500">
            {err}
          </Text>
        ))
      ) : isError ? (
        <Text fontSize="sm">{bodyErrors}</Text>
      ) : null}
      <Quill />
    </>
  );
};

export default Index;
