import React, { FC } from "react";
export const LayoutFooter: FC<any> = () => {
  return (
    <div className="footer">
      {`Copyright © ${new Date().getFullYear()} Alyuser - All Right Reserved`}
    </div>
  );
};
