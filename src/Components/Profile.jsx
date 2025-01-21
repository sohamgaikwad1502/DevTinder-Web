import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = function () {
  const user = useSelector((store) => store.user);
  // console.log(user);
  return (
    user && (
      <div>
        <EditProfile user={user}></EditProfile>
      </div>
    )
  );
};
export default Profile;
