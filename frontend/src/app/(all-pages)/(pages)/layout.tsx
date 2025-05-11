import Navbar from "@/app/_components/navbar/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full">
      <header className="flex justify-end mb-3 items-center px-4 py-3 gap-4 h-16 ">
        <Navbar />
      </header>

      <main className="px-6 md:px-9 py-3">{children}</main>
    </div>
  );
}
