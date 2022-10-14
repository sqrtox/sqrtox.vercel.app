import { useDispatch } from 'react-redux';
import { type AppDispatch } from '~/slices';

const useAppDispatch = () => useDispatch<AppDispatch>();

export { useAppDispatch };
