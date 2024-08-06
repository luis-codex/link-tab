import { Button } from '@app/components/ui/button';
import { Input } from '@app/components/ui/input';
import { useAI } from '@app/store/useAI';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

// function usePrevious<T>(value: T): T | undefined {
//   const ref = useRef<T | undefined>(undefined);

//   useEffect(() => {
//     ref.current = value;
//   }, [value]);

//   return ref.current;
// }

// function useCounter(num: number, velocity: number) {
//   const [count, setCount] = useState(num);
//   const prevCount = usePrevious(count);

//   useEffect(() => {
//     if (prevCount === undefined || count === num) return;

//     const increment = count < num ? 1 : -1;
//     const interval = setInterval(() => {
//       setCount((prev) => {
//         if (prev === num) {
//           clearInterval(interval);
//           return prev;
//         }
//         return prev + increment;
//       });
//     }, velocity);

//     return () => clearInterval(interval);
//   }, [num, count, velocity, prevCount]);

//   const direction = useMemo(
//     () => (!prevCount ? 0 : prevCount > num ? 1 : -1),
//     [prevCount, num]
//   );

//   return [count, direction, prevCount] as const;
// }

export default function Page() {
  const [apiKey, setApiKey] = useAI((s) => [s.apiKey, s.setApiKey]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const apiKey = formData.get('apiKey') as string;
    setApiKey(apiKey.trim());
    toast.success('API Key saved');
  };

  return (
    <div className='container h-screen u-flex-center flex-col gap-4 py-2'>
      <h1 className='text-2xl font-bold u-tracking-screen-tighter text-accent-8 animate-fade-down'>
        Settings
      </h1>
      <form className='max-w-sm w-full flex gap-4' onSubmit={handleSubmit}>
        <Input
          className='bg-accent-2 rounded-[calc(15px-5px)] truncate'
          name='apiKey'
          defaultValue={apiKey || ''}
          placeholder='API Key'
          type='password'
        />
        <Button>Save</Button>
      </form>

      <Link
        to={'/'}
        className='px-2 text-sm text-accent-5 font-light hover:text-accent-8 font-mono underline underline-offset-4 uppercase animate-fade animate-delay-300'
      >
        ← Go Back
      </Link>

      <div className='mt-16 border border-dashed px-3 text-center py-2 rounded-[calc(15px-5px)] hover:border-solid cursor-pointer animate-fade-up delay-500'>
        <a
          href='https://aistudio.google.com/app/apikey'
          target='_blank'
          rel='noopener noreferrer'
          className='bg-[linear-gradient(61deg,_#64b8fb_6.28%,_#217bfe_76.97%)] bg-clip-text text-transparent text-md font-medium uppercase'
        >
          Get API Key
        </a>
        <p className='text-xs text-accent-5 font-light mt-1'>
          Get an API Key to use this{' '}
          <span className='text-accent-7'>Gemini</span>-powered app.
        </p>
      </div>
    </div>
  );
}
