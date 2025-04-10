
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const projects = [
  {
    id: "jotion",
    title: "Jotion",
    subtitle: "Quiz Application",
    year: "2025",
    category: "Fullstack Development",
    description: "A scalable quiz platform built with Golang microservices and AWS serverless architecture",
    intro: "In this project, I developed a comprehensive quiz application designed specifically for students preparing for medical entrance exams. Built with scalability in mind, it leverages Golang microservices with role-based authentication.",
    process: [
      {
        title: "Breaking down the project",
        description: "The development process for NeetChamp involved several key stages. First, I conducted extensive research to understand the needs of medical students and identify pain points with existing quiz platforms. This allowed me to create a solution that directly addressed their specific requirements."
      },
      {
        title: "Building on strong foundations",
        description: "Based on this research, I developed user personas and created a technical architecture using Golang microservices. From there, I implemented a role-based authentication system and built a scalable backend using AWS services including Lambda, ECS, and S3 to support serverless scalability."
      },
      {
        title: "Collaborating with stakeholders",
        description: "Throughout the process, I worked closely with medical educators to ensure that the platform's content and functionality aligned with exam requirements and provided an effective study tool for students."
      }
    ],
    result: "The final outcome of NeetChamp was a user-friendly and engaging quiz platform that exceeded expectations. Students were able to easily access practice questions, track their performance analytics, and benefit from the adaptive question difficulty system. As a result, the platform saw high user engagement and became an essential tool for exam preparation.",
    fullDescription: `
      <p>NeetChamp is a comprehensive quiz application designed specifically for students preparing for medical entrance exams. Built with scalability in mind, it leverages Golang microservices with role-based authentication.</p>
      <p>The backend architecture uses AWS services including Lambda, ECS, and S3 to support serverless scalability, ensuring the platform can handle peak loads during exam seasons.</p>
      <p>Key features include:</p>
      <ul>
        <li>Secure role-based access control</li>
        <li>Efficient result computation logic</li>
        <li>Real-time performance analytics</li>
        <li>Adaptive question difficulty</li>
      </ul>
    `,
    heroImage: "/projects/jotion/landing-page.png",
    detailImages: [
      {
        src: "/projects/jotion/dashboard.png",
        alt: "NeetChamp dashboard interface",
        color: "#E5DEFF" // Soft purple background
      },
    ],
    technologies: ["Golang", "AWS Lambda", "AWS ECS", "S3", "React", "Redux", "PostgreSQL"],
    date: "March 2025",
    relatedProjects: ["chat-app", "code-compiler"]
  },
  {
    id: "chat-app",
    title: "Chat App",
    subtitle: "Real-time Platform",
    year: "2024",
    category: "Backend Development",
    description: "A scalable chat application using Node.js, Redis, Kafka and WebSockets",
    intro: "For this project, I designed and built a robust real-time communication platform that supports seamless messaging across multiple devices. The focus was on creating a highly scalable infrastructure capable of handling thousands of concurrent users.",
    process: [
      {
        title: "Breaking down the project",
        description: "The development started with analyzing the requirements for a modern chat application, focusing on real-time delivery, offline message handling, and multi-device synchronization."
      },
      {
        title: "Building on strong foundations",
        description: "I chose a tech stack centered around Node.js for the backend with Redis for caching and Kafka for message queuing. This allowed for a microservices architecture that could scale horizontally as user numbers grew."
      },
      {
        title: "Collaborating with stakeholders",
        description: "Working with the product team, we iteratively refined the user experience based on feedback, ensuring the technical implementation met both performance goals and user expectations."
      }
    ],
    result: "The resulting chat platform delivers messages in real-time with minimal latency, supports both group chats and private conversations, and effectively handles offline message storage and delivery. The infrastructure can comfortably handle high concurrent traffic while maintaining performance.",
    fullDescription: `
      <p>This real-time chat platform was engineered using Node.js, Redis, Kafka, and WebSockets to provide seamless communication experiences.</p>
      <p>The modular architecture supports group chats, private direct messages, and comprehensive message history, all while maintaining high performance.</p>
      <p>The infrastructure was optimized to scale horizontally and handle high concurrent traffic, making it suitable for enterprise deployments.</p>
    `,
    heroImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2670&auto=format&fit=crop",
    detailImages: [
      {
        src: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=2594&auto=format&fit=crop",
        alt: "Chat application interface",
        color: "#D3E4FD"
      },
      {
        src: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=2670&auto=format&fit=crop",
        alt: "Real-time messaging demo",
        color: "#F2FCE2" // Soft green background
      }
    ],
    technologies: ["Node.js", "Redis", "Kafka", "WebSockets", "MongoDB", "React", "Socket.io"],
    date: "September 2024",
    relatedProjects: ["neet-champ", "data-viz"]
  },
  {
    id: "code-compiler",
    title: "Code Compiler",
    subtitle: "Online Platform",
    year: "2024",
    category: "Cloud Infrastructure",
    description: "Web-based code editor supporting multiple languages using containerized environments",
    intro: "This project involved creating a secure web-based code execution environment that supports multiple programming languages. The focus was on providing a seamless coding experience while ensuring proper isolation and security.",
    process: [
      {
        title: "Breaking down the project",
        description: "I began by researching the security implications of running user-submitted code and designing an architecture that would provide proper isolation while still offering good performance."
      },
      {
        title: "Building on strong foundations",
        description: "The solution uses Docker containers for code execution, orchestrated through AWS Lambda. Each submission runs in its own isolated environment with appropriate resource limits and security controls."
      },
      {
        title: "Collaborating with stakeholders",
        description: "Working with educational institutions, I refined the platform to meet their specific needs for teaching programming and conducting technical assessments."
      }
    ],
    result: "The final product is an online code editor that provides a safe and responsive environment for writing and executing code in multiple languages. The platform has proven valuable for educational purposes and technical interviews, with users appreciating the real-time feedback and detailed error reporting.",
    fullDescription: `
      <p>This web-based code editor supports Python, C++, and Java through Dockerized environments for safe and isolated execution.</p>
      <p>AWS Lambda is used for container orchestration, enabling secure code execution while preventing arbitrary code execution through sandboxed containers.</p>
      <p>The platform features real-time code execution feedback, detailed error logs, and seamless language mode switching, making it ideal for educational settings and coding interviews.</p>
    `,
    heroImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2670&auto=format&fit=crop",
    detailImages: [
      {
        src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2670&auto=format&fit=crop",
        alt: "Code editor interface",
        color: "#FFDEE2" // Soft pink background
      },
      {
        src: "https://images.unsplash.com/photo-1500673922987-e212871fec22?q=80&w=2594&auto=format&fit=crop",
        alt: "Containerized execution environment",
        color: "#FEF7CD" // Soft yellow background
      }
    ],
    technologies: ["Docker", "AWS Lambda", "Node.js", "React", "Monaco Editor", "Python", "C++", "Java"],
    date: "April 2024",
    relatedProjects: ["neet-champ", "ml-model"]
  },
];

