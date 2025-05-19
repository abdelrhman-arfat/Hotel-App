import RoomHeroCard from "@/app/_components/card/RoomHeroCard";
import React from "react";

interface Props {
  params: {
    id: string;
  };
}

const Page = async ({ params }: Props) => {
  const { id } = params;
  console.log(id);

  return (
    <div>
      <RoomHeroCard id={id} />
    </div>
  );
};

export default Page;
