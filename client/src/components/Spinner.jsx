import React from "react";
import { HeartSpinner } from "react-spinners-kit";
import { colors } from '../lib/common/colors';
import { wQuotes } from '../lib/common/waitingQuotes';
import sample from 'lodash/sample';

export const Spinner = () => {
  const quote = sample(wQuotes);
  return (
    <React.Fragment>
      <div className="waiting-quote">
        <p>
          <span>"{quote.message}."</span>
          __ <span>{quote.author}.</span>
        </p>
      </div>
      <HeartSpinner
        size={50}
        color={colors.purple}
        loading={true}
      />
    </React.Fragment>
  );
}
