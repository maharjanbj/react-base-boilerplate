

// export const VITE_BASE_URL = import.meta.env.REACT_APP_VITE_BASE_URL_DEVELOP
export const PORT = 3030
// export const BASE_URL_DEVELOP = import.meta.env.VITE_BASE_URL_DEVELOP
export const BASE_URL_DEVELOP = import.meta.env.VITE_BASE_URL_DEVELOP
export const BASE_URL_PROD_URL = import.meta.env.VITE_BASE_URL
export const PUBLIC_URL = import.meta.env.PUBLIC_URL
export const PROD_URL = import.meta.env.VITE_BASE_URL
// export const VITE_BASE_URL=import.meta.env.REACT_APP_VITE_BASE_URL_DEVELOP;
export const NODE_ENV = import.meta.env.VITE_NODE_ENV
export const BASE_URL = NODE_ENV === 'development' ? BASE_URL_DEVELOP : PROD_URL
export const IMAGE_URL =
    (NODE_ENV === 'development' ? BASE_URL_DEVELOP : PROD_URL) + '/getFile/'
