import React from "react";

const Preloader: React.FC = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-orange-500">

      <iframe src="https://lottie.host/embed/23310b9f-3367-4fea-8a59-3e12dc7b7619/tMhxGQdIlF.lottie"
      className="bg-black w-full h-full"
      ></iframe>
    </div>
  );
};

export default Preloader;
