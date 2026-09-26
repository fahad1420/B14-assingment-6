import { Inter, Oswald } from "next/font/google";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald", display: "swap" });

export const metadata = {
  title: { default: "FitLog — Workout Library", template: "%s | FitLog" },
  description: "Pick a lift, build today's plan, and log every set with FitLog.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${oswald.variable} antialiased`}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
