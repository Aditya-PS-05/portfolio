const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12">
      <div className="container-custom flex space-x-8 font-sans text-base">
        <a href="#" className="text-black hover:text-gray-700 transition-colors font-roboto font-semibold">GitHub</a>
        <a href="#" className="text-black hover:text-gray-700 transition-colors font-roboto font-semibold">LinkedIn</a>
        <a href="#" className="text-black hover:text-gray-700 transition-colors font-roboto font-semibold">Twitter</a>
        <a href="#" className="text-black hover:text-gray-700 transition-colors font-roboto font-semibold">Built by Aditya</a>
      </div>
    </footer>
  );
};

export default Footer;
