import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UserDropDown from "./UserDropDown";

type TProps = {
  user: {
    fullName: string;
    image: string;
  };
};

const UserCard = ({ user }: TProps) => {
  return (
    <details className="relative group">
      <summary className="list-none cursor-pointer">
        <div className="flex px-2 md:px-0 flex-row-reverse md:flex-row items-center justify-between gap-2 sm:gap-3">
          <h3 className="text-sm sm:text-base font-medium text-gray-900 dark:text-white truncate">
            {user.fullName}
          </h3>
          <Avatar className="h-9 w-9 md:h-10 md:w-10">
            <AvatarImage src={user.image} alt={user.fullName} />
            <AvatarFallback className="text-xs sm:text-sm font-semibold bg-gray-200 dark:bg-gray-700">
              {user.fullName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </summary>

      <UserDropDown />
    </details>
  );
};

export default UserCard;
