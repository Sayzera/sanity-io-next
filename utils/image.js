import imageUrlBuilder from '@sanity/image-url';
import client from './client';

function urlForThumbnail(source) {
  return imageUrlBuilder(client).image(source).width(300).url();
}

function urlFor(source) {
  return imageUrlBuilder(client).image(source).width(580).url();
}

export { urlForThumbnail, urlFor };
