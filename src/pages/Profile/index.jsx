import { getDatabase } from "firebase/database";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import app from "../../Firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Profile() {
  const userId = localStorage.getItem("uid");
  const db = getFirestore(app);
  const auth = getAuth();
  const user = auth.currentUser;
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserData(user);
      } else {
        return;
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth, user]);

  const fetchUserData = async () => {
    try {
      const q = query(
        collection(db, "users"),
        where("email", "==", user.email)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUserData(doc.data());
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container" style={{ paddingTop: "100px" }}>
      <form action="" className="profile" style={{ color: "white" }}>
        <h1 className="text-center mb-5">Thông tin tài khoản</h1>
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-md-6 col-xl-3">
            <div className="mb-3">
              <label htmlFor="" className="form-label">
                Tên người dùng
              </label>
              <input
                type="text"
                className="form-control"
                value={userData && userData.userName}
                style={{
                  background: "#333",
                  border: "none",
                  outline: "none",
                  boxShadow: "none",
                  borderBottom: "1px solid orange",
                  color: "white",
                }}
              />
            </div>
          </div>
        </div>
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-md-6 col-xl-3">
            <div className="mb-3">
              <label htmlFor="" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                value={userData && userData.email}
                style={{
                  background: "#333",
                  border: "none",
                  outline: "none",
                  boxShadow: "none",
                  borderBottom: "1px solid orange",
                  color: "white",
                }}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
