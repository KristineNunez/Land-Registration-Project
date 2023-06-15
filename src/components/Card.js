import { LazyLoadImage } from 'react-lazy-load-image-component';
import formatTezos from '../utils/tezos';

export default function Card({
  token_id = "-1",
  image = '/abstract.png',
  size = 200,
  location = 'Maginhawa, Quezon City',
  tax_value = '1.00',
  title = 'Title',
  price = '1.00',
  encumbrance = 'Lease',
  payment = '1.00',
}) {
  return (
    <div className="border rounded-md overflow-clip bg-content border-white/10 min-h-[20rem]">
      <LazyLoadImage src={image} className="object-cover w-full h-60" />
      <div>
        <div className="flex flex-col justify-between p-2 border-b border-white/10">
          <h3 className="text-lg font-bold">{title}</h3>
          <span className="text-xs text-white/40">Registration No. {token_id}</span>
          <span className="px-2 py-1 text-xs rounded-lg bg-white/5 w-fit">
            {location}
          </span>
        </div>
        <div className="p-2">
          <div className="flex flex-col gap-1 text-xs">
            <span className="text-xs text-white/40">Price</span>
            <span className="text-sm font-bold">{formatTezos(price)}</span>
          </div>
        </div>
        {encumbrance !== "" &&
          <div className="p-2">
            <div className="flex flex-col gap-1 text-xs">
              <span className="text-xs text-white/40">Encumbrance (To Pay)</span>
              <span className="text-sm font-bold">On {encumbrance} : {formatTezos(payment)} </span>
            </div>
          </div>
        }
      </div>
    </div>
  );
}
