import "../styles/PageLoader.css";

const PageLoader = () => {
  return (
    <div className="page-loader">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

export default PageLoader;