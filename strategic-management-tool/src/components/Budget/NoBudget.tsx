import budget from "../../assets/images/no-budget.svg";

const NoBudget = () => {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <img src={budget} alt="" width={300} />
      <h1 className=" text-2xl"> No Budget</h1>
    </div>
  );
};

export default NoBudget;
