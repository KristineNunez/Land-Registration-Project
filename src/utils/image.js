export default function getImageURL(ipfsURL) {
  return ipfsURL.replace('ipfs://', 'https://ipfs.io/ipfs/');
}
