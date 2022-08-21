import client from '@sanity/client';
import config from './config';

export default client({
  projectId: config.projectID,
  dataset: config.dataset,
  useCdn: true,
  apiVersion: '2021-08-31',
});
