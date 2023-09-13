import React, { useEffect, useState } from "react";
import "./Home.css";
import Cart from "../Cart/Cart";

const Home = () => {
  const [allActors, setAllActors] = useState([]);
  const [selectedActors, setSelectedActors] = useState([]);

  useEffect(() => {
    fetch("./data.json")
      .then((res) => res.json())
      .then((data) => setAllActors(data));
  }, []);

  const handleSelectActor = (actor) => {
    setSelectedActors([...selectedActors, actor]);
  };
  console.log(selectedActors);
  return (
    <div>
      <div className="home-container flex">
        <div className="w-3/4 flex flex-wrap gap-10">
          {allActors.map((actor) => (
            <div
              key={actor.id}
              className="w-96 bg-red-100 rounded-lg shadow-lg p-6"
            >
              <div className="flex justify-center mb-4">
                <img
                  className="w-24 h-24 rounded-full"
                  src={actor.image}
                  alt=""
                />
              </div>
              <h2 className="text-2xl font-bold text-center text-orange-400 mb-2">
                {actor.name}
              </h2>
              <p className="text-xl text-center mb-4">
                <small>{actor.description}</small>
              </p>
              <div className="flex justify-between mb-4">
                <p className="text-lg font-bold text-green-600 mr-2">
                  Salary: {actor.salary} $
                </p>
                <p className="text-lg text-gray-600 font-semibold">
                  {actor.role}
                </p>
              </div>
              <button
                onClick={() => handleSelectActor(actor)}
                className="mx-auto bg-green-500 text-white px-6 py-2 rounded-lg"
              >
                Select
              </button>
            </div>
          ))}
        </div>
        <div className="w-1/4">
          <Cart selectedActors={selectedActors}></Cart>
        </div>
      </div>
    </div>
  );
};

export default Home;
