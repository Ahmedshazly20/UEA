import { FC, useState } from "react";
import { Navbar, NavDropdown } from "react-bootstrap";
import { MenuModel } from "../../../models/menu/menu";
export const MenuItem: FC<{
  request: MenuModel;
  isArabic: boolean;
}> = ({ request, isArabic = false }) => {
  const isparent: boolean =
    request.ChildBusinessObject !== null &&
    request.ChildBusinessObject.length !== 0
      ? true
      : false;
  if (isparent) {
    return (
      <>
        {/* <Navbar bg="dark" expand="lg"> */}
        {/* <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${false}`} /> */}
        <NavDropdown
          as="li"
          title={isArabic ? request.ArabicName : request.Name}
          id={`nav-dropdown-obj-${request.ID}`}
        >
          {request.ChildBusinessObject.map((row, index) => {
            return <MenuItem request={row} key={index} isArabic={isArabic} />; //<MenuItem request={row} key={index} isArabic={isArabic} />;
          })}
        </NavDropdown>
        {/* </Navbar> */}
      </>
    );
  } else {
    return (
      <NavDropdown.Item
        // className="btn btn-dark"
        id={`nav-dropdown-item-${request.ID}`}
        href={request.WebUrl != null ? request.WebUrl : "/404"}
      >
        {isArabic ? request.ArabicName : request.Name}
      </NavDropdown.Item>
    );
  }
  return null;
};

// import { FC, useState } from "react";
// import { Button, Collapse, NavDropdown } from "react-bootstrap";
// import { MenuModel } from "../../../models/menu/menu";

// export const MenuItem: FC<{
//   request: MenuModel;
//   isArabic: boolean;
// }> = ({ request, isArabic = false }) => {
//   const isparent: boolean =
//     request.ChildBusinessObject !== null &&
//     request.ChildBusinessObject.length !== 0
//       ? true
//       : false;
//   const [open, setOpen] = useState(false);
//   if (isparent) {
//     return (
//       <>
//         <Button
//           variant="light"
//           //id={`nav-dropdown-${request.ID}`}
//           onClick={() => setOpen(!open)}
//           aria-controls={`nav-dropdown-${request.ID}`}
//           aria-expanded={open}
//         >
//           {isArabic ? request.ArabicName : request.Name}
//         </Button>
//         <Collapse in={open}>
//           <div id={`nav-dropdown-${request.ID}`}>
//             {request.ChildBusinessObject.map((row, index) => {
//               return <MenuItem request={row} key={index} isArabic={isArabic} />;
//             })}
//           </div>
//         </Collapse>
//       </>
//     );
//   } else {
//     //const route = routes.filter((p) => p.id === request.ID)[0];
//     return (
//       <NavDropdown.Item
//         className="btn btn-light"
//         id={`nav-dropdown-item-${request.ID}`}
//         href={request.WebUrl != null ? request.WebUrl : "/404"} //undefined
//       >
//         {isArabic ? request.ArabicName : request.Name}
//       </NavDropdown.Item>
//     );
//   }
//   return null;
// };
