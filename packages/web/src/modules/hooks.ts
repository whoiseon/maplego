import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store';

/** Typing이 적용된 useDispatch */
export const useAppDispatch = () => useDispatch<AppDispatch>();
/** Typing이 적용된 useSelector */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
