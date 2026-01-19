import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aditya Pratap Singh",
  description: "Open source Rust programmer, Full Stack Developer, and UI/UX engineer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <footer>
          <p>© {new Date().getFullYear()} Aditya Pratap Singh</p>
        </footer>
      </body>
    </html>
  );
}
