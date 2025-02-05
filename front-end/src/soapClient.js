import soap from 'soap';

const SOAP_URL = 'http://localhost:8082/ws/matiere.wsdl'; 
export const getProducts = async () => {
  try {
    const client = await soap.createClientAsync(SOAP_URL);
    const args = {};  
    const result = await client.getProductsAsync(args);
    return result;
  } catch (error) {
    console.error('Error fetching products from SOAP service:', error);
    throw error;
  }
};
