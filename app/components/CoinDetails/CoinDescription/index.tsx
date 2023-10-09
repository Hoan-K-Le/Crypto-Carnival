import React from "react";
import Icon from "../../Icon/Icon";
type CoinDescriptionProp = {
  coinDetail: {
    description: { en: string };
    links: { blockchain_site: string };
  };
};
function CoinDescription({ coinDetail }: CoinDescriptionProp) {
  return (
    <div className="w-7/12">
      <div>
        <p
          className="leading-6"
          dangerouslySetInnerHTML={{ __html: coinDetail?.description.en }}
        />
        <div className="flex items-center gap-4">
          <a
            className="px-8 py-2 mt-4 rounded-xl bg-white shadow flex items-center gap-2"
            href={coinDetail?.links.blockchain_site[0]}
            target="_blank"
          >
            {coinDetail?.links.blockchain_site[0]}
            <Icon iconVariant="copy" />
          </a>
          <a
            href={coinDetail?.links.blockchain_site[1]}
            className="px-8 py-2 mt-4 rounded-xl bg-white shadow flex items-center gap-2"
          >
            {coinDetail?.links.blockchain_site[1]} <Icon iconVariant="copy" />
          </a>
        </div>
        <a
          href={coinDetail?.links.blockchain_site[2]}
          className="px-8 py-2 mt-4 rounded-xl bg-white shadow flex items-center gap-2 w-fit"
        >
          {coinDetail?.links.blockchain_site[2]} <Icon iconVariant="copy" />
        </a>
      </div>
    </div>
  );
}

export default CoinDescription;
