import { CiSearch } from "react-icons/ci";
import {
  PiCurrencyDollarSimpleBold,
  PiCaretUpBold,
  PiCaretDownBold,
  PiCurrencyGbpLight,
  PiSwapFill,
} from "react-icons/pi";
import {
  BiSolidChevronDown,
  BiDollar,
  BiEuro,
  BiHomeAlt2,
  BiGitCompare,
} from "react-icons/bi";
import { HiOutlineSwitchVertical } from "react-icons/hi";

import { RiHome5Fill } from "react-icons/ri";
import {
  BsSunFill,
  BsLightningChargeFill,
  BsStack,
  BsMoon,
} from "react-icons/bs";
import { ImStack } from "react-icons/im";

type Icons = {
  [key: string]: React.ElementType<any>;
};

const icons: Icons = {
  search: CiSearch,
  dollar: PiCurrencyDollarSimpleBold,
  chevDown: BiSolidChevronDown,
  sun: BsSunFill,
  moon: BsMoon,
  arrowUp: PiCaretUpBold,
  arrowDown: PiCaretDownBold,
  euro: BiEuro,
  gbp: PiCurrencyGbpLight,
  lightning: BsLightningChargeFill,
  swap: PiSwapFill,
  portfolio: ImStack,
  portfolioSolid: BsStack,
  home: BiHomeAlt2,
  homeSolid: RiHome5Fill,
  compare: BiGitCompare,
  converterSwap: HiOutlineSwitchVertical,
};

type props = {
  iconVariant: string;
  className?: string;
};

export default function Icon({ iconVariant, className }: props) {
  const IconVariant = icons[iconVariant];
  return <IconVariant className={className} type={iconVariant} />;
}
