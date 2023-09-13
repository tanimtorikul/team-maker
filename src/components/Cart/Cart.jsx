import React from "react";

const Cart = ({ selectedActors, remaining, totalCost, budget, handleRemoveActor }) => {
  return (
    <div className="bg-gray-400 p-4 rounded-lg">
      <h1 className="text-2xl text-white mb-4">
        Selected Actors: {selectedActors.length}
      </h1>
      <h1 className="text-2xl text-white mb-4">
        Total Budget: {budget} $
      </h1>
      <h1 className="text-xl text-white mb-4">
        Remaining Balance: {remaining} $
      </h1>
      <h1 className="text-xl text-white mb-4">
        Total Cost: {totalCost} $
      </h1>

      <div className="grid gap-4">
        {selectedActors.map((actor) => (
          <div
            key={actor.id}
            className="bg-gray-800 p-4 rounded-md shadow-lg flex items-center justify-between"
          >
            <div className="flex items-center">
              <img
                className="w-16 h-16 rounded-full object-cover mr-4"
                src={actor.image}
                alt=""
              />
              <h2 className="text-white text-lg">{actor.name}</h2>
            </div>
            <button onClick={()=>handleRemoveActor(actor.id)} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700">
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
