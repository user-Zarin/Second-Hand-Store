import { React, useContext, useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import { UserContext } from "../context/User";
const UserInfo = () => {
  const [change, setChange] = useState(false);
  const { input, setInput } = useContext(UserContext);
  const handleEditToggle = () => {
    setChange(!change);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setChange(false);
  };
  return (
    <div className="m-5 mt-8 text-gray-800 space-y-4">
      {["name", "email", "contact", "address", "city", "pincode"].map(
        (field) => (
          <div key={field}>
            <h2 className="text-lg font-semibold capitalize">{field}</h2>
            {change ? (
              <input
                type="text"
                name={field}
                value={input[field]}
                onChange={handleInputChange}
                className="border p-2 rounded w-full"
              />
            ) : (
              <h3 className="text-gray-600">{input[field]}</h3>
            )}
          </div>
        )
      )}
      {/* Toggle Edit/Save */}
      <div className="flex justify-end mt-4">
        {change ? (
          <DoneIcon
            className="cursor-pointer text-green-500"
            onClick={handleSave}
          />
        ) : (
          <EditIcon
            className="cursor-pointer text-blue-500"
            onClick={handleEditToggle}
          />
        )}
      </div>
    </div>
  );
};

export default UserInfo;
