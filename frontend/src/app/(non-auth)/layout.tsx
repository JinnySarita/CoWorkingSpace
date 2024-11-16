import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-grow flex flex-col px-4 md:px-8 lg:px-16 2xl:px-32 py-4 md:py-8 lg:py-16 w-full">
        {children}
      </div>
      <Footer />
    </div>
  );
}