const ProjectDetail = () => {
  const { projectId } = useParams();
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif font-bold mb-4">Project not found</h1>
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
            <Link to="/#projects" className="inline-flex items-center text-black hover:underline mb-6">
              <ArrowLeft size={20} className="mr-2" />
              Back to work
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h1 className="font-display text-6xl md:text-8xl font-bold mb-2">{project.title}</h1>
                <p className="text-3xl font-serif">{project.year}</p>
              </div>
              <div className="self-end">
                <p className="text-xl max-w-lg font-serif">{project.intro}</p>
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
            <h2 className="font-display text-5xl md:text-6xl mb-16">Process</h2>
            
            <div className="space-y-16">
              {project.process.map((step, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-serif text-3xl font-bold mb-4">{step.title}</h3>
                  </div>
                  <div>
                    <p className="font-serif text-lg">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detail images with colored backgrounds */}
        <div className="container-custom mb-24">
          <div className="space-y-16">
            {project.detailImages.map((image, index) => (
              <div 
                key={index}
                className="relative rounded-xl overflow-hidden" 
                // style={{ backgroundColor: image.color }}
              >
                <div className="relative z-10 flex justify-center">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="rounded-lg w-full object-contain shadow-lg"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Result section */}
        <div className="container-custom mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="font-display text-5xl md:text-6xl mb-4">Result</h2>
            </div>
            <div>
              <p className="font-serif text-lg">{project.result}</p>
            </div>
          </div>
        </div>

        {/* Technologies section */}
        <div className="container-custom mb-16">
          <h2 className="text-2xl font-serif font-semibold mb-6">Technologies Used</h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-black text-white rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Separator */}
        <div className="container-custom mb-24">
          <Separator className="h-0.5 bg-black" />
        </div>

        {/* More work section */}
        {relatedProjects.length > 0 && (
          <div className="container-custom">
            <h2 className="font-display text-4xl md:text-5xl mb-12">More work</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
              {relatedProjects.map((project, index) => (
                <div key={index} className="group">
                  <Link to={`/project/${project.id}`} className="block">
                    <div className="relative overflow-hidden rounded-xl">
                      <img
                        src={project.heroImage}
                        alt={project.title}
                        className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="mt-6">
                      <span className="text-sm text-gray-500">{project.category}</span>
                      <h3 className="text-xl md:text-2xl font-serif mt-1">{project.title}</h3>
                      <div className="mt-3">
                        <span className="text-sm">{project.date}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
