type PortfolioHeaderProps = {
  handleDisplayModal: () => void;
};
function PortfolioHeader({ handleDisplayModal }: PortfolioHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl">Portfolio</h1>
      <button
        onClick={handleDisplayModal}
        className="px-20 rounded-xl py-4 bg-white"
      >
        Add Asset
      </button>
    </div>
  );
}

export default PortfolioHeader;
