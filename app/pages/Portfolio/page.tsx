import ProgressBar from "@/app/utilities/progressBar";

export default function Portfolio() {
  return (
    <div className="py-10 px-52">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl">Portfolio</h1>
        <button className="px-20 rounded-xl py-4 bg-white">Add Asset</button>
      </div>
      <div className="flex flex-col gap-4 mt-10">
        <div className="w-full p-6 rounded-xl flex bg-white shadow">
          {/* beg left side */}
          <div className="w-5/12 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <img
                src="https://placeholder.com/200/300"
                alt="placeholder"
                className="h-[40px] w-[40px]"
              />
              <span className="text-2xl uppercase">Bitcoin (BTC)</span>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-[#888]">Total Volume</p>
              <div className="flex items-center gap-2">
                <span className="text-3xl">$29,850 USD</span>
                <span className="text-lg">6.76%</span>
              </div>
              <p className="text-sm text-[#888]">Purchased 03.23.2023</p>
            </div>
          </div>
          {/* end of left side */}
          <div className="w-7/12 flex gap-2">
            <div className="flex flex-col gap-4 w-full">
              <div className="border p-2">
                <p className="text-xl">$29,850</p>
                <p className="text-[#888] text-sm">current Price</p>
              </div>
              <div className="border  p-2">
                <div className="flex items-center gap-2 ">
                  <p className="text-xl">44%</p>
                  <ProgressBar data={20} changeBgColor={"bg-[#01F1E3]"} />
                </div>
                <p className="text-[#888] text-sm">Market cap vs volume</p>
              </div>
            </div>
            <div className="w-full">
              <div className="flex flex-col gap-4">
                <div className="border p-2">
                  <p className="text-xl">$29,850</p>
                  <p className="text-[#888] text-sm">current Price</p>
                </div>
                <div className="border p-2">
                  <div className="flex items-center gap-2 ">
                    <p className="text-xl">44%</p>
                  </div>
                  <p className="text-[#888] text-sm">Market cap vs volume</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
