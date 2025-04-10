
import { Separator } from "@/components/ui/separator";

const About = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-[#f4ffc2]">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Left column with heading */}
          <div>
            <h2 className="heading-2 mb-8 animate-on-scroll opacity-0">About Me</h2>
          </div>
          
          {/* Right column with bio info */}
          <div className="animate-on-scroll opacity-0" >
            <p className="text-lg md:text-xl mb-6">
              A software engineer specializing in full-stack development with extensive experience building scalable applications. Currently pursuing Bachelor of Technology at National Institute of Technology, Tiruchirappalli with a focus on computer science fundamentals and modern software architectures.
            </p>
            <p className="text-lg md:text-xl mb-6">
              I combine strong technical skills with effective collaboration to deliver high-quality solutions. My expertise spans multiple programming languages and technologies including React, Node.js, Golang, and cloud infrastructure.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <a href="mailto:adipras1407@gmail.com" className="btn-primary">Get in touch</a>
              <a href="#" className="text-black hover:underline px-4 py-2">LinkedIn</a>
              <a href="#" className="text-black hover:underline px-4 py-2">GitHub</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
