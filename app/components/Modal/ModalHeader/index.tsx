import React from "react";

type ModalHeaderProps = {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

function ModalHeader({ setOpenModal }: ModalHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-5">
      <p className=" text-xl">Select Coins</p>
      <button className="text-xl mr-2" onClick={() => setOpenModal(false)}>
        x
      </button>
    </div>
  );
}

export default ModalHeader;
