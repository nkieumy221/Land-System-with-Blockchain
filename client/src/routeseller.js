import SellerDashboard from "./views/SellerDashboard";
import AddLand from "./views/AddLand";
import ApproveRequest from "./views/ApproveRequest";
import sellerProfile from "./views/sellerProfile";
import viewImage from "./views/viewImage";
import updateSeller from "./views/updateSeller";
import Help from "./Help";

var routes = [
  {
    path: "/SellerDashboard",
    name: "Home",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: SellerDashboard,
    layout: "/Seller",
  },
  {
    path: "/AddLand",
    name: "Thêm đất đai",
    rtlName: "الرموز",
    icon: "tim-icons icon-world",
    component: AddLand,
    layout: "/Seller",
  },
  {
    path: "/sellerProfile",
    name: "Cá nhân",
    rtlName: "الرموز",
    icon: "tim-icons icon-single-02",
    component: sellerProfile,
    layout: "/Seller",
  },
  {
    path: "/ApproveRequest",
    name: "Xác minh giao dịch",
    rtlName: "الرموز",
    icon: "tim-icons icon-badge",
    component: ApproveRequest,
    layout: "/Seller",
  },
  {
    path: "/updateSeller",
    name: "",
    rtlName: "الرموز",
    icon: "tim-icons",
    component: updateSeller,
    layout: "/Seller",
  },
];
export default routes;
