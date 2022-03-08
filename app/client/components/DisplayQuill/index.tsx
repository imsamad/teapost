import { Box } from "@chakra-ui/react";
import { useTheme } from "@emotion/react";

const Index = ({ html }: any) => {
  const theme: any = useTheme();
  return (
    <Box>
      <h1 className="ql-align-center">Heading</h1>
      <Box
        dangerouslySetInnerHTML={{ __html: html }}
        maxW="5xl"
        mx="auto"
        p="4px"
      />
      <style jsx>{`
        h1 {
          font-size: ${theme.fontSizes["3xl"]};
        }
      `}</style>
    </Box>
  );
};

export default Index;
