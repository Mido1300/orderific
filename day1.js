const fetchUserData = async (userId) => {
  try {
    const response = await fetch(`https://api.example.com/users/${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

const transformUserData = ({ id, name, email, ...rest }) => ({
  userId: id,
  fullName: name.toUpperCase(),
  contact: email,
  additionalInfo: { ...rest },
});

const createUserManager = () => {
  let state = { user: null, loading: false };

  const updateUser = async (userId) => {
    state.loading = true;
    const rawData = await fetchUserData(userId);
    state.user = rawData ? transformUserData(rawData) : null;
    state.loading = false;
    return state;
  };

  const getState = () => ({ ...state });

  return { updateUser, getState };
};

const userManager = createUserManager();

(async () => {
  console.log("Initial state:", userManager.getState());
  const updatedState = await userManager.updateUser(1);
  console.log("Updated state:", updatedState);
})();
