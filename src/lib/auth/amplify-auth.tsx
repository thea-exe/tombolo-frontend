import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";

// Our SignUp Function
const signUp = async (
  username: string,
  password: string,
  email: string,
  phone_number: string
) => {
  try {
    const { user } = await Auth.signUp({
      username,
      password,
      attributes: {
        email, // optional
        phone_number, // optional - E.164 number convention
        // other custom attributes
      },
    });
    console.log(user);
  } catch (error) {
    console.log("error signing up:", error);
  }
};

export const useAuthedUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        setUser(user);
        setLoading(false);
      })
      .catch((err) => {
        setUser(null);
        setLoading(false);
        setError(err);
      });
  }, []);

  return { user, loading, error };
};
