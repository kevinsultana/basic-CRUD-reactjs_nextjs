import { Geist, Geist_Mono } from "next/font/google";
import { ProjectProvider } from "@/context/ProjectContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CRUD Tasks",
  description: "Basic CRUD Tasks bt kevin",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ProjectProvider>{children}</ProjectProvider>
      </body>
    </html>
  );
}
