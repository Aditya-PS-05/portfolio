
import { Twitter, Linkedin, Github, X } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12">
      <div className="container-custom flex space-x-8 font-bold text-lg">
        <a href="#" className="text-black">GitHub</a>
        <a href="#" className="text-black">LinkedIn</a>
        <a href="#" className="text-black">Twitter</a>
        <a href="#" className="text-black">Built by Aditya</a>
      </div>
    </footer>
  );
};

export default Footer;
