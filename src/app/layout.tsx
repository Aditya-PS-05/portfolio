import type { Metadata } from "next";
import { Open_Sans, Source_Code_Pro } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "600"],
  variable: "--font-open-sans",
});

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  weight: ["300"],
  variable: "--font-source-code-pro",
});

export const metadata: Metadata = {
  title: {
    default: "Home | Aditya Pratap Singh",
    template: "%s | Aditya Pratap Singh",
  },
  description: "Open source Rust programmer, Full Stack Developer, and UI/UX engineer.",
  icons: {
    icon: [],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${openSans.variable} ${sourceCodePro.variable}`}>
      <body className={openSans.className}>
        {children}
        <footer>
          <p>© {new Date().getFullYear()} Aditya Pratap Singh</p>
        </footer>
      </body>
    </html>
  );
}
