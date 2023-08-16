import Header from "../../components/Header";
import avatar from "../../assets/images/avatar.jpg";
import KeyDatesLayout from "../../components/KeyDates/KeyDatesLayout";

const KeyDates = () => {
  return (
    <div className="flex flex-col w-full h-screen space-y-6">
      <Header backgroundImage={avatar} className="h/14">
        <h1 className="text-primary-500 text-[28px] font-normal">Key Dates</h1>
      </Header>
      <div className="px-7 py-6 h-3/4">
        <KeyDatesLayout />
      </div>
    </div>
  );
};

export default KeyDates;
