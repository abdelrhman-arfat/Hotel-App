import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UserDropDown from "./UserDropDown";

type TProps = {
  user: {
    fullname: string;
    image: string;
  };
};

const UserCard = ({ user }: TProps) => {
  return (
    <details className="relative group">
      <summary className="list-none py-3 md:py-0 border-t border-gray-300 md:border-t-0 cursor-pointer">
        <div className="flex px-2 md:px-0 flex-row-reverse  justify-end md:justify-start  md:flex-row items-center gap-2 sm:gap-3">
          <div>
            <h3 className="text-sm sm:text-base font-medium text-gray-900 dark:text-white truncate">
              {user.fullname}
            </h3>
          </div>
          <div>
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.image} alt={user.fullname} />
              <AvatarFallback className="text-xs sm:text-sm font-semibold bg-gray-200 dark:bg-gray-700">
                {user?.fullname[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </summary>

      <UserDropDown />
    </details>
  );
};

export default UserCard;
