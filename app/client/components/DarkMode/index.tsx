import { useColorMode, IconButton } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
const Index = ({ size }: any) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      onClick={toggleColorMode}
      aria-label="change-theme"
      size={size}
      icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
    />
  );
};

export default Index;
