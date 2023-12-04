// pages/index.js
import React from 'react';
import Link from 'next/link';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Bienvenido a nuestro Blog</h1>
      <p className="text-center mb-8">
        Para crear una entrada, por favor inicia sesión.
      </p>
      <div className="flex space-x-4 mb-8">
        <Link href="/login">
          <p className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">
            Iniciar Sesión
          </p>
        </Link>
        <Link href="/register">
          <p className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded">
            Registrarse
          </p>
        </Link>
      </div>
      <div>
        <Link href="/blog">
          <p className="text-blue-500 hover:underline">Ir al Blog</p>
        </Link>
      </div>
    </div>
  );
};

export default Home;
