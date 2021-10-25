import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';

// Import your mock .ts files one by one
// If you use vite.mock.sysConfig.ts, just import the file directly
// You can use the import.meta.glob function to import all
import testModule from '../mock/test';

export function setupProdMockServer() {
    createProdMockServer([...testModule]);
}
