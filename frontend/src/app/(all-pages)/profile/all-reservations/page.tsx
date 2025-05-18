import ReservationSearch from "@/app/_components/ReservationSearch";
import AllReservationSection from "@/app/_components/sections/profile/AllReservationSection";
import SettingCard from "@/app/_components/sections/profile/SettingCard";
import { Calendar } from "lucide-react";

const page = () => {
  return (
    <div>
      <SettingCard
        buttonText="Search for a Reservation"
        description="Search for a reservation by reservation ID and user email"
        icon={<Calendar />}
        title="Search for a Reservation"
        component={<ReservationSearch />}
      />
      <AllReservationSection />
    </div>
  );
};

export default page;
