import React from "react";
import { Link } from "react-router-dom";

// THIS IS THE DEAL PORTAL PAGE IN NAVBAR

const DealPortalRoute = () => {
  return (
    <div className="h-screen flex justify-center content-center">
      <div className="text-xl font-medium mt-auto mb-auto">
        While Tombolo is in beta version,
        <p className="break-after-colum">we will handle your deals manually.</p>
        Please fill in the
        <Link to={""} className="text-[#5299E0] underline underline-offset-4">
          {" "}
          deal request form
        </Link>{" "}
        and
        <p className="break-after-colum">we will get in touch shortly.</p>
      </div>
    </div>
  );
};
export default DealPortalRoute;
