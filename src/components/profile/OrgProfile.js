import React from "react";
import { useSelector } from "react-redux";
import { selectOrg, selectUser } from "../../Server/Reducer/authSlice";
import { BASE_URL } from "../../common/ConstaltsVariables";
import {
  useGetAllMenuQuery,
  useGetAllRollQuery,
} from "../../Server/Reducer/authApi";

const OrgProfile = () => {
  const userData = useSelector(selectUser);
  const orgData = useSelector(selectOrg);

  useGetAllMenuQuery(orgData?._id, {
    refetchOnMountOrArgChange: true,
    skip: !orgData?._id,
  });
  useGetAllRollQuery(
    { orgId: orgData?._id, orgtypeId: userData?.orgtype?._id },
    {
      refetchOnMountOrArgChange: true,
      skip: !orgData?._id,
    }
  );
  console.log(userData);

  return (
    <div className="card">
      <div className="card-header">
        <h6 className="text-center fw-bold">
          {`${userData?.Organization?.orgDisplayName} -
              ${userData?.Organization?.orgId}`}
        </h6>
      </div>
      <div className="profile_dets">
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-2">
              <div className="d-flex justify-content-center align-items-center">
                <img
                  src={`${BASE_URL}/image/${userData?.memberImage}`}
                  alt={userData?.memberImage}
                  className="img-thumbnail rounded mx-auto d-block"
                  width={100}
                />
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-3">
              <div className=" rounded mx-auto d-block">
                <p className="fw-bold text-light mt-2">
                  <span>User Name: {userData?.name}</span>
                </p>
                <p className="fw-bold text-light ">
                  <span>User Age: {userData?.age}</span>
                </p>
                <p className="fw-bold text-light">
                  <span>User Phone: {userData?.phoneNo}</span>
                </p>
                <p className="fw-bold text-light">
                  <span>User Email: {userData?.email}</span>
                </p>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-4">
              <div className=" rounded mx-auto d-block">
                <p className="fw-bold text-light mt-2">
                  <span>User Gender: {userData?.gender}</span>
                </p>
                <p className="fw-bold text-light">
                  <span>User Address: {userData?.userAddress}</span>
                </p>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-3">
              <div className=" rounded mx-auto d-block">
                <p className="fw-bold text-light mt-2">
                  <span>User Roll: {userData?.Roll?.rName}</span>
                </p>
                <p className="fw-bold text-light mt-2">
                  <span>User Id: {userData?.memberId}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgProfile;
