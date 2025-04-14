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
          <div className="animate-on-scroll opacity-0" >
            <p className="text-lg md:text-xl mb-6 font-roboto">
              Brand and visual designer since 2018. I love creating
              playful brands and memorable digital products. I make
              your ideas a reality. Available from August.
            </p>
            <p className="text-lg md:text-xl mb-6 font-roboto">
              I combine strong technical skills with effective collaboration to deliver high-quality solutions. My expertise spans multiple design disciplines including branding, UI/UX, and digital product design.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <a href="mailto:contact@example.com" className="btn-primary font-sans">Get in touch</a>
              <a href="#" className="text-black hover:underline px-4 py-2 font-sans">LinkedIn</a>
              <a href="#" className="text-black hover:underline px-4 py-2 font-sans">Behance</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;