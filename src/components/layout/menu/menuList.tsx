import { FC, useState } from "react";
import { MenuItem } from "../..";
import { MenuModel } from "../../../models";

export const MenuList: FC<{
  request: MenuModel[];
  isArabic: boolean;
}> = ({ request, isArabic }) => {
  return (
    <>
      {request.map((row, index) => {
        return (
          <MenuItem request={row} key={index} isArabic={isArabic || false} />
        );
      })}
    </>
  );
};
