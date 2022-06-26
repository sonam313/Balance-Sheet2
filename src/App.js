import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import data from "./mock-data.json";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";
import { CSVLink } from "react-csv";

const headers = [
  { label: "Month", key: "month" },
  { label: "Item Name", key: "itemName" },
  { label: "Unit Price", key: "unitPrice" },
  { label: "Units Sold", key: "unitsSold" },
  { label: "Net Profit", key: "netProfit" }
];

const App = () => {
  const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    month: "",
    itemName: "",
    unitPrice: "",
    unitsSold: "",
    netProfit: ""
  });

  const csvReport = {
    filename: "Report.csv",
    headers: headers,
    data: contacts
  };

  const [editFormData, setEditFormData] = useState({
    month: "",
    itemName: "",
    unitPrice: "",
    unitsSold: "",
    netProfit: ""
  });

  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      month: addFormData.month,
      itemName: addFormData.itemName,
      unitPrice: addFormData.unitPrice,
      unitsSold: addFormData.unitsSold,
      netProfit: addFormData.netProfit
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      month: editFormData.month,
      itemName: editFormData.itemName,
      unitPrice: editFormData.unitPrice,
      unitsSold: editFormData.unitsSold,
      netProfit: editFormData.netProfit
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      month: contact.month,
      itemName: contact.itemName,
      unitPrice: contact.unitPrice,
      unitsSold: contact.unitsSold,
      netProfit: contact.netProfit
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === contactId);

    newContacts.splice(index, 1);

    setContacts(newContacts);
  };

  return (
    <>
      <div className="container ">
        <h1>Balance Sheet</h1>
        <div className="app-container">
          <form onSubmit={handleEditFormSubmit}>
            <table>
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Item Name</th>
                  <th>Unit Price</th>
                  <th>Units Sold</th>
                  <th>Net Profit</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <Fragment>
                    {editContactId === contact.id ? (
                      <EditableRow
                        editFormData={editFormData}
                        handleEditFormChange={handleEditFormChange}
                        handleCancelClick={handleCancelClick}
                      />
                    ) : (
                      <ReadOnlyRow
                        contact={contact}
                        handleEditClick={handleEditClick}
                        handleDeleteClick={handleDeleteClick}
                      />
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </form>
          <h3>
            <CSVLink {...csvReport} style={{ color: "Black" }}>
              Click here to Export CSV File
            </CSVLink>
          </h3>
          <h2>Add a new balance</h2>
          <div>
            <form onSubmit={handleAddFormSubmit}>
              <input
                type="text"
                name="month"
                required="required"
                placeholder="Enter month..."
                onChange={handleAddFormChange}
              />
              <input
                type="text"
                name="itemName"
                required="required"
                placeholder="Enter item name..."
                onChange={handleAddFormChange}
              />
              <input
                type="number"
                name="unitPrice"
                required="required"
                placeholder="Enter unit price of item..."
                onChange={handleAddFormChange}
              />
              <input
                type="number"
                name="unitsSold"
                required="required"
                placeholder="Enter units sold..."
                onChange={handleAddFormChange}
              />
              <input
                type="number"
                name="netProfit"
                required="required"
                placeholder="Enter net profit..."
                onChange={handleAddFormChange}
              />
              <button type="submit">Add</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
