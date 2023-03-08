import React, { useEffect, useState } from 'react';
import {
  Flex,
  Heading,
  Select,
  Box,
  Button,
  Input,
  Text,
  useToast,
} from '@chakra-ui/react';
import TabListPosts from '../../Components/TabListPosts';
import OverflowScroll from '../../Components/OverFlowScroll/OverflowScroll';
import DashboardRequest from '../../Components/DashboardRequest';
import {
  setDataToRender,
  userSearchFeedback,
  vdvSearchFeedback,
  userSearchDonation,
  vdvSearchDonation,
  optionsSelectArray,
} from './DashboardFunctions';
// import { useSelector } from 'react-redux';
import axios from 'axios';

const Dashboard = () => {
  const [feedbackType, setFeedbackType] = useState('feedback');
  const [feedbackId, setFeedbackId] = useState(['all', 'all']);
  const [feedbackVdVFilters, setFeedbackVdVFilters] = useState();
  const [feedbackUsersFilters, setFeedbackUsersFilters] = useState();
  const [donationType, setDonationType] = useState('donation');
  const [donationId, setDonationId] = useState(['all', 'all']);
  const [donationVdVFilters, setDonationVdVFilters] = useState();
  const [donationUsersFilters, setDonationUsersFilters] = useState();
  const [pendingOrDelivered, setPendingOrDelivered] = useState('Pending');
  const [emailUser, setEmailUser] = useState({});
  const [roles, setRoles] = useState([]);
  const [roleSelect, setRoleSelect] = useState();

  const toast = useToast();

  useEffect(() => {
    setDataToRender(
      setDonationUsersFilters,
      setDonationVdVFilters,
      setFeedbackUsersFilters,
      setFeedbackVdVFilters
    );
    // /role
    axios.get('http://localhost:3001/role').then((res) => setRoles(res.data));
  }, []);

  const renderOverFlowFeedback = () => {
    return <OverflowScroll type={feedbackType} id={feedbackId} />;
  };

  const renderOverFlowDonation = () => {
    return (
      <OverflowScroll
        type={donationType}
        id={donationId}
        pendingOrDelivered={pendingOrDelivered}
      />
    );
  };

  const viewStatusDonation = (status) => {
    setPendingOrDelivered(status);
  };

  const handleInput = (e) => {
    setEmailUser(e.target.value);
  };

  const handleSelectRole = (e) => {
    setRoleSelect(e.target.value);
  };

  const getUser = async () => {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(emailUser)) {
      const result = await axios.get(
        // /user/getByEmail/${emailUser}`
        `http://localhost:3001/user/getByEmail/${emailUser}`
      );
      const userEnv = result.data[0];
      console.log(roleSelect);
      userEnv
        ? await axios
            .put(
              //  /user/toowner/${userEnv.id}?roleId=${roleSelect}`
              `http://localhost:3001/user/toowner/${userEnv.id}?roleId=${roleSelect}`
            )
            .then(
              toast({
                title: 'Success',
                description: `${userEnv.name} ${userEnv.last_name} tiene el rol ${roleSelect}`,
                status: 'success',
                duration: 2000,
                isClosable: true,
              })
            )
        : toast({
            title: 'Error',
            description: 'No se encontro ningun usuario con ese mail',
            status: 'error',
            duration: 1500,
            isClosable: true,
          });
    } else {
      toast({
        title: 'Error',
        description: 'Debes ingresar un email valido',
        status: 'error',
        duration: 1500,
        isClosable: true,
      });
    }
  };

  return (
    <Flex direction="row" justify="space-evenly" mb={'5rem'}>
      <Flex direction="column">
        <Heading align="center" m="3vh">
          Reseñas
        </Heading>
        {renderOverFlowFeedback()}
        <Select
          onClick={(event) =>
            vdvSearchFeedback(event, setFeedbackType, setFeedbackId)
          }
        >
          <option value="none">Entidades</option>
          {optionsSelectArray(feedbackVdVFilters, 'vdv')}
        </Select>
        <Select
          onClick={(event) =>
            userSearchFeedback(event, setFeedbackType, setFeedbackId)
          }
        >
          <option value="none">Usuarios</option>
          {optionsSelectArray(feedbackUsersFilters)}
        </Select>
        <Heading align="center" m="3vh">
          Posts
        </Heading>
        <TabListPosts />
        <Heading align="center" m="3vh">
          Solicitudes
        </Heading>
        <DashboardRequest />
      </Flex>
      <Flex direction="column">
        <Heading align="center" m="3vh">
          Donaciones
        </Heading>
        {renderOverFlowDonation()}
        <Select
          onClick={(event) =>
            vdvSearchDonation(event, setDonationType, setDonationId)
          }
        >
          <option value="none">Entidades</option>
          {optionsSelectArray(donationVdVFilters, 'vdv')}
        </Select>
        <Select
          onClick={(event) =>
            userSearchDonation(event, setDonationType, setDonationId)
          }
        >
          <option value="none">Usuarios</option>
          {optionsSelectArray(donationUsersFilters)}
        </Select>
        <Button onClick={() => viewStatusDonation('Pending')}>
          Pendientes
        </Button>
        <Button onClick={() => viewStatusDonation('Delivered')}>
          Entregadas
        </Button>
        <Flex direction={'column'} mt={'8rem'} align="center">
          <Heading align="center" mb="1rem">
            Creacion de administradores
          </Heading>
          <Text w={'18rem'} fontSize="15px" mb={'2rem'}>
            Ingrese el mail del usuario al quiere modificarle el rol
          </Text>
          <Flex>
            <Input
              mr={'1rem'}
              onChange={handleInput}
              align={'center'}
              w={'20rem'}
              placeholder="Ingrese mail..."
            />
            <Select w={'6rem'} onClick={handleSelectRole}>
              <option value="none">Roles</option>
              {roles.map((role) => (
                <option value={role} key={`${role}roles`}>
                  {role}
                </option>
              ))}
            </Select>
          </Flex>
          <Button mt={'2rem'} onClick={getUser}>
            Enviar
          </Button>
          {/* {userState.length ? (
            <Text>
              Se econtro al ususario {(userState[0].name, userState[0].name)}.
              Seguro quiere modificar el rol del usuario seleccionado?{' '}
            </Text>
          ) : null} */}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Dashboard;
