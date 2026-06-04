const AddEntryForm = () => {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <h4>Add Entry</h4>

        <form>
          <div className="mb-3">
            <label className="form-label">
              Description
            </label>
            <input
              className="form-control"
              type="text"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Date
            </label>
            <input
              className="form-control"
              type="date"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEntryForm;