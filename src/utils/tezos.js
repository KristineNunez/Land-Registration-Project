import { TezosToolkit } from '@taquito/taquito';
import { wallet, network } from './wallet';

//export const tezos = new TezosToolkit(`https://${network}.smartpy.io`);
export const tezos = new TezosToolkit(`https://ghostnet.ecadinfra.com`);

tezos.setWalletProvider(wallet);

export default function formatTezos(amount, notation = 'compact') {
  const locale = 'en-US';
  const options = {
    style: 'currency',
    currency: 'XTZ',
    currencyDisplay: 'name',
    notation: notation,
  };
  const numberFormat = new Intl.NumberFormat(locale, options);
  const parts = numberFormat.formatToParts(amount);

  return parts.reduce((acc, part) => {
    switch (part.type) {
      case 'currency':
        return acc + 'ꜩ';
      default:
        return acc + part.value;
    }
  }, '');
}
