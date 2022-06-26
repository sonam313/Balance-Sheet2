import React from "react";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick
}) => {
  return (
    <tr>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter the month..."
          name="month"
          value={editFormData.month}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter item name..."
          name="itemName"
          value={editFormData.itemName}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="number"
          required="required"
          placeholder="Enter unit price..."
          name="unitPrice"
          value={editFormData.unitPrice}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="number"
          required="required"
          placeholder="unitsSold..."
          name="unitsSold"
          value={editFormData.unitsSold}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="number"
          required="required"
          placeholder="netProfit..."
          name="netProfit"
          value={editFormData.netProfit}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;
