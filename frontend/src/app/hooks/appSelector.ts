import { useSelector } from "react-redux";
import { RootState } from "../_RTK/redux-store/store";

export const useUserSelector = () => {
  return useSelector((state: RootState) => state.user);
};
