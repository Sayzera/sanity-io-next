import Image from 'next/image';
import React from 'react';
import { urlFor } from '../utils/image';
import Skeleton from 'react-loading-skeleton';
import Link from 'next/link';
function ProductItem({ product }) {
  return (
    <div
      key={product.slug}
      className="w-full pl-2 shadow  sm:w-1/2 md:w-1/3  mx-auto"
    >
      <div className="flex-column items-center justify-center mt-2">
        <Image
          src={urlFor(product.image)}
          className="max-h-60 w-full h-full"
          width={640}
          height={640}
        />

        <div className="p-2">
          <h3 className="text-xl font-bold">{product.name}</h3>
          <p>
            {product.rating} / ({product.numReviews} reviews)
          </p>
        </div>

        <div className="p-2">
          $ {product.price}{' '}
          <Link href={`/detail/${product._id}`}>
            <button>ADD TO CART</button>
          </Link>
        </div>
      </div>
      {/* <p>{product.name}</p> */}
    </div>
  );
}

export default ProductItem;
