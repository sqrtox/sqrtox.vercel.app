import { type TypedUseSelectorHook, useSelector } from 'react-redux';
import { type RootState } from '~/slices';

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { useAppSelector };
