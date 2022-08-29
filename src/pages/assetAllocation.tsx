import Layout from "../components/template/Layout";
import { useEffect } from "react";

import useAssetAllocation from "../hooks/useAssetAllocation";

export default function Settings() {
  const { user, getAll, handleGet, auth, wait, renderContent, renderLoading } =
    useAssetAllocation();

  useEffect(() => {
    if (user) {
      getAll();
      handleGet();
    }
  }, [auth.user]);

  return (
    <div
      className={`
    
    `}
    >
      <Layout
        title="Asset Allocation"
        subtitle="Defina o Asset Allocation da sua carteira e acompanhe a distribuição do seu capital"
      >
        {wait == true ? renderLoading() : renderContent()}
      </Layout>
    </div>
  );
}
