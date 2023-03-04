import { useState, useEffect } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { IconButton } from '@chakra-ui/react';
import ItemsCarousel from 'react-items-carousel';
import { InstagramEmbed } from 'react-social-media-embed';
import axios from 'axios';

const PostsCarousel = () => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 50;
  const [posts, setPosts] = useState();
  useEffect(() => {
    axios.get('http://localhost:3001/instagram').then((res) => {
      setPosts(res.data);
    });
  }, []);
  return (
    <div style={{ marginBottom: '5rem', padding: `0 ${chevronWidth}px` }}>
      <ItemsCarousel
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={3}
        gutter={20}
        leftChevron={<IconButton icon={<AiOutlineArrowLeft />} />}
        rightChevron={<IconButton icon={<AiOutlineArrowRight />} />}
        outsideChevron
        chevronWidth={chevronWidth}
      >
        {posts?.map((pos) => (
          <InstagramEmbed
            url={pos.url}
            key={pos.id}
            style={{ maxHeight: '50vh', overflowY: 'scroll' }}
          />
        ))}
      </ItemsCarousel>
    </div>
  );
};

export default PostsCarousel;
