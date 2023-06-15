import { LazyLoadImage } from 'react-lazy-load-image-component';
import formatTezos from '../utils/tezos';

export default function Card({
  token_id = '-1',
  image = '/abstract.png',
  size = 200,
  location = 'Maginhawa, Quezon City',
  tax_value = '1.00',
  price,
  className = '',
  onClick,
  encumbrance = '',
  payment= "1.0",
}) {
  return (
    <div
      className={`border rounded-md overflow-clip bg-content border-white/10 min-h-[20rem] ${className}`}
      onClick={onClick}
    >
      <LazyLoadImage src={image} className="object-cover w-full h-60" />
      <div>
        <div className="flex items-center justify-between p-2 border-b border-white/10">
          <span className="font-bold text-white">
            Registration No. {token_id}
          </span>
          <span className="px-2 py-1 text-xs rounded-lg bg-white/5 w-fit">
            {location}
          </span>
        </div>
        <div className="flex justify-between gap-4 p-2">
          {size && (
            <div className="flex flex-col gap-1 text-xs">
              <span className="text-xs text-white/40">Size</span>
              <span className="text-sm font-bold">{`${size} sqm`}</span>
            </div>
          )}
          <div className="flex gap-4">
            {tax_value && (
              <div className="flex flex-col gap-1 text-xs">
                <span className="text-xs text-white/40">Tax Value</span>
                <span className="text-sm font-bold">
                  {formatTezos(tax_value)}
                </span>
              </div>
            )}
            {price && (
              <div className="flex flex-col gap-1 text-xs">
                <span className="text-xs text-white/40">Price</span>
                <span className="text-sm font-bold">{formatTezos(price)}</span>
              </div>
            )}
          </div>
        </div>
        {encumbrance !== '' && 
          <div className="p-2">
            <div className="flex flex-col gap-1 text-xs">
              <span className="text-xs text-white/40">
                Encumbrance (To Pay)
              </span>
              <span className="text-sm font-bold">
                On {encumbrance} : {formatTezos(payment)}{' '}
              </span>
            </div>
          </div>
        }
      </div>
    </div>
  );
}
