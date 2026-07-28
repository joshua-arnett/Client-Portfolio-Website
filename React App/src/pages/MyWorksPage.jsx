import { useState, useEffect } from 'react';
import { client, urlFor } from '../sanityClient';

export default function MyWorksPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // GROQ query: get all documents where _type is 'project'
    const query = `*[_type == "project"]{
        _id,
        caption,
        description,
        layout,
        mainImage
    }`;

    client
      .fetch(query)
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch projects from Sanity:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="project-wrapper">Loading projects...</div>;
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
              <div className="project-image-wrapper">
                {imageSrc && <img src={imageSrc} alt={project.description || project.caption} />}
              </div>
              <p className="project-caption">{project.caption}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}