import React, { useEffect, useState } from "react";
import "./Home.css";
import Cart from "../Cart/Cart";
import Swal from "sweetalert2";

const Home = () => {
  const [allActors, setAllActors] = useState([]);
  const [selectedActors, setSelectedActors] = useState([]);
  const [remaining, setRemaining] = useState(30000);
  const [totalCost, setTotalCost] = useState(0);
  const [budget, setBudget] = useState(30000);

  // const budget = 30000;

  useEffect(() => {
    fetch("./data.json")
      .then((res) => res.json())
      .then((data) => setAllActors(data));
  }, []);

  const handleSelectActor = (actor) => {
    const isExist = selectedActors.find((item) => item.id === actor.id);
    // console.log(isExist);
    let count = actor.salary;
    if (isExist) {
      return Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "This actor is already selected!",
      });
    } else {
      selectedActors.forEach((item) => {
        count += item.salary;
      });
      const totalRemaining = budget - count;
      setTotalCost(count);
      if (count > budget) {
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You have out of your budget!",
        });
      }

      setRemaining(totalRemaining);
      // console.log(remaining);

      setSelectedActors([...selectedActors, actor]);
    }
  };
  // console.log(selectedActors);

  // remove actor function
  const handleRemoveActor = (actorId) => {
    const removeSelectedActors = selectedActors.filter(
      (actor) => actor.id != actorId
    );
    setSelectedActors(removeSelectedActors);

    const newTotalCost = removeSelectedActors.reduce(
      (total, actor) => total + actor.salary,
      0
    );

    const newRemaining = budget - newTotalCost;

    setSelectedActors(removeSelectedActors);
    setTotalCost(newTotalCost);
    setRemaining(newRemaining);
  };
  return (
    <div>
      <div className="home-container flex flex-col md:flex-row max-w-7xl mx-auto px-4 md:px-0 text-center gap-4">
        <div className="md:w-3/4 flex flex-wrap  md:gap-10 gap-4 order-2 lg:order-1">
          {allActors.map((actor) => (
            <div
              key={actor.id}
              className="md:w-96 w-full bg-gray-200	rounded-lg shadow-lg p-6"
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
        <div className="md:w-1/4 order-1 lg:order-2">
          <Cart
            budget={budget}
            selectedActors={selectedActors}
            remaining={remaining}
            totalCost={totalCost}
            handleRemoveActor={handleRemoveActor}
          ></Cart>
        </div>
      </div>
    </div>
  );
};

export default Home;
