import { useContext } from 'react';
import { HistoryContext } from '../context/HistoryContext';

export const useHistory = () => useContext(HistoryContext);
