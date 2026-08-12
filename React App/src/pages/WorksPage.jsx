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

  // If we queried works within a specific collection
  if (slug) {
    if (!collection) {
      return <div className="project-wrapper">Collection not found.</div>;
    }

    return (
      <div className="project-wrapper">
        <div className="works-back-arrow-header-wrapper">
          <Link to="/works" className="works-back-arrow-link">
            <FaArrowLeftLong className="works-back-arrow" />
            <h1>{collection.title}</h1>
          </Link>
        </div>


        <div className="project-collection">
          {collection.projects?.map((project) => {
            const imageSrc = project.mainImage
              ? urlFor(project.mainImage).url()
              : null;

            return (
              <div
                key={project._id}
                className={
                  project.layout === 'portrait' ? 'project' : 'project landscape'
                }
              >
                <div className="project-image-wrapper">
                  {imageSrc && (
                    <img
                      src={imageSrc}
                      alt={project.description || project.caption}
                    />
                  )}
                </div>
                <p className="project-caption">{project.caption}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // If we queried all collections
  return (
    <div className="project-wrapper">
      <h1 className='my-works-header'>My Works:</h1>
      <div className="project-collection">
        {collections.map((collectionItem) => {
          const imageSrc = collectionItem.mainImage
            ? urlFor(collectionItem.mainImage).url()
            : null;

          return (
            <div
              key={collectionItem._id}
              className={
                collectionItem.layout === 'portrait'
                  ? 'project'
                  : 'project landscape'
              }
            >
              <Link to={`/works/${collectionItem.slug.current}`}>
                <div className="project-image-wrapper collection">
                  {imageSrc && (
                    <img
                      src={imageSrc}
                      alt={collectionItem.description || collectionItem.title}
                    />
                  )}
                </div>
              </Link>
              <p className="project-caption">{collectionItem.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}