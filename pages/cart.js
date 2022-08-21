import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCart,
  changeToCartQuantity,
  removeFromCart,
} from '../redux/mainSlice';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { urlForThumbnail } from '../utils/image';
import axios from 'axios';

import { useSnackbar } from 'notistack';
import Layout from '../components/Layout';

function Cart() {
  const { enqueueSnackbar } = useSnackbar();
  const { items } = useSelector(selectCart);
  const dispatch = useDispatch();

  let selectBoxItemVal = React.useRef(null);

  const handleOnchange = async (e, id) => {
    // Stok kontrol

    const { data } = await axios.get(`/api/products/${id}`);

    if (Number(e.target.value) > data.countInStock) {
      enqueueSnackbar('Stokta bu ürün yok', {
        variant: 'error',
      });
      return false;
    }

    dispatch(
      changeToCartQuantity({
        id: id,
        val: e.target.value,
      })
    );

    enqueueSnackbar('Ürün başarıyla güncellendi', {
      variant: 'success',
    });
  };

  console.log(items);
  return (
    <>
      <Layout>
        <div className="md:flex justify-between md:container md:mx-auto py-5 ">
          <div className="w-full md:w-8/12 py-5 px-2">
            <div className="py-1">
              <div className="mb-5">
                <span className="font-bold text-2xl ">Shopping Cart</span>
              </div>

              <div className="overflow-x-auto relative">
                <table className="table-auto w-full text-sm text-left uppercase bg-gray-50">
                  <thead>
                    <tr>
                      <th scope="col" className="py-3 px-6">
                        Image
                      </th>
                      <th scope="col" className="py-3 px-6">
                        Name
                      </th>
                      <th scope="col" className="py-3 px-6">
                        Quantity
                      </th>
                      <th scope="col" className="py-3 px-6">
                        Price
                      </th>
                      <th scope="col" className="py-3 px-6">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {items?.map((item) => (
                      <>
                        <tr
                          key={item.id}
                          className="
                          bg-white border-b 
                          hover:bg-gray-600 
                          hover:text-gray-800 
                          hover:cursor-pointer"
                        >
                          <td className="py-4 px-6 hover:underline">
                            <Image
                              src={urlForThumbnail(item.image)}
                              width={70}
                              height={70}
                              loading="lazy"
                              alt={item.name}
                            />
                          </td>
                          <td className="py-4 px-6 hover:underline">
                            {item.name}
                          </td>
                          <td className="py-4 px-6 hover:underline">
                            <select
                              ref={selectBoxItemVal}
                              onChange={(e) => handleOnchange(e, item.id)}
                            >
                              {[...Array(20).keys()].map((x) => {
                                if (x + 1 == item.quantity) {
                                  return (
                                    <option selected value={x + 1}>
                                      {x + 1}
                                    </option>
                                  );
                                } else {
                                  return <option value={x + 1}>{x + 1}</option>;
                                }
                              })}
                            </select>
                          </td>
                          <td className="py-4 px-6 hover:underline">
                            {item.price}
                          </td>
                          <td className="py-4 px-6 hover:underline">
                            <button
                              onClick={() =>
                                dispatch(
                                  removeFromCart({
                                    id: item.id,
                                  })
                                )
                              }
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="w-full md:w-4/12 py-5 px-4 border rounded shadow h-44 md:mt-12">
            <div className="text-center md:text-left">
              <span className="font-bold text-2xl mt-2">
                Subtotal ({items?.reduce((a, c) => a + c.quantity, 0)} items) $:
                {items?.reduce((a, c) => a + c.quantity * c.price, 0)}
              </span>
            </div>
            <button
              type="button"
              className="
            focus:outline-none 
            bg-yellow-400
            hover:bg-yellow-500
            focus:ring-4
            focus:ring-yellow-300
            rounded-lg
            px-5
            py-3
            mr-2
            mb-2
            uppercase
            w-full
            mt-8
            text-2xl
            text-black
            "
            >
              CHECKOUT
            </button>{' '}
          </div>
        </div>
      </Layout>
    </>
  );
}

export default dynamic(() => Promise.resolve(Cart), { ssr: false });
// https://flowbite.com/docs/forms/checkbox/
