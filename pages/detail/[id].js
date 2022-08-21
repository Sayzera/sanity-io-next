import React from 'react';
import client from '../../utils/client';
import { useRouter } from 'next/router';
import { urlForThumbnail } from '../../utils/image';
import Layout from '../../components/Layout';
import axios from 'axios';
import { useSnackbar } from 'notistack';

import {
  addToCart as addToCartAction,
  selectCart,
  selectStockControl,
} from '../../redux/mainSlice';
import { useDispatch, useSelector } from 'react-redux';

import Router from 'next/router';

function DetailPage({ id }) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const stockControl = useSelector(selectStockControl);

  const { query } = useRouter();
  const [state, setState] = React.useState({
    product: null,
    loading: true,
    error: '',
  });

  const addToCart = async () => {
    const { data } = await axios.get('/api/products/' + id);
    // stok kontrol
    let item = cart.items.find((item) => item.id === data._id);

    if (item && item.quantity >= data.countInStock) {
      enqueueSnackbar('Stokta bu ürün yok', {
        variant: 'error',
      });
      return;
    }

    dispatch(addToCartAction(data));
    enqueueSnackbar(data.name + ' Başarıyla eklendi', {
      variant: 'success',
    });

    Router.push('/cart');
  };

  const { product, loading, error } = state;

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const product = await client.fetch(
          `*[_type == "product" && _id == $id][0]`,
          { id: query.id }
        );

        setState({ ...state, product: product, loading: false });
      } catch (e) {
        setState({ error: e.message, loading: false, ...state });
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {error ? (
        <div>{error}</div>
      ) : !loading && product ? (
        <Layout>
          <div className="container mx-auto  mt-9">
            <div className="md:flex ">
              <div className="w-full md:w-1/2 mr-4 ">
                <div>
                  <span>back to result</span>
                </div>

                <div className="flex-1 ">
                  <img
                    src={urlForThumbnail(product.image)}
                    className="w-full md:h-[32rem]"
                  />
                </div>
              </div>

              <div className="w-full md:w-1/2 md:flex md:pt-12 justify-between">
                <div className="w-full md:w-1/2">
                  <div className="flex-row items-center">
                    <div className="flex-column items-center justify-center">
                      <div>{product.name}</div>
                      <div>Category: {product.category}</div>
                      <div>Brand: {product.brand}</div>
                      <div>({product.numReviews} Reviews) </div>
                      <div>Description: {product.description}</div>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-1/3">
                  <div className="border border-gray-300 p-2 md:w-60 md:fixed md:right-20">
                    <div>
                      <span>Price ${product.price} </span>
                    </div>

                    <div>
                      <span>
                        Status :{' '}
                        {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}{' '}
                      </span>
                    </div>

                    <div>
                      <button onClick={() => addToCart(query.id)}>
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      ) : (
        <div>Yükleniyor...</div>
      )}
    </>
  );
}

export default DetailPage;

export function getServerSideProps(context) {
  return {
    props: {
      id: context.query.id,
    },
  };
}
