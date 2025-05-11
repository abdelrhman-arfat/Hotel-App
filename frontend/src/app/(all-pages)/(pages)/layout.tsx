import Navbar from "@/app/_components/navbar/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="flex justify-end items-center p-4 gap-4 h-16">
        <Navbar />
      </header>

      <main className="px-1 sm:px-2 md:px-4 py-3">{children}</main>
    </>
  );
}
