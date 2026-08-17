import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { ConvexClientProvider } from "@/components/providers/convex-provider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Aditya Pratap Singh — ML Systems Engineer",
    template: "%s | Aditya Pratap Singh",
  },
  description:
    "ML systems engineer: model compression, on-device inference, LLM fine-tuning, agent infrastructure. Rust compiler contributor.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <ConvexClientProvider>{children}</ConvexClientProvider>
        <footer className="site-footer">
          <p className="site-footer-links">
            <a href="mailto:adipras1407@gmail.com">adipras1407@gmail.com</a>
            <span className="dot">·</span>
            <a href="https://github.com/Aditya-PS-05">GitHub</a>
            <span className="dot">·</span>
            <Link href="/notes">notes</Link>
          </p>
          <p>© {new Date().getFullYear()} Aditya Pratap Singh</p>
        </footer>
      </body>
    </html>
  );
}
