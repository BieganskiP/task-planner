import { db } from "../config/firebase";
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";

export default function Test() {
  const [usersList, setUsers] = useState([]);

  const usersCollection = collection(db, "users");

  useEffect(() => {
    const getUsersList = async () => {
      try {
        const data = await getDocs(usersCollection);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setUsers(filteredData);
      } catch (err) {
        console.error(err);
      }
    };

    getUsersList();
  });



  return (
    <div>
      <div>
        <input placeholder="Name" />
        <input type="number" placeholder="Year of birth" />
        <input type="checkbox" />
        <label>Authorized user</label>
      </div>
      <div>
        {usersList.map((user) => (
          <ul key={user.id}>
            <li style={{ color: user.authorizedUser ? "green" : "red" }}>
              {user.fullName}
            </li>
            <li>{user.birthYear}</li>
            <li>{user.email}</li>
          </ul>
        ))}
      </div>
    </div>
  );
}
