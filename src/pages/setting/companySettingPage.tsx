import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ToastBox } from "../../components";
import { LoadingBox } from "../../components/box/loadingBox";
import TabView from "../../components/common/tabView/TabView";
import { CompanySettingDetails } from "../../components/setting";
import { ElectronicBillSetting } from "../../components/setting/electronicBillSetting";
import { LoyaltySetting } from "../../components/setting/loyaltySetting";
import { ElectronicBillSettingModel, LoyaltySettingModel, ToastModel } from "../../models";
import { CompanySetting } from "../../models/company/companySetting";
import { getActiveVouchersSettings, getCompanySetting, getEgypteInvoiceSettings } from "../../serviceBroker/companySettingApiServiceBroker";

export const CompanySettingPage: FC<{}> = () => {
  //#region state
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [showToastModel, setShowToastModel] = useState(false);
  const [setting, setSetting] = useState<CompanySetting | null>();
  const [loyaltySetting, setLoyaltySetting] = useState<LoyaltySettingModel | null>();
  const [electronicBillSetting, setElectronicBillSetting] = useState<ElectronicBillSettingModel | null>();
  const [toastModel, setToastModel] = useState<ToastModel>({
    show: false,
    body: "process completed successfully",
    variant: "Success",
  });
  //#endregion
  //#region useEffect
  useEffect( () => {
    const fillData = async () => {
      await getSetting();
    };
    fillData();
  }, []);
  //#endregion
  //#region function
  const getSetting = async () => {
    setLoading(true);
   // alert("before")
  
    const settingDetails = await getCompanySetting();

    setSetting(settingDetails);
   // alert("after")
    const loyaltySettings = await getActiveVouchersSettings();
    setLoyaltySetting(loyaltySettings);
    const electronicBillSetting = await getEgypteInvoiceSettings();
    setElectronicBillSetting(electronicBillSetting);
    setLoading(false);
  };
  //#endregion
  return (
    <>
      {loading && <LoadingBox />}
      {showToastModel && (
        <ToastBox
          isShown={showToastModel}
          header={toastModel.Header}
          body={toastModel.body}
          variant={toastModel.variant}
          delayDuration={toastModel.delayDuration}
          onCloseEvent={() => {
            setShowToastModel(false);
          }}
        />
      )}
      {setting&&(
     <TabView
            tabs={[
              { name: t("CompanySettingDetails"), content: <CompanySettingDetails request={setting} onComplete={(e:any)=>{
                if(e==true){
                setShowToastModel(true);
              }
                getSetting()
              }}/>,   },
              { name: t("LoyaltySetting"), content: <LoyaltySetting request={loyaltySetting} onComplete={(e:any)=>{
                if(e==true){
                setShowToastModel(true);
              }
                getSetting()
              }}/> },
              { name: t("ElectronicBill"), content: <ElectronicBillSetting request={electronicBillSetting} onComplete={(e:any)=>{
                if(e==true){
                setShowToastModel(true);
              }
                getSetting()
              }}/>,   }
            ]}
          />
          )}
    </>
  );
};
