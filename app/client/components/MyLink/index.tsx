import { Link as ChakraLink, LinkProps } from "@chakra-ui/react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";

interface MyLinkProps
  extends Omit<LinkProps, "href" | "as">,
    Omit<NextLinkProps, "as"> {}

const MyLink = ({
  href,
  children,
  scroll = true,
  _visited,
  _hover,
  _focus,
  _active,
  ...rest
}: MyLinkProps) => {
  return (
    <NextLink href={href} passHref scroll={scroll}>
      <ChakraLink
        _hover={{
          textDecor: "none",
          color: "gray.500",
          ..._hover,
        }}
        _active={{
          outline: "none",
          color: "blue.400",
          _active,
        }}
        _visited={{
          outline: "none",
          ..._visited,
        }}
        _focus={{
          outline: "none",
          _focus,
        }}
        {...rest}
      >
        {children}
      </ChakraLink>
    </NextLink>
  );
};
/**
 * 
        _hover={{
          color: 'gray.500',
          cursor: 'pointer',
        }}
        _focus={{ outline: 'none' }}
        _visited={{ color: 'blue' }}
        _active={{ color: 'blue' }}
 */
export default MyLink;
