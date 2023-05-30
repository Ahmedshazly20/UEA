import { LookupItem, LookupTypeEnum } from "../models";
import { useEffect, useState } from "react";
import _ from "lodash";
import { getLookupByType } from "../serviceBroker/lookupApiServiceBroker";
import { getLabelName } from "../utils";

type LookupsCollection = {
  name: LookupTypeEnum;
  values: LookupItem[];
};

const useLookups = (
  setLoading: Function,
  enums: [LookupTypeEnum, ...LookupTypeEnum[]],
  isCashed?: boolean | true
) => {
  const [lookupsCollection, setLookupsCollection] = useState<
    LookupsCollection[]
  >([]);
  const fetchLookups = async () => {
    setLoading(true);
    let obj: LookupsCollection[] = [];
    _.forEach(enums, async (lookupTypeEnum: LookupTypeEnum) => {
      const response = await getLookupByType(lookupTypeEnum, isCashed, false);
      if (response) {
        obj.push({ name: lookupTypeEnum, values: response });
      }
    });
    setLookupsCollection(obj);
    setLoading(false);
  };

  useEffect(() => {
    fetchLookups().then((r) => r);
  }, []);

  const getLookupItems = (
    lookupEnum: LookupTypeEnum | undefined,
    addEmptySelect?: boolean | false
  ): LookupItem[] => {
    if (lookupsCollection && lookupsCollection.length > 0) {
      if (lookupEnum === undefined) {
        lookupEnum = lookupsCollection[0].name;
      }
      const lookup = _.find(
        lookupsCollection,
        (item: LookupsCollection) => item.name === lookupEnum
      );
      if (lookup) {
        let result = lookup.values;
        if (addEmptySelect) {
          result = [
            {
              nameAr: getLabelName("Select"),
              name: "Select",
              value: null,
            },
            ...result,
          ];
        }
        return result;
      }
    }

    return [];
  };

  return {
    getLookupItems,
  };
};

export default useLookups;
