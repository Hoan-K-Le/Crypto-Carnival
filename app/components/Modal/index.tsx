import React from "react";

function Modal() {
  return (
    <div className="absolute rounded-xl top-1/2 left-1/2  -translate-x-2/4 -translate-y-1/3 backdrop-blur-sm h-screen w-screen flex items-center z-20 justify-center">
      <div className=" bg-white rounded shadow-md border p-8 z-20">
        <p className="mb-5 text-xl">Select Coins</p>
        <div className="flex gap-4">
          <div className="flex flex-col items-center gap-2 py-20 px-16 bg-[#6161D6] bg-opacity-40 rounded-xl shadow">
            <img
              src="https://placeholder.com/200/300"
              alt="placeholder"
              className="h-[50px] w-[50px]"
            />
            <p className="uppercase text-3xl text-white">bitcoin (btc)</p>
          </div>
          <div className="flex flex-col justify-between">
            <div className="flex flex-col gap-4">
              <div className=" py-2 px-24 border rounded-xl">
                <input type="text" placeholder="select Coin" />
              </div>
              <div className=" py-2 px-24 border rounded-xl">
                <input type="text" placeholder="Purchase Amount" />
              </div>
              <div className=" py-2 px-24 border rounded-xl">
                <input type="text" placeholder="Purchase Date" />
              </div>
            </div>
            <div className="flex items-center justify-between gap-2 ">
              <button className="w-full border p-2 shadow ">cancel</button>
              <button className="w-full p-2 shadow bg-[#6161D6] bg-opacity-50">
                save and continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
