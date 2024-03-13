import { useAuth } from "../../contexts/AuthContext";
import { useCallback } from "react";
import { Text, Button } from "@chakra-ui/react";

function Profile() {
  const { logout, user } = useAuth();

  const handleSignOut = useCallback(async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Çıkış yapılırken bir hata oluştu:", error);
    }
  }, [logout]);

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
