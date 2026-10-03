const STORAGE_KEYS = {
  MEMBERS: 'mealmate_saved_members',
  HISTORY: 'mealmate_calc_history',
  THEME: 'mealmate_theme',
  MESS_NAME: 'mealmate_mess_name',
  LAST_CALCULATION: 'mealmate_last_calc',
};

const DEFAULT_MEMBERS = [
  { id: 'm-1', name: 'Rahim' },
  { id: 'm-2', name: 'Karim' },
  { id: 'm-3', name: 'Sakib' },
  { id: 'm-4', name: 'Fahim' },
  { id: 'm-5', name: 'Nayeem' },
];

export const getSavedMembers = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MEMBERS);
    if (!raw) return DEFAULT_MEMBERS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_MEMBERS;
  } catch (e) {
    console.error('Error reading saved members:', e);
    return DEFAULT_MEMBERS;
  }
};

export const saveMembers = (members) => {
  try {
    localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(members));
  } catch (e) {
    console.error('Error saving members:', e);
  }
};

export const getCalculationHistory = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HISTORY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Error reading calculation history:', e);
    return [];
  }
};

export const saveCalculationToHistory = (calcResult) => {
  try {
    const history = getCalculationHistory();
    const index = history.findIndex(
      h => h.month === calcResult.month && h.year === calcResult.year && h.messName === calcResult.messName
    );

    let updatedHistory;
    if (index >= 0) {
      updatedHistory = [...history];
      updatedHistory[index] = calcResult;
    } else {
      updatedHistory = [calcResult, ...history];
    }

    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updatedHistory.slice(0, 36)));
    return updatedHistory;
  } catch (e) {
    console.error('Error saving calculation to history:', e);
    return [];
  }
};

export const deleteHistoryItem = (id) => {
  try {
    const history = getCalculationHistory();
    const updated = history.filter(h => h.id !== id);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Error deleting history item:', e);
    return [];
  }
};

export const getSavedMessName = () => {
  try {
    return localStorage.getItem(STORAGE_KEYS.MESS_NAME) || 'MealMate Mess';
  } catch {
    return 'MealMate Mess';
  }
};

export const saveMessName = (name) => {
  try {
    localStorage.setItem(STORAGE_KEYS.MESS_NAME, name);
  } catch (e) {
    console.error('Error saving mess name:', e);
  }
};

export const getSavedTheme = () => {
  try {
    return localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
  } catch {
    return 'light';
  }
};

export const saveTheme = (theme) => {
  try {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  } catch (e) {
    console.error('Error saving theme:', e);
  }
};

export const clearAllData = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.MEMBERS);
    localStorage.removeItem(STORAGE_KEYS.HISTORY);
    localStorage.removeItem(STORAGE_KEYS.MESS_NAME);
    localStorage.removeItem(STORAGE_KEYS.LAST_CALCULATION);
  } catch (e) {
    console.error('Error clearing data:', e);
  }
};
