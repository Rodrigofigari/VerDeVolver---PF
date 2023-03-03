import React, { useEffect, useState } from 'react';
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
  Image,
} from '@chakra-ui/react';
import { CheckIcon, DeleteIcon } from '@chakra-ui/icons';
import axios from 'axios';

function DashboardRequest() {
  const Axios = axios.create({ baseURL: 'http://localhost:3001' });
  const [requestArray, setRequestArray] = useState();

  useEffect(() => {
    getDataBase();
  }, []);

  const getDataBase = () => {
    Axios.get('/vdv/pending').then((res) => {
      Axios.get('/cbuRequest').then((res2) => {
        setRequestArray([...res.data, ...res2.data]);
      });
    });
  };

  const changeStatus = (id) => {
    Axios.put(`/vdv/status/${id}`).then(() => {
      window.alert('Entidad aprobada');
      getDataBase();
    });
  };

  const disapproveEntity = (id) => {
    Axios.delete(`/vdv/${id}`).then(() => {
      window.alert('La entidad ha sido borrada');
      getDataBase();
    });
  };

  const approveCbu = (id, cbu, idVdV) => {
    Axios.put(`/vdv/${idVdV}`, { cbu }).then(() => {
      Axios.delete(`/cbuRequest/${id}`).then(() => {
        window.alert('Cambio de CBU aprobado');
        getDataBase();
      });
    });
  };

  const disapproveCbu = (id) => {
    Axios.delete(`/cbuRequest/${id}`).then(() => {
      window.alert('Cambio de cbu NO fue aprobado');
      getDataBase();
    });
  };

  const requestRender = (req, i) => {
    return (
      <AccordionItem key={i + 5648}>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left" fontWeight="bold">
              {req.vdvName ? (
                <p>Solicitud de cambio de cbu</p>
              ) : (
                <p>Solicitud de nueva entidad</p>
              )}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <p>Nombre: </p>
          {req.name && req.name}
          {req.vdvName && req.vdvName}
          <br></br>
          {req.mail && (
            <>
              {`E-mail: ${req.mail}`}
              <br />
            </>
          )}
          {req.cbu && (
            <>
              {`CBU: ${req.cbu}`}
              <br />
            </>
          )}
          {req.address && (
            <>
              {`Dirección: ${req.address}`}
              <br />
            </>
          )}
          {req.description && (
            <>
              {`Descripción: ${req.description}`}
              <br />
            </>
          )}
          {req.name && <p>Materiales: </p>}
          {req.Materials && (
            <>
              {req.Materials.map((mat, i) => (
                <p key={`${i + 1673}`}>{mat.name}</p>
              ))}
              <br />
            </>
          )}
          {req.img && (
            <>
              <Image src={req.img} />
              <br />
            </>
          )}
          <Button
            onClick={
              req.vdvName
                ? () => approveCbu(req.id, req.cbu, req.idVdV)
                : () => changeStatus(req.id)
            }
          >
            <CheckIcon />
          </Button>
          <Button
            onClick={
              req.vdvName
                ? () => disapproveCbu(req.id)
                : () => disapproveEntity(req.id)
            }
          >
            <DeleteIcon />
          </Button>
        </AccordionPanel>
      </AccordionItem>
    );
  };
  return (
    <Accordion w="40vw">
      {requestArray?.map((req, i) => requestRender(req, i))}
    </Accordion>
  );
}

export default DashboardRequest;
