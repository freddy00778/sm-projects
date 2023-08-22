import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface DisplayValuesProps {
  displayValues: string[];
  handleDeleteValue: (index: number) => void;
}

const DisplayValuesComponent: React.FC<DisplayValuesProps> = ({
  displayValues,
  handleDeleteValue,
}) => {
  return (
    <div className="flex flex-col w-full h-36 overflow-y-auto max-h-48 scrollbar-thin scrollbar-thumb-zinc-200">
      {displayValues?.map((value, index) => (
        <div
          key={index}
          className="flex w-[98%] rounded-lg items-center mt-2 px-6 py-4 bg-primary-50 justify-between bg-opacity-50"
        >
          <div className="mr-2">{value}</div>
          <button
            type="button"
            onClick={() => handleDeleteValue(index)}
            className="text-red-500"
          >
            {}
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default DisplayValuesComponent;
