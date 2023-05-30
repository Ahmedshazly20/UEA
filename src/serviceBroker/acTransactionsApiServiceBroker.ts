import AlYusrAxiosApiInstance, {AxiosSearchParams} from "../axios/alYusrAxiosApiInstance";
import {AcTransaction, GeneralPrintResponse, ResponseBase, SearchAcTransactionRequest} from "../models";
import {AcTransactionDeleteResponse,AcTransactionSearch} from "../models/AcTransaction/AcTransaction";


export const SearchAcTransactionTreasury = async (request: SearchAcTransactionRequest): Promise<ResponseBase<AcTransactionSearch[]>> => {
    return await AlYusrAxiosApiInstance.get('SearchAcTransactionTreasury', {params: AxiosSearchParams(request,'searchItem')});
};

export const SaveAcTransaction = async (request: AcTransaction): Promise<ResponseBase<AcTransaction>> => {
    const url: string = `SaveAcTransaction`;
    return await AlYusrAxiosApiInstance.post(url, request)
}

export const SelectAcTransaction = async (id: number): Promise<ResponseBase<AcTransaction>> => {
    const url: string = `GetAcTrnsactionByID?id=${id}`;
    return await AlYusrAxiosApiInstance.get(url);
}

export const DeleteAcTransaction = async (
    id: number, userId: number
): Promise<AcTransactionDeleteResponse> => {
    let apiResponse: AcTransactionDeleteResponse = {
        Errors: [],
        Result: {
            Result: false,
            Errors: [],
        },
        Status: 0,
    };
    try {
        let url: string = `DeleteAcTransaction?id=${id}&userId=${userId}`;
        apiResponse = await AlYusrAxiosApiInstance.post(url);
        return apiResponse;
    } catch (err) {
        alert(err);
    }
    return apiResponse;
}

export const PrintAcTransaction=async (
    id:number
):Promise<ResponseBase<GeneralPrintResponse>> =>{
    let url: string = `PrintAcTransactionTreasury?transactionId=${id}`;
    return await AlYusrAxiosApiInstance.get(url);
}
