import IsLogin from "@/app/_components/IsLogin";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <IsLogin>{children}</IsLogin>
    </>
  );
}
