import Header from "../../components/Header";
import avatar from "../../assets/images/avatar.jpg";
import BudgetLayout from "../../components/Budget/BudgetLayout";
const Budget = () => {
  return (
    <div className="flex flex-col w-full h-screen space-y-6">
      <Header backgroundImage={avatar} className="h/14">
        <h1 className="text-primary-500 text-[28px] font-normal">Budget</h1>
      </Header>
      <div className="px-7 h-3/4">
        <BudgetLayout />
      </div>
    </div>
  );
};

export default Budget;
