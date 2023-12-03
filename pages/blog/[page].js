import axios from 'axios';
import { Pagination, PaginationItem } from '@mui/material';
import Link from 'next/link';
import Article from '@/componets/article';

const BlogPage = ({ entries, currentPage, totalPages }) => {
  return (
    <div className="px-8">
      <main className="max-w-7xl mx-auto pt-32 pb-40">
        <h1 className="mb-0 text-6xl">Blog</h1>
        <p className="font-bold">Blog publico</p>
        <section className="pt-16">
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
  );
};

export async function getServerSideProps({ query }) {
  const currentPage = parseInt(query.page, 10) || 1;
  const resp = await axios(`${process.env.API_BASE_URL}/publications?currentPage=${currentPage}`);
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
