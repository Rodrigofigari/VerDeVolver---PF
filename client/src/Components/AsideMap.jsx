import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { IoMdOptions } from 'react-icons/io';
import { materials } from '../db.json';

const AsideMap = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <>
      <IconButton
        ref={btnRef}
        colorScheme="green"
        onClick={onOpen}
        pos="absolute"
        right="0"
        m="1rem"
        icon={<IoMdOptions />}
      />

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Filtros:</DrawerHeader>
          <DrawerBody>
            <VStack spacing={'4'}>
              <InputGroup>
                <InputLeftElement children={<FaMapMarkerAlt />} />
                <Input placeholder="Dirección" />
              </InputGroup>
              <Select>
                <option value="Off">Material</option>
                {materials?.map((m) => (
                  <option value={m} key={m}>
                    {m}
                  </option>
                ))}
              </Select>
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <Button colorScheme="green" variant={'outline'} mr={'1rem'}>
              Aplicar filtros
            </Button>
            <Button
              colorScheme="red"
              variant={'outline'}
              mr={3}
              onClick={onClose}
            >
              Cancelar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AsideMap;
