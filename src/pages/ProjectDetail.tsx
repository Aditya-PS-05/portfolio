
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const projects = [
  {
    id: "jotion",
    title: "Jotion",
    subtitle: "Notion Clone",
    year: "2023",
    category: "Fullstack Development",
    description: "A bespoke Notion clone enhancing productivity with seamless collaboration, note-taking, and multimedia-rich documentation.",
    intro: "Jotion is a feature-rich Notion alternative that empowers users to organize thoughts, manage tasks, and collaborate efficiently in a modern, customizable workspace.",
    process: [
      {
        title: "Designing a versatile workspace",
        description: "Jotion was built to offer a seamless blend of note-taking, task management, and content organization, tailored for both individuals and teams. The interface was designed with a strong focus on UX and modularity."
      },
      {
        title: "Implementing powerful backend capabilities",
        description: "Using Next.js and Convex, I developed a real-time collaborative backend supporting rich text editing, page hierarchies, and dynamic content types like databases and charts."
      },
      {
        title: "Enhancing team collaboration",
        description: "The system was designed to support multi-user collaboration, allowing teams to brainstorm, manage workflows, and document projects together in a structured and scalable environment."
      }
    ],
    result: "Jotion became a highly effective productivity tool, enabling users to streamline workflows, manage resources, and organize content intuitively, offering a solid alternative to existing workspace platforms.",
    fullDescription: `
      <p>Jotion is a bespoke Notion clone developed to redefine digital organization and productivity. With its intuitive interface, users can easily collaborate, take notes, manage tasks, and build content-rich pages that include databases, charts, and multimedia.</p>
      <p>Designed with versatility in mind, Jotion caters to personal and professional needs alike—ideal for project planning, team collaboration, resource compilation, and more.</p>
      <p>Key features include:</p>
      <ul>
        <li>Real-time collaborative editing</li>
        <li>Customizable page and block structure</li>
        <li>Support for databases, charts, and multimedia</li>
        <li>Responsive and user-friendly interface</li>
      </ul>
    `,
    heroImage: "/projects/jotion/landing-page.png",
    technologies: ["Next.js", "Convex", "Tailwind CSS", "React", "TypeScript"],
    date: "November 2023",
    relatedProjects: ["chat-app", "code-compiler"]
  },
  {
    id: "chat-app",
    title: "Chat App",
    subtitle: "Real-time Platform",
    year: "2024",
    category: "Backend Development",
    description: "Engineered a scalable chat platform using Node.js, Redis, Kafka, and WebSockets.",
    intro: "Built a robust real-time messaging application with support for group chats, DMs, and message history, all optimized for high concurrency.",
    process: [
      {
        title: "Breaking down the project",
        description: "Engineered a real-time chat platform using Node.js, Redis, Kafka, and WebSockets. Focused on scalable architecture to support group chats, private DMs, and message history while handling high concurrent traffic."
      },
      {
        title: "Building on strong foundations",
        description: "Designed modular microservices with message queuing and Redis caching, enabling horizontal scaling and minimal latency in message delivery."
      },
      {
        title: "Collaborating with stakeholders",
        description: "Worked with product teams to ensure performance and UX met enterprise-grade standards. Refined features like synchronization and offline handling based on real-world usage feedback."
      }
    ],
    result: "Successfully delivered a real-time chat platform with high concurrency support, minimal latency, and seamless user experience across devices.",
    fullDescription: `
      <p>This real-time chat platform was engineered using Node.js, Redis, Kafka, and WebSockets to provide seamless communication experiences.</p>
      <p>It supports group chats, private messaging, and comprehensive message history with a horizontally scalable infrastructure for high concurrent usage.</p>
      <p>The platform delivers messages in real-time with minimal latency and supports robust offline handling and delivery guarantees.</p>
    `,
    heroImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2670&auto=format&fit=crop",
    technologies: ["Node.js", "Redis", "Kafka", "WebSockets", "MongoDB", "React", "Socket.io"],
    date: "September 2024",
    relatedProjects: ["neet-champ", "code-compiler"]
  },
  {
    id: "code-compiler",
    title: "Code Compiler",
    subtitle: "Online Platform",
    year: "2024",
    category: "Cloud Infrastructure",
    description: "Secure web-based code execution platform using Docker containers and AWS Lambda.",
    intro: "Developed a web-based code editor supporting Python, C++, and Java with secure containerized environments for isolated execution.",
    process: [
      {
        title: "Breaking down the project",
        description: "Researched execution security and implemented sandboxed Docker containers for isolated and safe user-submitted code execution."
      },
      {
        title: "Building on strong foundations",
        description: "Used AWS Lambda for orchestrating Docker containers, ensuring each code submission was handled securely and independently."
      },
      {
        title: "Collaborating with stakeholders",
        description: "Collaborated with educators to build features like real-time code feedback, error logs, and multi-language support suitable for assessments and coding practice."
      }
    ],
    result: "Created a secure and interactive code execution platform used for education and technical interviews, supporting real-time feedback and multiple language modes.",
    fullDescription: `
      <p>This web-based code editor supports Python, C++, and Java through Dockerized environments for secure and isolated execution.</p>
      <p>AWS Lambda handles container orchestration, ensuring every code submission runs safely with restricted resources and isolation.</p>
      <p>Features include real-time feedback, language switching, error logs, and a smooth user experience tailored for educational use cases.</p>
    `,
    heroImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2670&auto=format&fit=crop",
    technologies: ["Docker", "AWS Lambda", "Node.js", "React", "Monaco Editor", "Python", "C++", "Java"],
    date: "April 2024",
    relatedProjects: ["neet-champ", "ml-model"]
  }
];

