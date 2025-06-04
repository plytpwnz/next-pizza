'use client';

import { AddressFinder } from '@ideal-postcodes/address-finder';
import { useEffect, useState, useRef } from 'react';
import { FormInput } from './form';
import React from 'react';

interface Props {
  className?: string;
}

export const AddressInput: React.FC<Props> = ({ className }) => {
  const [state, setState] = useState({
    address: '',
  });

  useEffect(() => {
    AddressFinder.watch({
      inputField: '#searchField',
      apiKey: 'ak_mbibhiii53P8hEn3gUSzmPmnAwuQV',
      onAddressRetrieved: (address) => {
        setState({
          address: address.line_1,
        });
      },
    });
  }, []);

  return (
    <FormInput
      name="address"
      placeholder="Введите адрес..."
      id="searchField"
      type="text"
      value={state.address}
      onChange={(e) => setState({ ...state, address: e.target.value })}
    />
  );
};
