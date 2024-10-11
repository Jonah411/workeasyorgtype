import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { getRollList, selectRoll } from "../../Server/Reducer/authSlice";

const SideBar = ({ showSidebar }) => {
  //   const rollData = useSelector(selectRoll);
  //   const rollList = useSelector(getRollList);
  //   const [menuList, setMenuList] = useState([]);

  //   useEffect(() => {
  //     const newRoll = rollList?.find((li) => li?._id === rollData?._id);
  //     setMenuList(newRoll?.rMenu);
  //   }, [rollList, rollData]);

  return (
    <div className={`sidebar ${showSidebar ? "show" : ""}`}>
      <Nav className="flex-column custom-nav">
        <NavLink
          to="/app/profile"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          Profile
        </NavLink>
        {/* {menuList?.map((menu) => (
          <NavLink
            hidden={menu?.mLocationPath === "/app/members_group"}
            key={menu?._id}
            to={menu?.mLocationPath}
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            {menu?.mName}
          </NavLink>
        ))} */}
      </Nav>
    </div>
  );
};

export default SideBar;
