import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client, urlFor } from '../sanityClient';

export default function CollectionsPage() {
  const [collection, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // GROQ query: get all documents where _type is 'collection'
    const query = `*[_type == "collection" && slug.current == $slug][0]{
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
    }`;

    client
      .fetch(query)
      .then((data) => {
        setCollections(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch collections from Sanity:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="project-wrapper">Loading collections...</div>;
  }

  return (
    <div className="project-wrapper">
      <h1>My Works:</h1>
      <div className="project-collection">
        {projects.map((project) => {
          // Resolve image: use uploaded Sanity image first, fallback to external URL
          const imageSrc = project.mainImage
            ? urlFor(project.mainImage).url()
            : project.externalImageUrl;

          return (
            <div
              key={project._id}
              className={
                project.layout === 'portrait' ? 'project' : 'project landscape'
              }
            >
              <Link to={`/works/${collection.slug.current}`}>
                <div className="project-image-wrapper collection">
                {imageSrc && <img src={imageSrc} alt={project.description || project.caption} />}
              </div>
              </Link>
              <p className="project-caption">{project.caption}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}