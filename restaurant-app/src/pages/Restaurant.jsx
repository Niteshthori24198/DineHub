

import * as React from 'react';
import Box from '@mui/material/Box';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurant } from '../redux/Restaurant/action';

import { Stack, TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import ShowRestaurant from '../components/ShowRestaurant';


export default function Restaurant() {

  const [searchParams, setsearchParams] = useSearchParams();
  const [page, setPage] = React.useState(+searchParams.getAll("page") || 1);
  const [limit] = React.useState(+searchParams.getAll("limit") || 9);
  const [searchInput, setSearchInput] = React.useState(searchParams.getAll("search") || '')

  const dispatch = useDispatch()

  const restaurants = (useSelector((state) => state.restaurant.restaurant)) || [];
  const isLoading = useSelector((state) => state.restaurant.isLoading);
  const totalCount = useSelector((state) => state.restaurant.totalCount);

  React.useEffect(() => {
    const params = new URLSearchParams();
    params.append('page', page);
    params.append('limit', limit);
    params.append('search', searchInput);
    setsearchParams(params);
  }, [page, limit, searchInput])

  React.useEffect(() => {
    const params = {}
    if (searchParams.getAll('search')) {
      params.search = searchParams.getAll('search')
    }
    if (page) {
      params.page = +searchParams.getAll('page') || page;
      params.limit = +searchParams.getAll('limit') || limit;
    }
    dispatch(getRestaurant(params))
  }, [searchParams])


  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '10px',
          marginTop: '10px'
        }}
      >
        <Box sx={{ width: { xs: '80%', sm: '40%' } }}>
          <TextField
            margin="normal"
            fullWidth
            placeholder='Search Restaurant'
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            autoFocus
          />
        </Box>
      </Box>
      {
        isLoading ?
          <Stack
            sx={{ color: 'grey.500', margin: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', pt:10 }}
            spacing={2}
            direction="row"
          >
            <CircularProgress />
          </Stack> :
          <ShowRestaurant restaurants={restaurants} totalCount={totalCount} limit={limit} page={page} handlePageChange={handlePageChange} />
      }


    </>
  );
}
