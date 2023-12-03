// /pages/create-entry.js

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import axios from 'axios';
import Image from "next/image";
import Link from "next/link";
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Alert } from '@mui/material';

import MarkdownEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css'; 

const mdParser = new MarkdownIt();

const CreateEntry = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [confirmMessage, setConfirmMessage] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    // Obtenemos las categorías desde la API al cargar la página
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      // const response = await axios.get('URL_DE_TU_API_PARA_CATEGORIAS');
      setCategories([{id: 2, name: 'Noticias'}, {id: 3, name: 'Desarrollo'}]);
    } catch (error) {
      console.error('Error al obtener categorías:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Aquí puedes enviar los datos a tu API para crear una nueva entrada
    // por ejemplo, utilizando axios.post
    const userId = getCookie('userId');
    const formData = { title, content, categoryId, authorId: userId, };
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/publications`,
      formData
    );
    setConfirmMessage(true);
    setTimeout(() => {
      router.push('/blog');
    }, 600);
    console.log('Resultado:', response);
    
    // Agrega tu lógica para enviar datos a la API
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      
      <form onSubmit={handleSubmit} className="bg-white p-5 rounded shadow-md w-5/6">
        <small>
          <Link href="/blog">
            <p>👈 Back to home</p>
          </Link>
        </small>
        <h1 className="text-2xl mb-4">Crear Nueva Entrada</h1>
        <div className="mb-4">
          <TextField
            label="Título"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
            <MarkdownEditor
              value={content}
              onChange={({ text }) => setContent(text)}
              style={{ height: '400px', width: '100%' }}
              renderHTML={text => mdParser.render(text)}
            />
        </div>
        <div className="mb-4">
          <FormControl fullWidth>
            <InputLabel id="category-label">Categoría</InputLabel>
            <Select
              labelId="category-label"
              value={categoryId}
              onChange={(e) => setCategory(e.target.value)}
              label="Categoría"
            >
              <MenuItem value="">
                <em>Selecciona una categoría</em>
              </MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="mb-4">
          <Button color="secondary" type="submit">
            Crear Entrada
          </Button>
        </div>
        {confirmMessage ? (<Alert severity="success">¡La entrada ha sido guardada!</Alert>) : ''}
      </form>
    </div>
  );
};

export default CreateEntry;
