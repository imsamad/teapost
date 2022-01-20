import { useColorMode, IconButton } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
const Index = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      onClick={toggleColorMode}
      aria-label="change-theme"
      icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
    />
  );
};

export default Index;
