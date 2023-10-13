import React from "react";
import Icon from "../../Icon/Icon";
import { CoinDetailProps } from "@/app/types/coin_detail";
type CoinDescriptionProp = {
  coinDetail: CoinDetailProps;
};

function CoinDescription({ coinDetail }: CoinDescriptionProp) {
  const {
    links: { blockchain_site = "" },
    description: { en = "" },
  } = coinDetail || {};

  return (
    <div className="w-7/12">
      <div>
        <p className="leading-6" dangerouslySetInnerHTML={{ __html: en }} />
        <div className="flex items-center gap-4">
          <a
            className="px-8 py-2 mt-4 rounded-xl bg-white shadow flex items-center gap-2"
            href={blockchain_site[0]}
            target="_blank"
          >
            {blockchain_site[0]}
            <Icon iconVariant="copy" />
          </a>
          <a
            href={blockchain_site[1]}
            className="px-8 py-2 mt-4 rounded-xl bg-white shadow flex items-center gap-2"
          >
            {blockchain_site[1]} <Icon iconVariant="copy" />
          </a>
        </div>
        <a
          href={blockchain_site[2]}
          className="px-8 py-2 mt-4 rounded-xl bg-white shadow flex items-center gap-2 w-fit"
        >
          {blockchain_site[2]} <Icon iconVariant="copy" />
        </a>
      </div>
    </div>
  );
}

export default CoinDescription;
