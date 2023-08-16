import Header from "../../components/Header";
import avatar from "../../assets/images/avatar.jpg";
import ExecutiveKeyDateComponent from "../../components/Executive/ExecutiveKeyDateComponent";

const ExecutiveKeyDate = () => {
  return (
    <div className="flex flex-col w-full h-screen">
      <Header backgroundImage={avatar} className="h-1/4">
        <h1 className=" text-primary-500">Key Dates</h1>
      </Header>
      <div className="flex-grow overflow-hidden h-3/4 p-7 space-y-8">
        <div className="grid grid-rows-auto gap-y-10 h-full overflow-y-auto scrollbar-none">
          <ExecutiveKeyDateComponent />
          {/* You can add more components here and they will take up equal space and scroll if needed */}
        </div>
      </div>
    </div>
  );
};

export default ExecutiveKeyDate;
