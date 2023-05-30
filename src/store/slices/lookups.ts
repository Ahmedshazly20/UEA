import {useEffect, useState} from 'react';
import {
    createSlice,
    PayloadAction
} from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux'
import __ from 'lodash';
import {LookupItem, LookupTypeEnum} from "../../models";
import {getLookupByType} from "../../serviceBroker/lookupApiServiceBroker";

const _ = __.runInContext();

type LookupsCollection={
  name:LookupTypeEnum;
  values:LookupItem[]
};
_.mixin({
    // Immutable Set for setting state
    setIn: (state:LookupsCollection[], name:LookupTypeEnum, value:LookupItem[]):LookupsCollection[] => {
        return _.setWith(_.clone(state), name, value, _.clone);
    }
});

 // const setLookupItem = createAction<PayloadAction<LookupsCollection>>('setLookupItem')
// Slice
const slice = createSlice({
    name: 'lookups',
    initialState: [] as LookupsCollection[],
    reducers:{
        setLookupItem: (state, action:PayloadAction<LookupsCollection>) => {
            // state[action.payload.entityName] = action.payload.recordSet;

            // @ts-ignore
            return _.setIn(
                {...state},
                action.payload.name,
                action.payload.values
            );
    },
    

    },
});
export default slice.reducer;
export const getLookupItem = (lookupTypeEnum:LookupTypeEnum, isCached:boolean,addEmptySelect:boolean) => async () => {
    const response =  await getLookupByType(lookupTypeEnum, isCached, addEmptySelect);
    if (response) {
        await slice.actions.setLookupItem({name: lookupTypeEnum,values: response});
    } else {
        await slice.actions.setLookupItem({name: lookupTypeEnum, values: []});
    }
};
