import Head from 'next/head';
import Image from 'next/image';
import Layout from '../components/Layout';
// import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react';
import client from '../utils/client';
import ReactLoading from 'react-loading';
import ProductItem from '../components/ProductItem';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Home() {
  const [state, setState] = useState({
    products: [],
    error: '',
    loading: true,
  });

  const { products, error, loading } = state;

  useEffect(() => {
    const fetchDaha = async () => {
      try {
        const products = await client.fetch(`*[_type == "product"]`);
        setState({ products, loading: false });
      } catch (e) {
        setState({ error: e.message, loading: false });
      }
    };
    fetchDaha();
  }, []);

  return (
    <Layout>
      {loading ? (
        <ReactLoading
          type={'bubbles'}
          color={'blue'}
          height={'10%'}
          width={'10%'}
        />
      ) : error ? (
        <div> {error}</div>
      ) : (
        <>
          <div className="flex mb-4 flex-wrap  mt-6">
            {products.map((product) => (
              <>
                <ProductItem product={product} />
              </>
            ))}
          </div>
        </>
      )}
    </Layout>
  );
}
