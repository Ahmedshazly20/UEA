import React, { FC } from "react";
import { Spinner } from "react-bootstrap";

export const LoadingBox: FC<{}> = () => {
  return (
    <>
      {/* <div>
        <div>
          <div role="status">
            <Spinner animation="border" variant="primary" />
            <Spinner animation="border" variant="primary" />
            <Spinner animation="border" variant="primary" />
            <Spinner animation="border" variant="primary" />
            <Spinner animation="border" variant="primary" />
            <Spinner animation="border" variant="primary" />
          </div>
        </div>
      </div>
      <div className="text-center py-5" id="backdrop"></div> */}
      <div id="preloader"><div id="status"><div className="spinner"></div></div></div>
    </>
  );
};
