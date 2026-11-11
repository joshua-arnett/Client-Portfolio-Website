import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client, urlFor } from '../sanityClient';
import { FaArrowLeftLong } from "react-icons/fa6";


export default function WorksPage() {
  const { slug } = useParams(); // Obtains slug from react route
  const [collections, setCollections] = useState([]);
  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This page serves two views:
    // 1) /works -> list every collection card
    // 2) /works/:slug -> show one collection and its projects
    // The data-fetch shape changes depending on whether a slug exists in the URL.
    setLoading(true);

    // Query A: fetch one collection by its slug if the route includes a slug.
    // Query B: fetch all collections if the route is just /works.
    const query = slug
      ? `*[_type == "collection" && slug.current == $slug][0]{
          _id,
          title,
          slug,
          description,
          layout,
          mainImage
        }`
      : `*[_type == "collection"]{
          _id,
          title,
          slug,
          description,
          layout,
          mainImage
        }`;

    // This second query runs only in the detail view. Once a collection is found,
    // we fetch every project whose collection reference matches that collection slug.
    const projectsQuery = slug
      ? `*[_type == "project" && collection->slug.current == $slug]{
          _id,
          caption,
          description,
          layout,
          mainImage
        }`
      : null;

    client
      .fetch(query, slug ? { slug } : {})
      .then((data) => {
        if (slug) {
          // Detail view: store the selected collection first.
          setCollection(data);

          // If the collection exists, fetch its projects and attach them in the next step.
          if (data) {
            return client.fetch(projectsQuery, { slug });
          }

          // If no collection matches the slug, return an empty array.
          return [];
        }

        // List view: store all collection cards.
        setCollections(data || []);
        setLoading(false);
        return [];
      })
      .then((projectData) => {
        if (slug) {
          // Merge the fetched projects onto the collection object so the view can map over
          // collection.projects and render the project gallery inside the chosen collection.
          setCollection((current) => current ? { ...current, projects: projectData || [] } : null);
        }
        setLoading(false);
      })
      .catch((err) => {
        // If anything fails, log the error and stop the loading state.
        console.error('Failed to fetch collections from Sanity:', err);
        setLoading(false);
      });
  }, [slug]);

  // Loading message
  if (loading) {
    return <div className="project-wrapper">Loading { slug ? "projects" : "collections"}...</div>;
  }

  if (slug && !collection) {
    return <div className="project-wrapper">Collection not found.</div>;
  }

  const isCollectionDetail = Boolean(slug);
  const items = isCollectionDetail ? collection.projects ?? [] : collections;

  return (
    <div className="project-wrapper">
      {isCollectionDetail ? (
        <div className="works-back-arrow-header-wrapper">
          <Link to="/works" className="works-back-arrow-link">
            <FaArrowLeftLong className="works-back-arrow" />
            <h1>{collection.title}</h1>
          </Link>
        </div>
      ) : (
        <h1 className="my-works-header">My Works:</h1>
      )}

      <div className="project-collection">
        {items.map((item) => {
          const imageSrc = item.mainImage
            ? urlFor(item.mainImage).width(800).format('webp').quality(85).url()
            : null;
          const image = (
            <div className={`project-image-wrapper${isCollectionDetail ? '' : ' collection'}`}>
              {imageSrc && (
                <img
                  src={imageSrc}
                  alt={item.description || (isCollectionDetail ? item.caption : item.title)}
                />
              )}
            </div>
          );

          return (
            <div
              key={item._id}
              className={
                item.layout === 'portrait' ? 'project' : 'project landscape'
              }
            >
              {isCollectionDetail ? (
                image
              ) : (
                <Link to={`/works/${item.slug.current}`}>{image}</Link>
              )}
              <p className="project-caption">
                {isCollectionDetail ? item.caption : item.title}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}