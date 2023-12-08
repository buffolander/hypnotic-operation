import * as React from 'react';
import { Datagrid, Labeled, LabeledProps, ListContextProvider, Show, SimpleShowLayout, TextField, useGetList, useGetRecordId, useList } from 'react-admin';
import { Grid, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { AssetClassOptions } from '../providers/DataProvider';

export const InvestorShow = () => {
  const [assetClass, setAssetClass] = React.useState('PE');
  const { data, isLoading } = useGetList('investors', {meta: { investor: useGetRecordId(), assetClass }})
  const listContext = useList({ data, isLoading })


  const handleChange = (event: SelectChangeEvent) => {
    setAssetClass(event.target.value);
  };

  const Item = ({ children, ...props }: LabeledProps) => (<Labeled {...props} style={{ paddingRight: 20 }}>{children}</Labeled>)
  
  return (
    <div>
      <Show>
        <SimpleShowLayout>
          <Grid container alignItems="center">
            <Item label="Investor ID">
              <TextField source="id" />
            </Item>
            <Item>
              <TextField source="name" />
            </Item>
            <Item label="Address">
              <TextField source="address.address" />
            </Item>
            <Item label="City">
              <TextField source="address.city" />
            </Item>
            <Item label="Country">
              <TextField source="address.country" />
            </Item>
            <div style={{ flexGrow: 1 }} />
            <Typography variant="body1" style={{fontWeight:500,paddingRight:10}}>Investor Commitment</Typography>
            <Select
              labelId="select-asset-class-label"
              id="demo-simple-select"
              size="small"
              value={assetClass}
              onChange={handleChange}
            >
              {
                AssetClassOptions.map((option) => (
                  <MenuItem key={option.key} value={option.key}>
                    {option.value}
                  </MenuItem>
                ))
              }
            </Select>
          </Grid>
        </SimpleShowLayout>
        <ListContextProvider value={listContext}>
          <Datagrid>
            <TextField source="id" />
            <TextField source="fundName" />
            <TextField source="primarySector" />
            <TextField source="vintage" />
            <TextField source="fundManager" />
            <TextField source="fundCurrency" />
            <TextField source="fundSizeMn" />
            <TextField source="committedMn" />
          </Datagrid>
        </ListContextProvider>
      </Show>
    </div>
  )
}
