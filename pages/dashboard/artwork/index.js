import { useEffect } from "react";
import * as Components from "../../../components";
import { useRouter } from "next/router";

function ArtworkDashboard() {
  const router = useRouter();
  useEffect(() => {
    router.push("/dashboard");
  }, []);
  return <Components.Loading />;
}

export default ArtworkDashboard;
