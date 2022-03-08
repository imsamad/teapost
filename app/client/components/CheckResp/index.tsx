import { Box, Text, useMediaQuery } from "@chakra-ui/react";
import { useTheme } from "@emotion/react";
const Index = () => {
  const theme: any = useTheme();
  const { base, sm, md, lg, xl } = theme?.breakpoints;
  const [isLargerThanXL] = useMediaQuery(`(min-width: ${xl})`);
  const [isLargerThanLG] = useMediaQuery(`(min-width: ${lg})`);
  const [isLargerThanMD] = useMediaQuery(`(min-width: ${md})`);
  const [isLargerThanSM] = useMediaQuery(`(min-width: ${sm})`);
  const [isLargerThanBASE] = useMediaQuery(`(min-width: ${base})`);

  return (
    <Box
      width="100%"
      bgColor={["red", "green", "aqua", "gray.200"]}
      resize="both"
      my={4}
    >
      <Text fontSize="md">App Name :- {process.env.NEXT_PUBLIC_APP_NAME}</Text>
      {isLargerThanXL ? (
        <>
          isLargerThanXL
          <br />
        </>
      ) : isLargerThanLG ? (
        <>
          isLargerThanLG
          <br />
        </>
      ) : isLargerThanMD ? (
        <>
          isLargerThanMD
          <br />
        </>
      ) : isLargerThanSM ? (
        <>
          isLargerThanSM
          <br />
        </>
      ) : (
        isLargerThanBASE && (
          <>
            isLargerThanBASE
            <br />
          </>
        )
      )}
    </Box>
  );
};

export default Index;
