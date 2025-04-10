
import { Link } from "react-router-dom";

const Projects = () => {
  const featuredProject = {
    id: "jotion",
    title: "Jotion - Note Taking App",
    category: "Fullstack Development",
    description: "A note taking app built with Next.js, Tailwind CSS, and Firebase",
    image: "/projects/jotion/landing-page.png",
  };
  
  const otherProjects = [
    {
      id: "chat-app",
      title: "Real-time Chat Platform",
      category: "Backend Development",
      description: "A scalable chat application using Node.js, Redis, Kafka and WebSockets",
      image: "/projects/chatme/3.png",
    },
    {
      id: "code-compiler",
      title: "Online Code Compiler",
      category: "Cloud Infrastructure",
      description: "Web-based code editor supporting multiple languages using containerized environments",
      image: "/projects/D-Code/5.png",
    },
  ];

  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-16">
          <h2 className="heading-2 mb-4 md:mb-0 font-display text-5xl md:text-6xl">My Work</h2>
        </div>
        
        {/* Featured project - larger display */}
        <div className="mb-20">
          <Link to={`/project/${featuredProject.id}`} className="block group">
          <div className="relative transition-transform duration-500 group-hover:scale-105">
            <div className="relative z-10">
              <img
                src={featuredProject.image}
                alt={featuredProject.title}
                className="w-full aspect-video rounded-[20px] shadow-lg"
              />
            </div>
          </div>

            <div className="mt-8" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
              <span className="text-sm text-gray-500">{featuredProject.category}</span>
              <h3 className="text-3xl md:text-4xl font-serif mt-1">{featuredProject.title}</h3>
              <p className="mt-4 text-lg opacity-80">{featuredProject.description}</p>
              
            </div>
          </Link>
        </div>
        
        {/* Other projects - grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {otherProjects.map((project, index) => (
            <div key={index} className="group">
              <Link to={`/project/${project.id}`} className="block">
                <div className="relative overflow-hidden rounded-xl">
                  <div className="relative z-10">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105 rounded-lg shadow-lg"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <span className="text-sm text-gray-500">{project.category}</span>
                  <h3 className="text-xl md:text-2xl font-serif mt-1" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>{project.title}</h3>
                  
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
