import Layout from "../components/Layout";
import ConnectWallet from "../components/ConnectWallet";

const IndexPage = () => (
  <Layout title="Om Labs Assignment">
    <h1 className="text-3xl md:text-5xl text-red-200 text-center">
      Polygon Connect Dapp
    </h1>
    <div className="mt-8">
      <ConnectWallet />
    </div>
  </Layout>
);

export default IndexPage;
