
const Experience = () => {
  return (
    <section id="experience" className="py-24 md:py-32">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          <h2 className="heading-2 mb-12 animate-on-scroll opacity-0 font-roboto" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}>Experience</h2>
          
          <div className="animate-on-scroll opacity-0">
            <div className="border-l-2 border-black pl-6 relative mb-16">
              <div className="absolute w-3 h-3 bg-black rounded-full -left-[7px] top-1"></div>
              <p className="text-sm mb-1 font-roboto">Mar 2025 - Present</p>
              <h3 className="text-2xl font-semibold mb-2">Full-Stack Developer Intern</h3>
              <p className="text-xl mb-2">Experiana Trails</p>
              <p className="text-gray-700 font-roboto">
                Developing and maintaining full-stack components using React.js, Node.js and REST APIs. 
                Improving front-end performance and responsiveness through optimization techniques.
                Collaborating with designers and marketing teams to implement UX improvements based on user feedback.
                Working with Git Actions and Jira for task tracking and deployments.
              </p>
            </div>
            
            <div className="border-l-2 border-black pl-6 relative">
              <div className="absolute w-3 h-3 bg-black rounded-full -left-[7px] top-1"></div>
              <p className="text-sm mb-1 font-roboto">Feb 2025 - Apr 2025</p>
              <h3 className="text-2xl font-semibold mb-2">Software Developer Intern</h3>
              <p className="text-xl mb-2 font-roboto">Journim</p>
              <p className="text-gray-700 font-roboto">
                Designed and built core microservices for Journim's MVP using Golang and Serverless Stack for AWS.
                Improved backend scalability through efficient API routing and code refactors.
                Worked closely with product managers to translate business needs into technical specs.
                Collaborated in daily standups and contributed to sprint planning and feature rollouts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
