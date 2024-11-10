'use client';

export default function Error({ error }: { error: Error }) {
  return (
    <div className="flex w-full justify-center align-middle">
      <h1 className="text-lg font-extrabold">Error</h1>
      <h1>{error.message}</h1>
    </div>
  );
}
