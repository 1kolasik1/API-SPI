import { Suspense } from "react";
import { useLoaderData, Await, Link } from "react-router-dom";

export const loader = async ({ params: { id } }) => {
  const userPromise = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`
  ).then((r) => r.json());
  const albumPromise = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}/albums`
  ).then((r) => r.json());
  return { userPromise, albumPromise };
};

export default function User() {
  const { userPromise, albumPromise } = useLoaderData();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Await resolve={userPromise}>
        {(user) => {
          return (
            <div className="mx-[20px] my-[5px]">
              <div className="text-black font-bold my-[5px] text-3xl">
                {user.name}
              </div>
              <div className="text-gray-600 text-xl">
                Username: {user.username}
              </div>
              <div className="text-gray-600 text-xl">email: {user.email}</div>
              <div className="text-gray-600 text-xl">Site: {user.website}</div>
              <div className="underline mt-[5vh] decoration-green-400">
                {albumPromise.map((alb) => {
                  return (
                    <div className="flex items-center" key={alb.id}>
                      <div>
                        <img
                          className="h-[2vh] w-[2vh]"
                          alt="img"
                          src="https://avatars.mds.yandex.net/i?id=af2d4f2a1cf5a08724d0028ae335d5e5-4114158-images-thumbs&n=13"
                        ></img>{" "}
                      </div>
                      <Link key={alb.id} to={`/albums/${alb.id}`}>
                        <div className="m-[5px] text-2xl text-black underline decoration-green-400 hover:decoration-green-800 ">
                          {alb.title}
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }}
      </Await>
    </Suspense>
  );
}
