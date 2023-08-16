import matrix from "../assets/images/matrix.jpg";
const MatrixForm = () => {
  return (
    <div className="py-16 px-12 mb-12 flex items-center justify-center w-full h-screen overflow-y-auto max-h-[10000px]  ">
      <div className="w-full mt-4 h-full mb-4  ">
        <img src={matrix} alt="" />
      </div>
    </div>
  );
};

export default MatrixForm;
