import { useDispatch } from "react-redux";
import { AppDispatch } from "../_RTK/redux-store/store";
export const useAppDispatch = () => {
  return useDispatch<AppDispatch>();
};
