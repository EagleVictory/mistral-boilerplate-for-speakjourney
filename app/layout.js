import "bootstrap/dist/css/bootstrap.min.css";
import { Oswald, Lemon } from "next/font/google";
import "./globals.css";
import "@/components/navbar/Navbar";
import Navbar from "@/components/navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const oswald = Oswald({
  weight: ["200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-oswald",
});
export const lemon = Lemon({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lemon",
});

export const metadata = {
  title: "Speak-Journey",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${oswald.variable} ${lemon.variable}`}>
        <ToastContainer />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
