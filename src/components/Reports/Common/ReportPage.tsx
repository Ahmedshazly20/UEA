import React, {FC, PropsWithChildren, ReactElement, ReactNode, useState} from "react";
import {GeneralPrintResponse, ResponseBase, SearchPanelProps, TransactionReportSearchParams} from "../../../models";
import {getLabelName, isArabicCurrentLanguage} from "../../../utils";
import {LoadingBox} from "../../box/loadingBox";
import {ReportViewer} from "./ReportViewer";


interface ReportPageProps<T> {
    InitialState: T;
    SearchApi: (request: T) => Promise<ResponseBase<GeneralPrintResponse>>;
    searchHeader:string;
    searchPanel:FC<SearchPanelProps<T>>
}


export const ReportPage = <T extends object>(props: PropsWithChildren<ReportPageProps<T>>): ReactElement => {
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState('');
    const [searchParams, setSearchParams] = useState<T>(props.InitialState);

    const handelSearch = async () => {
        setLoading(true);
        const response = await props.SearchApi(searchParams);
        if (response !== undefined && response.Result !== null && response.Result !== undefined) {
            setContent(response.Result.BillFilePdf);
            if (response.Errors != undefined && response.Errors.length > 0) {
                setErrors(isArabicCurrentLanguage() ? response.Errors.map(e => e.MessageAr).join(',') : response.Errors.map(e => e.MessageEn).join(','));
            }
        }
        setLoading(false);
    };
   
    return (
        <>
            {loading && <LoadingBox/>}
            <props.searchPanel searchHeader={getLabelName(props.searchHeader)} handelSearch={handelSearch} searchParams={searchParams} setSearchParams={setSearchParams} setLoading={setLoading}/>
            <ReportViewer content={content} errors={errors}/>
        </>
    )
}