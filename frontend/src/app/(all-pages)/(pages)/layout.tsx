import Footer from "@/app/_components/layout/Footer";
import Navbar from "@/app/_components/layout/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full bg-gray-50">
      <header className="flex  justify-end mb-3 items-center px-4 py-3 gap-4  ">
        <Navbar />
      </header>

      <main className="px-2 sm-4 md:px-9 py-3">{children}</main>
      <Footer />
    </div>
  );
}
