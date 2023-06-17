import React, { useEffect, useState } from "react";
import { firebaseAppPromise } from "../../Firebase";
import { getDatabase, ref, onValue, off } from "firebase/database";
import CardItem from "../../Components/CardItem";
const IMAGE_URL = "https://image.tmdb.org/t/p/original";

export default function MyList() {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      try {
        const firebaseApp = await firebaseAppPromise;
        const database = getDatabase(firebaseApp);
        const userId = localStorage.getItem("uid");
        const favoriteRef = ref(database, `${userId}/list`);

        // Lắng nghe sự thay đổi dữ liệu từ Firebase
        onValue(favoriteRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            // Chuyển đổi dữ liệu từ object sang mảng
            const favoriteMoviesArray = Object.values(data);
            setFavoriteMovies(favoriteMoviesArray);
          } else {
            setFavoriteMovies([]);
          }
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchFavoriteMovies();

    // Hủy lắng nghe khi component unmount
    return () => {
      const firebaseApp = firebaseAppPromise._delegate?.promise;
      if (firebaseApp) {
        const database = getDatabase(firebaseApp);
        const userId = localStorage.getItem("uid");
        const favoriteRef = ref(database, `${userId}/list`);
        off(favoriteRef);
      }
    };
  }, []);

  return (
    <div className="container">
      <div className="row">
        <h2 style={{color: '#ffff', paddingTop: '100px'}} className="text-center">Danh sách phim yêu thích</h2>
      </div>
      <div className="row row-cols-2 row-cols-lg-4">
        {favoriteMovies.map((movie) => (
          <div className="col">
            <CardItem movie={movie}/>
          </div>
        ))}
      </div>
    </div>
  );
}
