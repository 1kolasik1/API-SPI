import { Suspense } from "react";
import { Await, Link, useLoaderData } from "react-router-dom";

export const loader = async () => {
  const users = await fetch("https://jsonplaceholder.typicode.com/users").then(
    (r) => r.json()
  );
  return { users };
};

export default function Users() {
  const { users } = useLoaderData();

  return (
    <Suspense>
      <Await resolve={users}>
        <div className="text-[3vh] mt-[10px] ml-[20px]">
          {users.map((user) => (
            <Link key={user.id} to={`/users/${user.id}`}>
              <div className="my-[5px] underline decoration-green-500 hover:decoration-green-800">
                {user.name}
              </div>
            </Link>
          ))}
        </div>
      </Await>
    </Suspense>
  );
}
