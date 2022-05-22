import { Button, ButtonProps } from '@chakra-ui/react';

const TSButton = ({ children, ...rest }: ButtonProps) => {
  return (
    <Button
      _focus={{
        // bgColor: "transparent",
        outline: 'none',
        boxShadow: 'none',
        WebkitTapHighlightColor: 'none',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        MozBackfaceVisibility: 'hidden',
      }}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default TSButton;
