import React from 'react';
import { Flex } from '@chakra-ui/react';

function MarkerInfo({ data }) {
  return (
    <div>
      <h2>{data.name}</h2>
      <p>{data.description}</p>
      <img src={data.imageUrl} alt={data.title} width="50px" height="50px" />
      <Flex>
        {data.materials.map((mat, index) => (
          <p key={index}>{`${mat}--`}</p>
        ))}
      </Flex>
    </div>
  );
}

export default MarkerInfo;
