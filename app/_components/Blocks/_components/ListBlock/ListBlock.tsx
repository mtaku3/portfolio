import ListItem from "./ListItem";
import ListModal from "./ListModal";
import { PageBlocksList } from "@/tina/__generated__/types";

type Props = {
  data: PageBlocksList;
};

export default function ListBlock({ data }: Props) {
  const items =
    data.numOfItemsToShow == 0
      ? data.items
      : data.items.slice(0, data.numOfItemsToShow);
  const restOfItems =
    data.numOfItemsToShow == 0
      ? undefined
      : data.items.slice(data.numOfItemsToShow, data.items.length);

  return (
    <section className="col-span-full my-8 space-y-8 md:col-span-6">
      {data.titleForList && (
        <h3 className="text-2xl font-bold md:text-3xl">{data.titleForList}</h3>
      )}
      <ol className="space-y-4">
        {items.map((item, idx) => (
          <ListItem key={idx} item={item} />
        ))}
        {restOfItems && (
          <ListModal
            buttonText={`${restOfItems
              .slice(0, 3)
              .map((x) => x.name)
              .join(", ")} and more`}
          >
            <div className="space-y-8">
              <h3 className="text-2xl font-bold md:text-3xl">
                {data.titleForList}
              </h3>
              <ol className="space-y-4">
                {items.map((item, idx) => (
                  <ListItem key={idx} item={item} />
                ))}
                <hr className="border-t border-gray-300" />
                {restOfItems.map((item, idx) => (
                  <ListItem key={idx} item={item} />
                ))}
              </ol>
            </div>
          </ListModal>
        )}
      </ol>
    </section>
  );
}
