import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug'
import titles from 'rehype-code-titles';
import autolink from 'rehype-autolink-headings';
import prism from 'rehype-prism-plus';
import Avatar from '@mui/material/Avatar';

import Link from "next/link";
import { parseISO, format } from "date-fns";
const ArticlePage = ({ article }) => {
  return (
    <main className="flex flex-col justify-center pt-32 pb-40">
      <article className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16 w-full">
      <small>
          <Link href="/blog">
            <p>👈 Back to home</p>
          </Link>
        </small>

        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4">
          {article.title}
        </h1>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full mt-2">
        <div className="flex items-center">
            <Avatar>H</Avatar>

            <p className="text-sm ml-2 text-gray-500">
              {article.author.name + ' '}

              {format(parseISO(article.createdAt), "MMMM dd, yyyy")}
            </p>

            <p className="text-sm text-gray-500 min-w-32 mt-2 ml-2 md:mt-0">
              {  article.readingTime.text}
            </p>
          </div>
          </div>
        <div className="prose dark:prose-dark max-w-none w-full mt-5 mb-8">
      <ReactMarkdown remarkPlugins={[gfm]} rehypePlugins={[rehypeSlug, titles, autolink, prism]}>{article.content}</ReactMarkdown>
        </div>
      </article>
    </main>
  );
};

export async function getServerSideProps({ params }) {
  const resp = await axios(`${process.env.API_BASE_URL}/publications/slug/${params.slug}`);
  const article = resp.data.response;

  return {
    props: {
      article,
    },
  };
}

export default ArticlePage;