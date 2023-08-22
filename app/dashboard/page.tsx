import Greetings from '@/components/Greetings';
import { NewCard } from '@/components/NewCard';
import Summary from '@/components/Summary';

export default function page() {
  return (
    <div className="p-6 w-full gap-y-6 ml-12">
      <Greetings />
      <Summary />
      <NewCard />
    </div>
  );
}
