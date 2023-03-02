import React from 'react';
import { Flex, Heading } from '@chakra-ui/react';
import TabListPosts from '../Components/TabListPosts';
import OverflowScroll from '../Components/OverflowScroll';
import DashboardRequest from '../Components/DashboardRequest';

const Dashboard = () => {
  return (
    <Flex direction="row" justify="space-evenly">
      <Flex direction="column">
        <Heading align="center" m="3vh">
          Reseñas
        </Heading>
        <OverflowScroll type="feedback" />
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
        <OverflowScroll type="allDonation" />
        <Heading align="center" m="3vh">
          Servicios
        </Heading>
        <OverflowScroll type="allServices" />
      </Flex>
    </Flex>
  );
};

export default Dashboard;
