import CustomModal from "../../CustomModal";
import cancel from "../../../assets/images/cancel.svg";
import { Event } from "../CalendarComponent";
import Table from "../../Table";
import lesson from "../../../assets/images/lessons-log.svg";
import { GetEventData } from "./EventDataMapping";

interface EventModalProps {
  event: Event;
  onClose: () => void;
}

const CustomChangeTable: React.FC<EventModalProps> = ({ event, onClose }) => {
  const { headings, data } = GetEventData(event.title);
  return (
    <CustomModal
      isOpen={true}
      size="lg"
      cancel={cancel}
      onClose={onClose}
      width={24}
    >
      <h2 className="text-primary-500 text-2xl">{event.title}</h2>
      <div className="flex flex-col w-full h-full py-10">
        <Table
          headings={headings}
          data={data}
          //addData={addData}
          children={
            <div className=" space-y-2">
              <img src={lesson} alt="lessons" width={200} />
              <h1 className="text-[18px]">No Data</h1>
            </div>
          }
        />
      </div>
    </CustomModal>
  );
};

export default CustomChangeTable;
