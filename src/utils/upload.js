import { File, NFTStorage } from 'nft.storage';

const symbol = 'TUT';

const apiKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEE3NTgwQUQ0RTY0ZDdFMzM0ZGY1ODEzODQwZkFlOWY0QTY4ODZkNzkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4NjYxMDE5Njg5OSwibmFtZSI6Im1ldGFsYW5kIn0.esrOOyKWqFp7aiKR4kxN37OHviaR2fbCl61a3OWlZqA';
const client = new NFTStorage({ token: apiKey });

const uploadToIpfs = async (name, size, location, tax_value, imgFile) => {
  const metadata = await client.store({
    name: name,
    size: size,
    location: location,
    tax_value: tax_value,
    image: new File([imgFile], imgFile.name, { type: imgFile.type }),
    symbol: symbol,
    decimals: 0,
    shouldPreferSymbol: false,
    isBooleanAmount: true,
    artifactUri: new File([imgFile], imgFile.name, { type: imgFile.type }),
    displayUri: new File([imgFile], imgFile.name, { type: imgFile.type }),
    thumbnailUri: new File([imgFile], imgFile.name, { type: imgFile.type }),
    creators: ['metaland'],
  });
  return metadata.url;
};

export { uploadToIpfs };
