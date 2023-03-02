import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box>
      <Flex
        alignItems={'center'}
        justifyContent="center"
        width={'100%'}
        h="4rem"
        bg="#80808080"
        color={'white'}
      >
        <Text fontSize="l">
          © 2023 VerDeVoler. All rights reserved. Designed and developed by
          Henry students
        </Text>
      </Flex>
    </Box>
  );
};

export default Footer;
