import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { Container } from "@mui/material";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-grow lex flex-col px-32 pt-16 w-full">
        {children}
      </div>
      <Footer />
    </div>
  );
}
