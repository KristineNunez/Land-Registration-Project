import axios from 'axios';

const JWT =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI0NmMxODdlNy05ODFhLTRiMTYtYWVjMS02ZTUzZjhhY2EwOWIiLCJlbWFpbCI6Imx1emFkYWphcnJlZEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMGNlYWY2NmRhNzEzNmE1MjM5ZjgiLCJzY29wZWRLZXlTZWNyZXQiOiI3OWY0ODY5NWVkNDA4N2VkZDE5YTRmOTJmNjQ4NGU3YmI5ZDhlMGM2Y2Y2ZjU1MDc2NmUyNWNmZWM4NWZiNmUyIiwiaWF0IjoxNjg2NjU3NTY2fQ.Ec7fUPohXaV78ecl45cAuxgkvCZlXLo1dMuuLWB9Xy0';

export default async function mint(image) {
  try {
    const formData = new FormData();
    formData.append('file', image[0]);

    const options = JSON.stringify({
      cidVersion: 0,
    });
    formData.append('pinataOptions', options);

    const res = await axios.post(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      formData,
      {
        maxBodyLength: 'Infinity',
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          Authorization: JWT,
        },
      }
    );

    return res.data.IpfsHash;
  } catch (error) {
    console.error(error);
  }
}
