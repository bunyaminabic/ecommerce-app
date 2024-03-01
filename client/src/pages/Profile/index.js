import { useAuth } from "../../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { useCallback } from "react";
import { auth } from "../../firebase";
import { Text, Button } from "@chakra-ui/react";

function Profile() {
  const handleSignOut = useCallback(() => {
    signOut(auth);
  }, []);
  const { user } = useAuth();
  return (
    <div>
      <Text fontSize="22">Profile</Text>

      <code>{JSON.stringify(user)}</code>
      <br></br>
      <br></br>

      <Button onClick={handleSignOut} colorScheme="pink" variant="solid">
        Logout
      </Button>
    </div>
  );
}

export default Profile;
