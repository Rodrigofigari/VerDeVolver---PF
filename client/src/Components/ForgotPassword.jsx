import axios from 'axios';
import { useState } from 'react';
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { FiMail } from 'react-icons/fi';

const ForgotPassword = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [forgottenPasswordEmail, setForgottenPasswordEmail] = useState('');

  const handleChange = (event) => {
    setForgottenPasswordEmail(event.target.value);
  };

  const handleForgotPassword = async () => {
    if (forgottenPasswordEmail) {
      try {
        await axios.get(
          `http://localhost:3001/user/password/${forgottenPasswordEmail}`
        );
        toast({
          title: 'Email enviado',
          description:
            'Te hemos enviado un mail para que cambies tu contraseña',
          status: 'success',
          duration: 1500,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: 'Error',
          description: error.message,
          status: 'error',
          duration: 1500,
          isClosable: true,
        });
      } finally {
        onClose();
        setForgottenPasswordEmail('');
      }
    }
  };

  return (
    <>
      <Button onClick={onOpen} variant="unstyled" fontWeight="normal">
        ¿Olvidaste tu contraseña?
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            ¿Estas seguro de que deseas reiniciar tu contraseña?
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InputGroup>
              <InputLeftElement children={<FiMail />} pointerEvents="none" />
              <Input
                placeholder="Escribe tu mail"
                type="email"
                name="forgottenPasswordEmail"
                value={forgottenPasswordEmail}
                onChange={handleChange}
              />
            </InputGroup>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleForgotPassword} w="full" colorScheme="green">
              Enviar mail
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ForgotPassword;
