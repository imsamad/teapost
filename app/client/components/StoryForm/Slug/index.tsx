import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  UseToastOptions,
} from '@chakra-ui/react';
import { changeSlug } from '../../../lib/createStory';
import { useRouter } from 'next/router';
import { FastField, FieldProps } from 'formik';

const Index = () => {
  const router = useRouter();
  const toast = useToast();
  const triggerToast = (options: UseToastOptions) => {
    toast({
      position: 'bottom',
      status: 'success',
      duration: 1000,
      isClosable: true,
      ...options,
    });
  };
  const handleStorySlugChange =
    (reqObj: { id: string; slug: string }) => async () => {
      try {
        await changeSlug(reqObj);
        router.push(`/me/story/write/${reqObj.slug}`, undefined, {
          shallow: true,
        });
        triggerToast({
          title: 'Slug Changed.',
          position: 'top-right',
          status: 'success',
        });
      } catch (err) {
        triggerToast({
          title: 'This slug already existed.',
          status: 'error',
          position: 'top-right',
          variant: 'subtle',
        });
      }
    };

  return (
    <FastField name="slug">
      {({ field, meta, form }: FieldProps) => {
        const isError = Boolean(meta.error && meta.touched);
        return (
          <FormControl isInvalid={isError}>
            <FormLabel htmlFor={field.name}>Slug</FormLabel>
            <InputGroup size="sm">
              <Input {...field} pr="4.5rem" />

              <InputRightElement>
                <Button
                  size="xs"
                  onClick={handleStorySlugChange({
                    slug: field.value,
                    id: form.values.id,
                  })}
                >
                  Save
                </Button>
              </InputRightElement>
            </InputGroup>
            {/* @ts-ignore */}
            {isError && typeOf(meta.error, 'array') ? (
              // @ts-ignore
              [...new Set(meta?.error)].map((err: string) => (
                <FormErrorMessage key={err}>{err}</FormErrorMessage>
              ))
            ) : (
              <FormErrorMessage>{meta.error}</FormErrorMessage>
            )}
          </FormControl>
        );
      }}
    </FastField>
  );
};

export default Index;
