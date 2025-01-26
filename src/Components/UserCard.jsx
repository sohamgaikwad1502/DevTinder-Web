import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../utils/constants";
import axios from "axios";
import { removeFeedUser } from "../../utils/feedSlice";

const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, about, age, gender, _id } = user;
  const dispatch = useDispatch();
  const feedData = useSelector((store) => store.feed);

  const handleApi = async (status, id) => {
    try {
      console.log(status, id);
      const sendstatus = await axios.post(
        BASE_URL + `/request/send/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      console.log(feedData.data);
      dispatch(removeFeedUser(id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-xl flex flex-col justify-between ">
      <figure className="">
        <img src={photoUrl} alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + " " + gender} </p>}
        <p>{about}</p>
        <div className="card-actions justify-center m-4 ">
          <button
            className="btn btn-error "
            onClick={() => {
              if (_id) handleApi("ignored", _id);
            }}
          >
            Ignore
          </button>
          <button
            className="btn btn-success"
            onClick={() => {
              if (_id) handleApi("interested", _id);
            }}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
