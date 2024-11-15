import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full items-center justify-center">
      {children}
      <LanguageSwitcher className="absolute right-8 bottom-8 text-[#1976D2]" />
    </div>
  );
}
