/**
 * Allows you to sign up using email and password, also sends confirmation email.
 *
 * @param {Object} credentials Object with this properties { email: "example@email.com", password: "example-password" }
 * @returns {Object} An object with the user values
 */
export async function userEmailSignUp({ email, password }) {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;

  return data;
}

/**
 * Allows you to log in using email and password
 *
 * @param {Object} credentials Object with this properties { email: "example@email.com", password: "example-password" }
 * @returns {Object} An object with the user values
 */
export async function userEmailLogIn({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  return data;
}

/**
 * Allows you to Sign In or Sign Up using 3th party authentication
 * Provider examples:
 *  - 'google'
 *  - 'facebook'
 *
 * @see {@link https://supabase.com/docs/guides/auth#providers} for more providers.
 * @param {Object} provider An object with the following properties { provider: 'google' }
 * @returns
 */
export async function userOAuth({ provider }) {
  let { data, error } = await supabase.auth.signInWithOAuth({
    provider,
  });

  if (error) throw error;

  return data;
}

/**
 * Logs out current user
 */
export async function userLogOut() {
  let { error } = await supabase.auth.signOut();
  if (error) throw error;
}

/**
 * Checks if a user is currently logged in
 *
 * @returns {boolean} True if there is a logged in user.
 */
export async function loggedStatus() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) throw error;

  return !!session;
}

/**
 * Allows you to change email or password of the current user
 *
 * @param {Object} credentials Object with this properties { email: "new@email.com", password: "new-password" }
 * @returns {Object} An object with new user values
 */
export async function updateUserCredentials({ email, password }) {
  const { data, error } = await supabase.auth.updateUser({
    email: "new@email.com",
    password: "new-password",
  });

  if (error) throw error;

  return data;
}

/**
 * Retrieves info from Supabase data base.
 * Returns an object holding the current user;
 * Returns undefined if no user was found;
 *
 * @return {Object} The current user; as an object.
 */
export async function getUserData() {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    console.log(`Unable to retrieve user, there might be no user logged in.`);
    return undefined;
  }
}

/**
 * Retrieves info from Supabase data base.
 * Returns a string holding current user's UUID;
 * Returns undefined if no user was found;
 *
 * @return {string} UUID as string.
 */
export async function getUserId() {
  try {
    const {
      data: {
        user: { id },
      },
    } = await supabase.auth.getUser();
    return id;
  } catch (error) {
    console.log(`Unable to retrieve ID, there might be no user logged in.`);
    return undefined;
  }
}

/**
 * Retrieves info from Supabase data base.
 * Returns a string holding current user's email;
 * Returns undefined if no user was found;
 *
 * @return {string} Email as string.
 */
export async function getUserEmail() {
  try {
    const {
      data: {
        user: { email },
      },
    } = await supabase.auth.getUser();
    return email;
  } catch (error) {
    console.log(`Unable to retrieve email, there might be no user logged in.`);
    return undefined;
  }
}

/**
 * Retrieves info from Supabase data base.
 * Returns a string holding current user's full name;
 * Returns undefined if no user was found;
 *
 * @return {string} Name as string.
 */
export async function userNameFull() {
  try {
    const uuid = await getUserId();
    const { data, error } = await supabase
      .from("user_details")
      .select()
      .eq("id", uuid);
    if (error) throw error;
    const { user_name } = data.at(0);
    return user_name;
  } catch (error) {
    console.log(`Unable to retrieve name, there might be no user logged in.`);
    return undefined;
  }
}
