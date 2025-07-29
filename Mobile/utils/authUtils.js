import store from '@/store/redux' // Burada store döngüsel olarak kullanılabilir çünkü slice değil.

export const getAuthToken = () => {
  const state = store.getState();
  return state.auth.token;
};