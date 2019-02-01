import React from "react";
import { HeartSpinner } from "react-spinners-kit";
import {colors} from '../lib/common/colors';

export const Spinner = () => {
  return (
    <HeartSpinner
      size={50}
      color={colors.purple}
      loading={true}
    />
  );
}
