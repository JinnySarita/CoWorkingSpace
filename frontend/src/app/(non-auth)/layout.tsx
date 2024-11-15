import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { Container } from "@mui/material";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-grow flex flex-col px-4 md:px-8 lg:px-16 2xl:px-32 py-2 md:py-4 xl:py-8 2xl:py-16 w-full">
        {children}
      </div>
      <Footer />
    </div>
  );
}
