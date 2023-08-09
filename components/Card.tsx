import clsx from 'clsx';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card: React.FC<CardProps> = ({ className, children }) => {
  return (
    <div
      className={clsx('rounded-md px-10 py-4 shadow-md bg-white', className)}
    >
      {children}
    </div>
  );
};

export default Card;
