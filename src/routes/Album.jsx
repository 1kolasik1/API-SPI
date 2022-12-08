import { Suspense } from "react";
import { Await, useLoaderData, Link } from "react-router-dom";
import Images from "./Images";

export const loader = async ({ params: { id } }) => {
  const albumsPromise = await fetch(
    `https://jsonplaceholder.typicode.com/albums/${id}`
  ).then((r) => r.json());
  return { albumsPromise };
};
function getUser(userId) {
  const usersPromise = fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  ).then((r) => r.json());
  return usersPromise;
}
export default function Album() {
  const { albumsPromise } = useLoaderData();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Await resolve={albumsPromise}>
        {(album) => {
          return (
            <div className="mx-[20px] my-[10px]">
              <div className="text-3xl font-bold">{album.title}</div>
              <Suspense fallback={<div>Loading...</div>}>
                <Await resolve={getUser(album.userId)}>
                  {(user) => {
                    return (
                      <div className="text-3xl">
                        <Link key={user.id} to={`/users/${user.id}`}>
                          <div className="text-3xl">
                            Creator
                            <span className="underline decoration-green-400 ml-[10px] text-3xl">
                              {user.name}
                            </span>
                          </div>
                        </Link>
                      </div>
                    );
                  }}
                </Await>
              </Suspense>
              <Images src={require("../albumImage.jpg")}></Images>
            </div>
          );
        }}
      </Await>
    </Suspense>
  );
}
