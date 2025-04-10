
import { Separator } from "@/components/ui/separator";

const Contact = () => {
  return (
    <section id="contact" className="py-24 md:py-32 bg-[#f4ffc2]">
      <div className="container-custom">
        {/* <Separator className="h-0.5 bg-black mb-16" /> */}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-display text-5xl md:text-7xl font-bold mb-4">
              Drop me a<br />message
            </h2>
            
            <p className="text-lg font-lora mb-12">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            
            <div className="mb-8">
              <a 
                href="mailto:adipras1407@gmail.com" 
                className="inline-block px-8 py-4 bg-black text-white font-medium rounded-md hover:bg-black/90 transition-all"
              >
                EMAIL ME
              </a>
            </div>
          </div>
          
          <div className="flex flex-col justify-end">
            <div className="space-y-8 max-w-md">
              <a href="https://x.com/0xAditya_pratap" className="block group">
                <div className="flex justify-between items-center py-4 border-b border-black">
                  <span className="text-2xl font-lora">X (Twitter)</span>
                  <span className="transform group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </a>
              
              <a href="https://www.linkedin.com/in/aditya-pratap-singh-952a8820a" className="block group">
                <div className="flex justify-between items-center py-4 border-b border-black">
                  <span className="text-2xl font-lora">LinkedIn</span>
                  <span className="transform group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </a>
              
              <a href="https://github.com/Aditya-PS-05" className="block group">
                <div className="flex justify-between items-center py-4 border-b border-black">
                  <span className="text-2xl font-lora">GitHub</span>
                  <span className="transform group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
