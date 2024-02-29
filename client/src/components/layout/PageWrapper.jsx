import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAppState } from "../../redux/featured/appStateSlice";



const PageWrapper = ({ state, children}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (state) {
      dispatch(setAppState(state));
    }
  }, [dispatch, state, children]);

  return (
    <>{children}</>
  );
};

export default PageWrapper;