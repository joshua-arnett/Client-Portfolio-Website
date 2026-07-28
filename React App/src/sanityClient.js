import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: '5gb6fvic',
  dataset: 'production',
  useCdn: true, // fast, cached responses for public sites
  apiVersion: '2026-07-28', // Today's date as a fixed YYYY-MM-DD
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}