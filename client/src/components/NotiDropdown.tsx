import { Avatar, Dropdown, Badge } from "antd";
import type { MenuProps } from "antd";
import { UserOutlined, BellOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

// interface PropType {
//   isDarkMode: boolean;
// }

const NotiDropdown = () => {

  const notificationList = useSelector<RootState, any>(
    (state) => state.socket.notificationList
  );
  const items: MenuProps["items"] = notificationList.map((noti: any, index: any) => {
    return ({
      label: (
        <div className="p-2 rounded-md flex items-center justify-between hover:cursor-pointer">
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
      key: index
    })
  })

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <Badge
        count={notificationList.length}
        className="relative hover:cursor-pointer hover:text-blue-500"
      >
        <BellOutlined className="text-2xl" />
      </Badge>
    </Dropdown>
  );
};

export default NotiDropdown;
