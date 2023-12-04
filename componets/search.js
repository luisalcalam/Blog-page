// SearchComponent.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';

const SearchComponent = ({onSearch, currentPage}) => {
  const [search, setSearchTerm] = useState('');
  const [author, setAuthorFilter] = useState('');
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        setLoading(true);
        const resp = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/author`);
        setAuthors(resp.data.response.content);
      } catch (error) {
        console.error('Error al obtener los autores:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  const handleSearch = async () => {
    try {
      setLoading(true);
      if (search === '' && author === '') return;
      const baseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/publications?currentPage=${currentPage ?? 1}`;
      let url = new URL(baseUrl);
      const queryParams = {}
      if (search) {
        url.searchParams.append('q', search);
        queryParams.search = search;
      }
      if (author) {
        url.searchParams.append('authorId', author.id);
        queryParams.author = author.id;
      }
      const resp = await axios(url.toString());
      const data = resp.data.response;
      router.push({
        pathname: `/blog/${currentPage}`,  // Asegúrate de usar currentPage aquí
        query: queryParams,
      });f
      
      onSearch(data);
    } catch (error) {
      console.error('Error al realizar la búsqueda:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    router.push('/blog');
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '16px', width: '100%' }}>
      <TextField
        label="Buscar..."
        variant="outlined"
        value={search}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ minWidth: '400px' }}
      />
      <FormControl variant="outlined">
        <InputLabel id="category-filter-label">Categoría</InputLabel>
        <Select
          labelId="author-filter-label"
          id="author-filter"
          value={author}
          onChange={(e) => setAuthorFilter(e.target.value)}
          label="Autor"
          sx={{ minWidth: '200px' }}
        >
          <MenuItem value="">Todas</MenuItem>
          {authors.map((user) => (
            <MenuItem key={user.id} value={user}>
              {user.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button onClick={handleSearch}>
        Buscar
      </Button>
      {(search || author) && (
        <Button onClick={clearFilters}>
          Limpiar Filtros
        </Button>
      )}
      {loading && <CircularProgress size={24} style={{ marginLeft: '16px' }} />} {/* Indicador de carga */}
    </div>
  );
};

export default SearchComponent;
