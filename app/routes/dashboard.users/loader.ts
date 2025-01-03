import { getAllUsers } from "~/shared/.server/repository/users";

export const loader = async () => {
  const allUsers = await getAllUsers();

  return Response.json({ users: allUsers });
};
