
export async function loggedStatus() {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) throw error;
      return !!session;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  