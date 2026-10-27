const apiBaseUrl = (process.env.REACT_APP_API_BASE_URL || '').replace(/\/+$/, '');
export const productsUrl = apiBaseUrl ? apiBaseUrl + '/index.php' : 'http://localhost:8000/';