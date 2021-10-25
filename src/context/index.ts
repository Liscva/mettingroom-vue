import { useAreaProvide, useAreaInject } from './area';
import { useUserInject, useUserProvide } from './user';
import { useReserveInject, useReserveProvide } from './reserve';

export { useAreaInject,useUserInject,useReserveInject };

export const useProvider = () => {
    useAreaProvide();
    useUserProvide();
    useReserveProvide();
};