type Props = {
  className?: string;
  events: {
    title: string;
    date: string;
    description?: string | null;
  }[];
};

export default function Timeline({ className, events }: Props) {
  return (
    <div className={className}>
      <ol className="space-y-10 border-l border-gray-200 dark:border-gray-700">
        {events.map((event, idx) => (
          <li key={idx} className="ml-4">
            <p className="relative mb-1 text-sm leading-none text-gray-400 before:absolute before:-left-[22.5px] before:top-px before:h-3 before:w-3 before:rounded-full before:border before:border-white before:bg-gray-200 dark:text-gray-500 before:dark:border-gray-900 before:dark:bg-gray-700">
              {event.date}
            </p>
            <h3 className="text-lg font-semibold">{event.title}</h3>
            {event.description && (
              <p className="mb-4 text-base text-gray-500 dark:text-gray-400">
                {event.description}
              </p>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
