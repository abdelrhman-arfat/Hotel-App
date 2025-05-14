import IsLogin from "@/app/_components/IsLogin";
import ProfileNav from "@/app/_components/layout/ProfileNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <IsLogin>
      <ProfileNav>{children}</ProfileNav>
    </IsLogin>
  );
}
