const Filter = () => {
  return (
    <div className="flex px-6 py-3 border cursor-pointer border-border border-opacity-40 rounded-lg items-center justify-center text-sm">
      <label>
        <span>Filter By: </span>
        <select id="filter">
          <option value="Region">Region</option>
          <option value="Division">Division</option>
          <option value="Business Unit">Business Unit</option>
          <option value="Department">Department</option>
        </select>
      </label>
    </div>
  );
};

export default Filter;
