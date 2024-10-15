import React from "react";
import { useSelector } from "react-redux";
import {
  getOrgType,
  selectOrg,
  selectUser,
} from "../../Server/Reducer/authSlice";
import OrgProfile from "../../components/profile/OrgProfile";
import RollAccess from "../../components/profile/RollAccess";

const ProfileIndex = () => {
  const user = useSelector(selectUser);
  const org = useSelector(selectOrg);
  const orgType = useSelector(getOrgType);
  console.log(user, org, orgType);

  return (
    <div className="mb-5 p-2">
      <OrgProfile />
      <RollAccess />
    </div>
  );
};

export default ProfileIndex;
