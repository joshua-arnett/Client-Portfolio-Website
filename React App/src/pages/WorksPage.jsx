import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client, urlFor } from '../sanityClient';

export default function WorksPage() {
  const { slug } = useParams(); // Obtains slug from react route
  const [collections, setCollections] = useState([]);
  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const query = slug
      ? `*[_type == "collection" && slug.current == $slug][0]{
          _id,
          title,
          slug,
          description,
          layout,
          mainImage,
          projects[]->{
            _id,
            caption,
            description,
            layout,
            mainImage
          }
        }` // If query contains slug, we query all the projects from the specific collection the slug belongs to
      : `*[_type == "collection"]{
          _id,
          title,
          slug,
          description,
          layout,
          mainImage
        }`; // If query does not contain slug, we query all the collections

    client
      .fetch(query, slug ? { slug } : {}) // 
      .then((data) => {
        if (slug) {
          setCollection(data);
        } else {
          setCollections(data || []);
        }
        setLoading(false);
      })
      .catch((err) => {
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
        <h1>{collection.title}</h1>
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