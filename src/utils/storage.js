import axios from 'axios';
import { bytes2Char } from '@taquito/utils';

import { network, contractAddress, getAccountAddress } from './wallet';

export const getStorage = async () => {
  try {
    const response = await axios.get(
      `https://api.${network}.tzkt.io/v1/contracts/${contractAddress}/storage`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getTransactions = async (offset = 0, limit = 10) => {
  try {
    const response = await axios.get(
      `https://api.${network}.tzkt.io/v1/contracts/${contractAddress}/bigmaps/transactions/keys?select=key,value&offset=${offset}&limit=${limit}`
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPending = async (offset = 0, limit = 10) => {
  try {
    const response = await axios.get(
      `https://api.${network}.tzkt.io/v1/contracts/${contractAddress}/bigmaps/transactions/keys?select=key,value&value.status=0&offset=${offset}&limit=${limit}`
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPendingReverts = async (offset = 0, limit = 10) => {
  try {
    const response = await axios.get(
      `https://api.${network}.tzkt.io/v1/contracts/${contractAddress}/bigmaps/transactions/keys?select=key,value&value.counterpartyHasWithdrawn=true&value.ownerHasWithdrawn=true&value.status.ne=-1&offset=${offset}&limit=${limit}`
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCompleted = async (offset = 0, limit = 10) => {
  try {
    const response = await axios.get(
      `https://api.${network}.tzkt.io/v1/contracts/${contractAddress}/bigmaps/transactions/keys?select=key,value&value.status=2&offset=${offset}&limit=${limit}`
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getActive = async (offset = 0, limit = 10) => {
  try {
    const response = await axios.get(
      `https://api.${network}.tzkt.io/v1/contracts/${contractAddress}/bigmaps/transactions/keys?select=key,value&value.status=1&offset=${offset}&limit=${limit}`
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCancelled = async (offset = 0, limit = 10) => {
  try {
    const response = await axios.get(
      `https://api.${network}.tzkt.io/v1/contracts/${contractAddress}/bigmaps/transactions/keys?select=key,value&value.status=-1&offset=${offset}&limit=${limit}`
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getTransactionCount = async () => {
  try {
    const response = await axios.get(
      `https://api.${network}.tzkt.io/v1/contracts/${contractAddress}/bigmaps/transactions`
    );

    return response.data.totalKeys;
  } catch (error) {
    console.log(error);
  }
};

export const getTransaction = async (id) => {
  try {
    const response = await axios.get(
      `https://api.${network}.tzkt.io/v1/contracts/${contractAddress}/bigmaps/transactions/keys/${id}`
    );

    return response.data.value;
  } catch (error) {
    console.log(error);
  }
};

export const getParties = async (id) => {
  try {
    const response = await axios.get(
      `https://api.${network}.tzkt.io/v1/contracts/${contractAddress}/bigmaps/parties/keys/${id}`
    );

    return response.data.value;
  } catch (error) {
    console.log(error);
  }
};

export const getUserTransactions = async (account) => {
  try {
    // combine the two responses as one promise
    const [ownerResponse, counterpartyResponse] = await Promise.all([
      await axios.get(
        `https://api.${network}.tzkt.io/v1/contracts/${contractAddress}/bigmaps/parties/keys?value.owner=${account}`
      ),
      await axios.get(
        `https://api.${network}.tzkt.io/v1/contracts/${contractAddress}/bigmaps/parties/keys?value.counterparty=${account}`
      ),
    ]);

    const transactions = [...ownerResponse.data, ...counterpartyResponse.data];

    console.log(transactions);

    return transactions;
  } catch (error) {
    console.log(error);
  }
};

export const getTokens = async () => {
  try {
    //Get only unburned tokens
    const req = await axios.get(
      `https://api.${network}.tzkt.io/v1/contracts/${contractAddress}/bigmaps/token_metadata/keys?active=true`
    );
    // convert bytes to char
    const res = req.data.map((token) => {
      token.value.token_info.size = bytes2Char(token.value.token_info.size);
      token.value.token_info.image = bytes2Char(token.value.token_info.image);
      token.value.token_info.location = bytes2Char(
        token.value.token_info.location
      );
      token.value.token_info.tax_value = bytes2Char(
        token.value.token_info.tax_value
      );

      return token;
    });

    return res.map((token) => token.value);
  } catch (error) {
    console.log(error);
  }
};

export const getUserProperties = async (userAddress) => {
  try {
    const tokenIds = await axios.get(
      `https://api.${network}.tzkt.io/v1/contracts/${contractAddress}/bigmaps/ledger/keys?value=${userAddress}&select=key&active=true`
    );

    const tokens = await Promise.all(
      tokenIds.data.map(async (tokenId) => {
        const token = await axios.get(
          `https://api.${network}.tzkt.io/v1/contracts/${contractAddress}/bigmaps/token_metadata/keys/${tokenId}`
        );

        const res = {
          id: tokenId,
          size: bytes2Char(token.data.value.token_info.size),
          image: bytes2Char(token.data.value.token_info.image),
          location: bytes2Char(token.data.value.token_info.location),
          tax_value: bytes2Char(token.data.value.token_info.tax_value),
        };

        return res;
      })
    );

    return tokens;
  } catch (error) {
    console.log(error);
  }
};

export const getUserSellingProperties = async (userAddress) => {
  try {
    const selling = await axios.get(
      `https://api.${network}.tzkt.io/v1/contracts/${contractAddress}/bigmaps/sell_value/keys?value.owner=${userAddress}&active=true&select=key,value`
    );

    const properties = await Promise.all(
      selling.data.map(async (property) => {
        const token = await axios.get(
          `https://api.${network}.tzkt.io/v1/contracts/${contractAddress}/bigmaps/token_metadata/keys/${property.key}`
        );

        const res = {
          id: property.key,
          size: bytes2Char(token.data.value.token_info.size),
          image: bytes2Char(token.data.value.token_info.image),
          location: bytes2Char(token.data.value.token_info.location),
          tax_value: bytes2Char(token.data.value.token_info.tax_value),
          price: property.value.price,
        };

        return res;
      })
    );

    return properties;
  } catch (error) {
    console.log(error);
  }
};

export const getSellingProperties = async () => {
  try {
    const userAddress = await getAccountAddress();
    const selling = await axios.get(
      `https://api.${network}.tzkt.io/v1/contracts/${contractAddress}/bigmaps/sell_value/keys?active=true&select=key,value&value.owner.ne=${userAddress}`
    );

    const properties = await Promise.all(
      selling.data.map(async (property) => {
        const token = await axios.get(
          `https://api.${network}.tzkt.io/v1/contracts/${contractAddress}/bigmaps/token_metadata/keys/${property.key}`
        );

        const res = {
          id: property.key,
          size: bytes2Char(token.data.value.token_info.size),
          image: bytes2Char(token.data.value.token_info.image),
          location: bytes2Char(token.data.value.token_info.location),
          tax_value: bytes2Char(token.data.value.token_info.tax_value),
          price: property.value?.price,
        };

        return res;
      })
    );

    return properties;
  } catch (error) {
    console.log(error);
  }
};

export const getEncumbrance = async () => {
  try {
    //Get only unburned tokens
    const req = await axios.get(
      `https://api.${network}.tzkt.io/v1/contracts/${contractAddress}/bigmaps/encumbrance/keys?active=true`
    );
    return req.data.map((token) => token);
  } catch (error) {
    console.log(error);
  }
};
