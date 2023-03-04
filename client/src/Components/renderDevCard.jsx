import React from 'react';
import {
  Text,
  Heading,
  Card,
  CardHeader,
  CardBody,
  Stack,
  StackDivider,
  Link,
  Image,
} from '@chakra-ui/react';
import { ExternalLinkIcon, CopyIcon } from '@chakra-ui/icons';
function renderDevCard(devName, devImg, devLinkd, devIg, devMail) {
  return (
    <Card
      bg={colorMode === 'light' ? '#F5F2EB' : '#2c835b'}
      border="solid 3px"
      borderColor={colorMode === 'light' ? 'black' : '#2c835b'}
      fontFamily="lato"
      w="20%"
      m="1vh"
      h="45vh"
      p="0.5rem"
    >
      <Image
        src={devImg}
        alt="Dev Photo"
        borderRadius="full"
        boxSize="100px"
        m="auto"
      />
      <CardHeader m="1px" p="1px" align="center">
        <Heading size="md">{devName}</Heading>
      </CardHeader>

      <CardBody mt="1px">
        <Stack divider={<StackDivider />} spacing="1">
          <Link href={devIg} isExternal m="auto">
            Instagram <ExternalLinkIcon mx="2px" />
          </Link>
          <Link href={devLinkd} isExternal m="auto">
            LinkedIn <ExternalLinkIcon mx="2px" />
          </Link>
          <Text pt="2" fontSize="md" m="auto">
            {devMail} <CopyIcon mx="2px" />
          </Text>
        </Stack>
      </CardBody>
    </Card>
  );
}

export default renderDevCard;
