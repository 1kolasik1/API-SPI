import { Suspense } from "react";
import { useLoaderData, Await, Link } from "react-router-dom";

export const loader = async () => {
  const albums = await fetch(
    "https://jsonplaceholder.typicode.com/albums"
  ).then((r) => r.json());
  return { albums };
};

export default function Albums() {
  const { albums } = useLoaderData();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Await resolve={albums}>
        <div className="underline decoration-green-400 text-2xl">
          {albums.map((album) => (
            <div className="mx-[20px] my-[5px]" key={album.id}>
              <Link key={album.id} to={`/albums/${album.id}`}>
                <div className="flex items-center underline decoration-green-400 text-black hover:decoration-green-900">
                  <img
                    className="h-[2vh] w-[2vh]"
                    alt="img"
                    src="https://avatars.mds.yandex.net/i?id=af2d4f2a1cf5a08724d0028ae335d5e5-4114158-images-thumbs&n=13"
                  ></img>{" "}
                  <div className="mx-[20px] my-[5px]">{album.title}</div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </Await>
    </Suspense>
  );
}
