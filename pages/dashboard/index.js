//import axios from "axios";
import React from "react";
import * as Chakra from "@chakra-ui/react";

import * as Components from "../../components";
import { artworks_mock } from "../../helpers/mocks/layouts_mock/Artworks_mock";
import { AdminLayout } from "../../layouts";
//import * as Chakra from "@chakra-ui/react";

function Dashboard() {
  return <div>Bienvenido al Dashboard</div>;
}

export default Dashboard;

Dashboard.getLayout = function PageLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
