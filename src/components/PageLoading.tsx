import { LoadingHearts } from './LoadingHearts';

export function PageLoading() {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
      <LoadingHearts className="scale-[2]" />
    </div>
  );
}