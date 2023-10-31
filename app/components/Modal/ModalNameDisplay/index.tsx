import React from "react";

function ModalNameDisplay({ name }: { name: string }) {
  return (
    <div className="flex flex-col items-center w-5/12 gap-2 py-20 px-16 bg-[#6161D6] bg-opacity-40 rounded-xl shadow">
      <img
        src={
          "https://upload.wikimedia.org/wikipedia/commons/d/d6/Gold_coin_icon.png"
        }
        alt="placeholder"
        className="h-[60px] w-[60px] block"
      />
      <div className="flex items-center gap-2 mt-4">
        <p className="uppercase text-3xl text-white">{name}</p>
      </div>
    </div>
  );
}

export default ModalNameDisplay;
