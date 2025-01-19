const UserCard = ({ user }) => {
  console.log(user);
  const { firstName, lastName, photoUrl, about, age, gender } = user;

  return (
    <div className="card bg-base-300 w-96 shadow-xl ">
      <figure>
        <img src={photoUrl} alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + " " + gender} </p>}
        <p>{about}</p>
        <div className="card-actions justify-center m-4 ">
          <button className="btn btn-error ">Ignore</button>
          <button className="btn btn-success">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
