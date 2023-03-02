import { Grid, GridItem, VStack } from '@chakra-ui/react';
import SearchBar from '../Components/SearchBar';
import { useSelector, useDispatch } from 'react-redux';
import EntityCard from '../components/EntityCard';
import PropagateLoader from 'react-spinners/PropagateLoader';
import AsideFilters from '../Components/AsideFilters';
import { useEffect, useState } from 'react';
import {
  fetchEntities,
  getMaterials,
  listOfMaterialsToFilter,
} from '../redux/actions/entitiesActions';
import { Button } from '@chakra-ui/react';
import Paginated from '../Components/Paginated';
import { Logeduser } from '../../src/redux/actions/acountActions';

const Entities = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [input, setInput] = useState(1);
  const [search, setSearch] = useState('');
  const byPage = 5;
  const { entities, isLoading, filteredEntities } = useSelector(
    (state) => state.entitiesReducer
  );

  function handleClick(e) {
    e.preventDefault();
    const sel = document.getElementById('select_materials');
    sel.value = '';
    dispatch(fetchEntities());
    dispatch(listOfMaterialsToFilter([]));
    setInput(1);
    setPage(1);
    setSearch('');
  }
  let userData = localStorage.getItem('LogedUser');

  useEffect(() => {
    if (userData) {
      dispatch(Logeduser());
    }
    dispatch(fetchEntities());
    dispatch(getMaterials());
    filters = entities;
  }, []);

  let filters = filteredEntities;

  let numberEntitiesActives = 0;
  for (let i = 0; i < filters.length; i++)
    if (filters[i].status === 'Active') numberEntitiesActives++;

  const max = Math.ceil(numberEntitiesActives / byPage);

  return (
    <VStack mx="1rem">
      <SearchBar
        entities={entities}
        setPage={setPage}
        setInput={setInput}
        search={search}
        setSearch={setSearch}
      />
      <Button
        colorScheme="green"
        size="sm"
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Recargar puntos de reciclaje
      </Button>
      <Grid templateColumns="1fr 4fr">
        <GridItem>
          <AsideFilters
            filters={filters}
            setPage={setPage}
            setInput={setInput}
          />
        </GridItem>
        <GridItem>
          <VStack spacing="4">
            {isLoading ? (
              <PropagateLoader color="#1c5738" />
            ) : (
              filters
                ?.slice((page - 1) * byPage, (page - 1) * byPage + byPage)
                .map((e) => {
                  if (e.status === 'Active') {
                    return <EntityCard key={e.id} entity={e} />;
                  }
                })
            )}
          </VStack>
          <Paginated
            page={page}
            setPage={setPage}
            max={max}
            input={input}
            setInput={setInput}
          />
        </GridItem>
      </Grid>
    </VStack>
  );
};

export default Entities;
