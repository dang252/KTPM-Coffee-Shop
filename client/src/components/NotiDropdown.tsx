import { Avatar, Dropdown, Badge } from "antd";
import type { MenuProps } from "antd";
import { UserOutlined, BellOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";

// interface PropType {
//   isDarkMode: boolean;
// }

const NotiDropdown = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnClick = (key: number) => {
    dispatch({
      type: "remove_notification",
      payload: {
        id: key
      }
    });
    console.log("items", items)
    navigate("/collections/all")
  }

  const notificationList = useSelector<RootState, any>(
    (state) => state.socket.notificationList
  );

  const notificationCount = useSelector<RootState, any>(
    (state) => state.socket.notificationCount
  );


  const items: MenuProps["items"] = notificationList.map((noti: any) => {
    return ({
      label: (
        <div className="p-2 rounded-md flex items-center justify-between hover:cursor-pointer" onClick={() => { handleOnClick(noti.id) }}>
          <div className="flex items-center">
            <div>
              <Avatar size={50} icon={<UserOutlined />} />
            </div>
            <div className="flex flex-col ml-3">
              <p className="text-sm leading-none mt-1">
                {noti.message}
              </p>
            </div>
          </div>
        </div>
      ),
      key: noti.id
    })
  })

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <Badge
        count={notificationCount}
        className="relative hover:cursor-pointer hover:text-blue-500"
      >
        <BellOutlined className="text-2xl" />
      </Badge>
    </Dropdown>
  );
};

export default NotiDropdown;
