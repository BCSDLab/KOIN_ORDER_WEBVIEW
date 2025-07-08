interface MenuDescriptionProps {
  name: string;
  description: string | null;
  price: number;
}

export default function MenuDescription({ name, description, price }: MenuDescriptionProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-4">
      <span className="mb-2 h-8 self-start text-xl leading-[1.6] font-bold">{name}</span>
      <span className="text-primary-500 mb-2 h-8 self-start text-xl leading-[1.6] font-bold">
        {price.toLocaleString()}원
      </span>
      {description && (
        <span className="text-xm mb-2 h-[1.1875rem] self-start leading-[1.6] text-neutral-500">{description}</span>
      )}
    </div>
  );
}
