import AppLoader from "@/app/_components/AppLoader";
import RoomHeroCard from "@/app/_components/card/RoomHeroCard";
import React from "react";
import { Suspense } from "react";
interface Props {
  params: {
    id: string;
  };
}

const Page = async ({ params }: Props) => {
  const { id } = params;
  if (!id) throw new Error("No id provided");

  return (
    <div>
      <Suspense fallback={<AppLoader />}>
        <RoomHeroCard id={id} />
      </Suspense>
    </div>
  );
};

export default Page;
