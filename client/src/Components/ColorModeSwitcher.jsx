import { IconButton, useColorMode } from '@chakra-ui/react';
import { BiSun, BiMoon } from 'react-icons/bi';

const ColorModeSwitcher = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <IconButton
      icon={colorMode === 'light' ? <BiMoon /> : <BiSun />}
      onClick={toggleColorMode}
      pos="fixed"
      bottom="4rem"
      right="1rem"
      m="1rem"
    />
  );
};

export default ColorModeSwitcher;
