// app/rooms/[id]/page.tsx
import React from "react";
import RoomHeroCard from "@/app/_components/card/RoomHeroCard";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  
  return (
    <div>
      <RoomHeroCard id={id} />
    </div>
  );
};

export default Page;
