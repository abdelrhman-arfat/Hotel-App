import IsNotLogin from "@/app/_components/IsNotLogin";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <IsNotLogin>{children}</IsNotLogin>
    </>
  );
}
