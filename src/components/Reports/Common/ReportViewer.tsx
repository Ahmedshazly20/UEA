import React, {FC} from 'react';
import {PdfViewer} from "../../common/pdfViewer/pdfViewer";
import {getLabelName} from "../../../utils";

export const ReportViewer: FC<{
    content: string;
    errors: string
}> = ({content, errors}) => {
    return (
        <>
            {content !== undefined && content !== null && content !== '' &&
                <PdfViewer content={content}/>
            }
            {
                (content === undefined || content === '' || content === null) &&
                <div className="card text-center">
                    <div className="card-header">
                        {getLabelName("Report Viewer")}
                    </div>
                    <div className="card-body">
                        {(errors === undefined || errors === '' )&&
                            <>
                                <h5 className="card-title">{getLabelName("No Report to Show")}</h5>
                                <p className="card-text">{getLabelName("Kindly select search criteria and click Search to show the report")}</p>
                            </>
                        }
                        { errors !== '' && errors !==undefined &&  errors !== null &&
                            <>
                                <h5 className="card-title">{getLabelName("Error")}</h5>
                                <p className="card-text">{errors}</p>
                            </>
                            
                        }
                    </div>

                </div>
            }
        </>
    );
};