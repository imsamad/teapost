import { IconButton, IconButtonProps } from "@chakra-ui/react";

const TSIconButton = ({ ...rest }: IconButtonProps) => {
  return (
    <IconButton
      _focus={{
        border: "1px solid gray",
        boxShadow: "none",
        WebkitTapHighlightColor: "transparent",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        MozBackfaceVisibility: "hidden",
      }}
      {...rest}
    />
  );
};

export default TSIconButton;
