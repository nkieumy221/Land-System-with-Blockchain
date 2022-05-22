import buyerProfile from "./views/buyerProfile";
import Dashboard from "./views/Dashboard";
import viewImage from "./views/viewImage";
import OwnedLands from "./views/OwnedLands";
import MakePayment from "./views/MakePayment";
import updateBuyer from "./views/updateBuyer";
import Help from "./Help";

var routes = [
  {
    path: "/dashboard",
    name: "Home",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/buyerProfile",
    name: "Cá nhân",
    rtlName: "الرموز",
    icon: "tim-icons icon-single-02",
    component: buyerProfile,
    layout: "/admin",
  },
  {
    path: "/MakePayment",
    name: "Thanh toán",
    rtlName: "الرموز",
    icon: "tim-icons icon-money-coins",
    component: MakePayment,
    layout: "/admin",
  },
  {
    path: "/OwnedLands",
    name: "Đất sở hữu",
    rtlName: "الرموز",
    icon: "tim-icons icon-bank",
    component: OwnedLands,
    layout: "/admin",
  },
  {
    path: "/updateBuyer",
    name: "",
    rtlName: "الرموز",
    icon: "tim-icons",
    component: updateBuyer,
    layout: "/admin",
  },
];
export default routes;
