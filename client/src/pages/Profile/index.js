import { useAuth } from "../../contexts/AuthContext";

import { Text, Button } from "@chakra-ui/react";

function Profile() {
  const { user } = useAuth();
  return (
    <div>
      <Text fontSize="22">Profile</Text>

      <code>{JSON.stringify(user)}</code>
      <br></br>
      <br></br>

      <Button colorScheme="pink" variant="solid">
        Logout
      </Button>
    </div>
  );
}

export default Profile;
