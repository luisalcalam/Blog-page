import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import axios from 'axios';
import { Pagination, PaginationItem, Button, AppBar, Toolbar, Typography, Container } from '@mui/material';
import Link from 'next/link';
import Article from '@/componets/article';

const BlogPage = ({ entries, currentPage, totalPages }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    // Aquí deberías realizar la lógica para verificar la autenticación del usuario
    // Puedes hacer una solicitud al servidor para comprobar si el usuario está autenticado
    // y actualizar el estado en consecuencia.
    // Puedes usar una función asíncrona para realizar la solicitud.

    const checkAuthentication = async () => {
      try {
        // Realiza la solicitud al servidor para verificar la autenticación
        // Puedes usar axios u otra librería para esto
        const userId = getCookie('userId'); 
        if (userId) setIsAuthenticated(true);
        else setIsAuthenticated(false);
      } catch (error) {
        setIsAuthenticated(false);
        console.error('Error al verificar la autenticación:', error);
      }
    };

    // Llama a la función para verificar la autenticación cuando el componente se monta
    checkAuthentication();
  }, []);
  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: '#C0C0C0' }}>
      <Container maxWidth="xl">
      <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Blog
          </Typography>
          <div>
            {isAuthenticated ? (
              <Link href="blog/create" passHref>
                <Button color="inherit">Crear Entrada</Button>
              </Link>
            ) : (
              <>
                <Link href="/login" passHref>
                  <Button color="inherit">Iniciar Sesión</Button>
                </Link>
                <Link href="/register" passHref>
                  <Button color="inherit">Registrarse</Button>
                </Link>
              </>
            )}
          </div>
        </Toolbar>
      </Container>
      </AppBar>
      <div className="px-8">
      <main className="max-w-7xl mx-auto pt-10 pb-40">
        <section className="pt-5">
          <h2 className="text-4xl mb-4">Blog gratuito</h2>
          <p className="mb-5">
            lorem ipsum dolor sit amet, consectetur adipis lorem ipsum dolor sit amet, consectetur adipis 
            lorem ipsum dolor sit amet, consectetur adipis lorem ipsum dolor sit amet, consectetur adipis 
            lorem ipsum dolor sit amet, consectetur adipis lorem ipsum dolor sit amet, consectetur adipis 
          </p>
        </section>
        <section className="pt-16">
          <h2 className="text-4xl mb-4">Artículos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 w-full">
            {entries.map((entrie) => (
              <Article key={entrie.slug} article={entrie} />
            ))}
          </div>
        </section>
        <section className="pt-16 flex justify-center">
        <Pagination
          count={totalPages}
          page={currentPage}
          shape="rounded"
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              href={`/blog/${item.page}`}
              {...item}
            />
          )}
        />
        </section>
      </main>
    </div>
    </div>
    
  );
};

export async function getServerSideProps({ query }) {
  const currentPage = parseInt(query.page, 10) || 1;
  const resp = await axios(`${process.env.NEXT_PUBLIC_API_BASE_URL}/publications`);
  const pagination = resp.data.response.pagination;
  const {totalPages} = pagination;
  const entries = resp.data.response.content;

  return {
    props: {
      entries,
      currentPage,
      totalPages,
    },
  };
}

export default BlogPage;
