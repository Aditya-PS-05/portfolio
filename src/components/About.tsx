const About = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-[#f4ffc2]">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Left column with heading */}
          <div>
            <h2 className="heading-2 mb-8 animate-on-scroll opacity-0" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}>About Me</h2>
          </div>
          
          {/* Right column with bio info */}
          <div className="animate-on-scroll opacity-0">
            <p className="text-lg md:text-xl mb-6 font-roboto">
              A full-stack developer currently pursuing my B.Tech at NIT Trichy. With strong foundations in system design, microservices, and cloud-native development, I enjoy building scalable products that solve real-world problems.
            </p>
            <p className="text-lg md:text-xl mb-6 font-roboto">
              My experience spans backend development with Golang, serverless architecture on AWS, and crafting intuitive UIs with React and TailwindCSS. From building quiz platforms like NeetChamp to real-time chat apps and online code compilers, I thrive on turning ideas into functional, production-ready applications.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <a href="mailto:adipras1407@gmail.com" className="btn-primary font-sans">Get in touch</a>
              <a href="https://www.linkedin.com/in/aditya-pratap-singh-952a8820a/" target="_blank" className="text-black hover:underline px-4 py-2 font-sans">LinkedIn</a>
              <a href="https://github.com/Aditya-PS-05" target="_blank" className="text-black hover:underline px-4 py-2 font-sans">GitHub</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
