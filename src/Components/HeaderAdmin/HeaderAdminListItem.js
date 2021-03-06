import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as SiIcons from "react-icons/si";

export const HeaderAdminListItems = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <FaIcons.FaHome />,
    cName: "headerAdmin__links",
  },
  {
    title: "Users",
    path: "/manage-user",
    icon: <FaIcons.FaUserAlt />,
    cName: "headerAdmin__links",
  },
  {
    title: "Message",
    path: "#",
    icon: <AiIcons.AiFillMessage />,
    cName: "headerAdmin__links",
  },
  {
    title: "Support",
    path: "#",
    icon: <BiIcons.BiSupport />,
    cName: "headerAdmin__links",
  },
  {
    title: "Analytics",
    path: "#",
    icon: <SiIcons.SiGoogleanalytics />,
    cName: "headerAdmin__links",
  },
];
