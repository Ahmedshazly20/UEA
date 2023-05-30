import React from 'react';
import {Button, Tooltip} from "react-bootstrap";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import {BsPrefixRefForwardingComponent} from "react-bootstrap/helpers";
import {ButtonProps} from "react-bootstrap/Button";
import {FaEdit} from "react-icons/fa";
import {MdDelete} from "react-icons/md";
import {ImPrinter} from "react-icons/im";
import {getLabelName} from "../../../utils";

export interface ActionButtonProps extends ButtonProps {
    commandType: 'Edit' | 'Delete' | 'Print'
}

export const ActionButton: BsPrefixRefForwardingComponent<'button', ActionButtonProps> = (props) => {

    const renderIcon = () => {
        return (
            <>
                {props.commandType === 'Edit' && <FaEdit/>}
                {props.commandType === 'Delete' && <MdDelete/>}
                {props.commandType === 'Print' && <ImPrinter/>}
            </>
        );
    }
   const tooltip = getLabelName(props.commandType);
    const variant =()=>{
        switch (props.commandType) {
            case "Edit":
                return "primary";
            case "Delete":
                return "danger";
            case "Print":
                return "info"
        }
    } ;
    return ( 
        <>
            <OverlayTrigger
                placement="auto"
                delay={{show: 250, hide: 400}}
                overlay={(tooltipProps)=>{return(
                    <Tooltip id="button-tooltip" {...tooltipProps}>
                        {tooltip}
                    </Tooltip>
                )
                }}
                defaultShow={false} >
                <Button className="xs" variant={variant()} {...props as ButtonProps}>
                    {renderIcon()}

                </Button>
            </OverlayTrigger>

        </>
    )
};