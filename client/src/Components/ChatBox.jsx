import {
  Avatar,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { AiOutlineMessage, AiOutlineSend } from 'react-icons/ai';

const qa = [
  {
    q: '¿De que se trata este proyecto?',
    a: 'VerDeVolver es un sitio web que fomenta el reciclaje y la gestión de residuos en Argentina. Proporcionan una guía para materiales reciclables y un mapa de lugares cercanos para entregar los residuos. VerDeVolver no está involucrada directamente con los puntos de reciclaje en el mapa.',
  },
  {
    q: '¿Quien desarrolló este proyecto?',
    a: 'Este proyecto fue desarrollado por alumnos del bootcamp "Soy Henry" para hacer parte de la entrega final del mismo',
  },
  {
    q: '¿Como puedo aportar?',
    a: 'Puedes aportar donando a entidades desde nuestro home o yendo al detalle de la entidad a la que quieras donar',
  },
  {
    q: '¿Cómo sé si algo se puede reciclar?',
    a: 'Tenemos una lista de materiales que reciclamos, puedes verla yendo a la lista de entidades',
  },
  {
    q: '¿Qué hago si no puedo reciclar algo?',
    a: 'Intenta reducir tu uso de ese objeto en primer lugar. Si no es posible, trata de reutilizarlo o donarlo. Si todo lo demás falla, deséchalo adecuadamente en un vertedero o centro de tratamiento de residuos.',
  },
  {
    q: '¿Por qué es importante reciclar?',
    a: 'El reciclaje ayuda a reducir la cantidad de residuos que terminan en vertederos y reduce la necesidad de nuevos recursos naturales. También puede ayudar a reducir la contaminación del aire y del agua.',
  },
  {
    q: '¿Qué pasa con los materiales reciclados?',
    a: 'Los materiales reciclados pueden ser reutilizados para crear nuevos productos, como papel reciclado, botellas de plástico reciclado y más.',
  },
  {
    q: '¿Como puedo contactarme con las entidades?',
    a: 'Puedes ir a nuestra sección de contacto y completar el formulario para poder enviar cualquier consulta.',
  },
];

const iaResponse = (message) => {
  const res = qa.find(({ q }) => q.toLowerCase() === message.toLowerCase())?.a;

  if (res) return res;
  return `No encontré un respuesta a tu pregunta en mi base de datos, puedes ir a la sección de contacto y completar el formulario para enviar tu consulta y que un administrador pueda responderte!`;
};

const ChatBox = () => {
  const { acount } = useSelector((state) => state.acountReducer);

  const [messages, setMessages] = useState([
    { from: 'I A', message: 'Hola, estoy aquí para responder tus preguntas!' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage) {
      const iaRes = iaResponse(newMessage);
      setMessages([
        ...messages,
        {
          from: acount.name ?? 'Default',
          message: newMessage,
        },
        {
          from: 'I A',
          message: iaRes,
        },
      ]);
      setNewMessage('');
    }
  };

  return (
    <Popover>
      <PopoverTrigger>
        <IconButton
          icon={<AiOutlineMessage />}
          pos="fixed"
          left="1rem"
          m="1rem"
          bottom="4rem"
        />
      </PopoverTrigger>

      <PopoverContent m="1rem">
        <PopoverHeader>Chat VDV</PopoverHeader>
        <PopoverCloseButton />
        <PopoverBody h={'20vh'} overflowY="scroll">
          <VStack spacing={4}>
            {messages.map(({ from, message }) => (
              <Flex
                alignItems="flex-start"
                gap="0.5rem"
                w="full"
                key={`${from} says: ${message}`}
              >
                <Avatar name={from} size="xs" />
                {message}
              </Flex>
            ))}
          </VStack>
        </PopoverBody>
        <PopoverFooter>
          <InputGroup>
            <Input
              placeholder="Ingresa tu consulta"
              type="text"
              name="newMessage"
              value={newMessage}
              onChange={handleChange}
            />
            <InputRightElement>
              <IconButton
                icon={<AiOutlineSend />}
                onClick={handleSendMessage}
              />
            </InputRightElement>
          </InputGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

export default ChatBox;
