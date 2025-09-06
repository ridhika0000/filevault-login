
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);

  // Get logged-in user
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Fetch Firestore data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "your-collection-name"));
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(items);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 flex flex-col items-center p-6">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">📊 Dashboard</h1>

        {user ? (
          <div className="flex flex-col items-center mb-6">
            <p className="text-lg text-gray-700">
              Welcome, <span className="font-semibold">{user.email}</span>
            </p>
            <button
              onClick={handleLogout}
              className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <p className="text-center text-gray-600">No user logged in</p>
        )}

        <h2 className="text-xl font-semibold text-gray-800 mb-4">📂 Data from Firestore:</h2>
        <ul className="space-y-3">
          {data.map((item) => (
            <li
              key={item.id}
              className="p-4 bg-gray-50 rounded-lg shadow hover:shadow-md transition text-gray-700"
            >
              {JSON.stringify(item)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
