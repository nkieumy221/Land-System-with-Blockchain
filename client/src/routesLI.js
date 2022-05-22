import LIDashboard from "./views/LIDashboard";
import ApproveTransaction from "./views/ApproveTransaction";
import BuyerInfo from "./views/BuyerInfo";
import SellerInfo from "./views/SellerInfo";
import TransactionInfo from "./views/TransactionInfo";

var routes = [
  {
    path: "/LIDashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: LIDashboard,
    layout: "/LI",
  },
  {
    path: "/BuyerInfo",
    name: "Thông tin người dùng",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-single-02",
    component: BuyerInfo,
    layout: "/LI",
  },
  {
    path: "/SellerInfo",
    name: "Thông tin người bán",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-single-02",
    component: SellerInfo,
    layout: "/LI",
  },
  {
    path: "/TransactionInfo",
    name: "Giao dịch",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-send",
    component: TransactionInfo,
    layout: "/LI",
  },
];
export default routes;
