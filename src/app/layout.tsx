import type { Metadata } from "next";
import { Inter, Orbitron, JetBrains_Mono } from "next/font/google";
import { AppProviders } from "@/components/providers/AppProviders";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-display",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Rahul Varimadla | Futuristic Portfolio",
  description:
    "Computer Science Engineering student crafting immersive, next-generation digital experiences. Explore projects, skills, and connect.",
  keywords: ["Rahul", "Portfolio", "Developer", "CS Student", "React", "Next.js"],
  authors: [{ name: "Rahul Varimadla" }],
  openGraph: {
    title: "Rahul Varimadla | Futuristic Portfolio",
    description: "Transforming Ideas into Futuristic Digital Experiences",
    type: "website",
  },
  icons: {
    icon: "/my-icon.png",
    shortcut: "/my-icon.png",
    apple: "/my-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable} ${jetbrains.variable}`}>
      <body className="antialiased bg-void text-slate-200">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
