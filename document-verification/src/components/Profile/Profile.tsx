import React from "react";
import EmployeeManagement from "../../Contrcat/EmployeeManagement";
import "../../Contrcat/EmployeeManagement.css";

function Profile(): JSX.Element {
  return (
    <div className="profile">
      <div>
        <EmployeeManagement />
      </div>
    </div>
  );
}

export default Profile;
