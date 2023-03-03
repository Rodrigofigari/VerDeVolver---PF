import React, { useState, useEffect } from 'react';
import {
  Flex,
  Text,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Input,
  Box,
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function TabListPosts() {
  const [posts, setPosts] = useState();
  const [txtOrInput, settxtOrInput] = useState(false);
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    axios.get('http://localhost:3001/instagram').then((res) => {
      setPosts(res.data);
    });
  }, []);

  const updatePost = (id) => {
    axios.put('http://localhost:3001/instagram', { url: input, id });
    navigate('/home');
  };

  const txtOrInputChange = () => {
    settxtOrInput(true);
  };

  const handleOnChange = (e) => {
    setInput(e.target.value);
  };

  function renderUrlPost(url, id) {
    return (
      <TabPanel key={id}>
        <Flex direction="row">
          {!txtOrInput && <Text width="30vw">{url}</Text>}
          {txtOrInput && (
            <Box>
              <Input
                width="30vw"
                value={input}
                onChange={handleOnChange}
              ></Input>
              <Button onClick={() => updatePost(id)}>Guardar</Button>
            </Box>
          )}

          <Button>
            <EditIcon onClick={txtOrInputChange} />
          </Button>
        </Flex>
      </TabPanel>
    );
  }
  return (
    <Tabs>
      <TabList>
        <Tab fontWeight="bold">Post 1</Tab>
        <Tab fontWeight="bold">Post 2</Tab>
        <Tab fontWeight="bold">Post 3</Tab>
        <Tab fontWeight="bold">Post 4</Tab>
      </TabList>
      <TabPanels>
        {posts?.map((eachUrl) => {
          return renderUrlPost(eachUrl.url, eachUrl.id);
        })}
      </TabPanels>
    </Tabs>
  );
}

export default TabListPosts;
