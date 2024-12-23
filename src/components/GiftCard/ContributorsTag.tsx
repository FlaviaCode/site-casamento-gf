interface ContributorsTagProps {
  count: number;
}

export function ContributorsTag({ count }: ContributorsTagProps) {
  if (count === 0) return null;
  
  return (
    <div className="absolute top-3 right-3 bg-green-500 text-white px-4 py-1 rounded-full text-sm shadow-lg">
      {count} já {count === 1 ? 'ajudou' : 'ajudaram'}
    </div>
  );
}