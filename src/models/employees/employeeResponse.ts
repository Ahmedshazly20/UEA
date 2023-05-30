import {ValidationError} from "../validation/error";


export interface EmployeeResponse {
    ID:                     number;
    IsDefault:              boolean;
    IsActive:               boolean;
    Name:                   string;
    NameEn:                 string;
    Job:                    string;
    Address:                string;
    Mobile:                 string;
    Mail:                   string;
    Salary:                 number;
    Percentage_Of_Sales:    number;
    BirthDay:               Date;
    Errors:                 ValidationError[];
    rowState:               number;
    
    // MaritalStatus_ID:       number;
    // Religion_ID:            number;
    // Nationality_ID:         number;
    // JobPos_ID:              number;
    // Grade_ID:               number;
    // Dept_ID:                number;
    // SponsorID:              number;
    // LeavingRequest_ID:      number;
    // Bank_ID:                number;
    // EmpState_ID:            number;
    // AttenSchedule_ID:       number;
    // EmpNo:                  string;
    // PassportNo:             string;
    // VisaNo:                 string;
    // EntryNo:                string;
    // IqamaNo:                string;
    // BankIBAN:               string;
    // ImagePath:              string;
    // Note:                   string;
    // Employee_UniqueID:      string;
    // Gender:                 boolean;
    // HireDate:               Date;
    // MedicalInsuranceExpiry: Date;
    // PassportExpiry:         Date;
    // VisaExpiry:             Date;
    // IqamaIssuDate:          Date;
    // IqamaExpiry:            Date;
    // LeavingDate:            Date;
    // ModifcationDate:        Date;
    // CreatedBy:              number;
    // ModifiedBy:             number;
    // CreationDate:           Date;
    // ModificationDate:       Date;
    // VerifyOnUpdate:         boolean;
    // rowState:               number;
}

export interface SaveEmployeeRequest {
    ID:                     number;
    IsDefault:              boolean;
    IsActive:               boolean;
    Name:                   string;
    NameEn:                 string;
    Job:                    string;
    Address:                string;
    Mobile:                 string;
    Mail:                   string;
    Salary:                 number;
    Percentage_Of_Sales:    number;
    BirthDay:               Date;
}

export interface EmployeeDeleteResponse {
    Errors: ValidationError[];
    Result: {
        Result: boolean;
        Errors: ValidationError[];
    };
    Status: number;
}