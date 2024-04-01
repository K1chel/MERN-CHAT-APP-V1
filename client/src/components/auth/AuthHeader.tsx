type Props = {
  title: string;
  description: string;
};

export const AuthHeader = ({ title, description }: Props) => {
  return (
    <div className="flex flex-col w-full items-center md:items-start">
      <h4 className="text-xl md:text-3xl font-bold">{title}</h4>
      <p className="text-sm md:text-base text-muted-foreground">
        {description}
      </p>
    </div>
  );
};