const ProjectDetail = () => {
  const { projectId } = useParams();
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-roboto font-bold mb-4">Project not found</h1>
          <Link to="/" className="text-blue-500 hover:underline">
            Return to homepage
          </Link>
        </div>
      </div>
    );
  }

  const relatedProjects = project.relatedProjects
    ? projects.filter(p => project.relatedProjects.includes(p.id))
    : [];

  return (
    <div className="bg-[#f4ffc2]">
      <Header />
      <main className="pt-16 pb-20">
        {/* Hero section */}
        <div className="container-custom py-8">
          <Separator className="h-0.5 bg-black mb-12" />

          <div className="mb-16">
            <Link to="/" className="inline-flex items-center text-black hover:underline mb-6">
              <ArrowLeft size={20} className="mr-2" />
              Back to work
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h1 className="font-display text-6xl md:text-8xl font-bold mb-2" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}>{project.title}</h1>
                <p className="text-3xl font-roboto">{project.year}</p>
              </div>
              <div className="self-end">
                <p className="text-xl max-w-lg font-roboto">{project.intro}</p>
              </div>
              <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-black text-white rounded-full text-sm font-roboto"
              >
                {tech}
              </span>
            ))}
          </div>
            </div>
          </div>
        </div>

        {/* Main image with colored background */}
        <div className="mb-24">
          <div className="container-custom">
            <div className="relative rounded-xl overflow-hidden">
              <div className="relative z-10 flex justify-center">
                <img
                  src={project.heroImage}
                  alt={project.title}
                  className="rounded-lg w-full object-contain shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Process section */}
        <div className="container-custom mb-24">
          <div className="mb-16">
            <h2 className="font-display text-5xl md:text-6xl mb-16" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}>Process</h2>
            
            <div className="space-y-16">
              {project.process.map((step, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-roboto text-3xl font-bold mb-4">{step.title}</h3>
                  </div>
                  <div>
                    <p className="font-roboto text-lg">{step.description}</p>
                  </div>
                </div>

                
              ))}
            </div>
          </div>
        </div>

        {/* Result section */}
        <div className="container-custom mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="font-display text-5xl md:text-6xl mb-4" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}>Result</h2>
            </div>
            <div>
              <p className="text-lg font-roboto">{project.result}</p>
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
