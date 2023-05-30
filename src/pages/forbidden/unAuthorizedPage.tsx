import { FC } from "react";

export const UnAuthorizedPage: FC<{}> = () => {
  return (
    <>
      {/* we need to add page with image */}
      <p>
        Un Authorized request please re-login again or you don't have
        premissions to access page
      </p>
    </>
  );
};
