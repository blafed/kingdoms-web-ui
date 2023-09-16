import { Fragment, useState } from "react"
import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon } from "@heroicons/react/20/solid"
import { toBeRequired } from "@testing-library/jest-dom/matchers"

export default function ({
  items = [
    {
      name: "good",
      id: "dsadas",
      img: "",
    },
  ],
}) {
  const [selectedId, setSelectedId] = useState(0)
  const selected = items[selectedId]

  return (
    <Listbox value={selectedId} onChange={setSelectedId}>
      {() => (
        <>
          <div className="relative mt-2">
            {/* <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
              <span className="flex items-center">
                <img
                  src={selected.avatar}
                  alt=""
                  className="h-5 w-5 flex-shrink-0 rounded-full"
                />
                <span className="ml-3 block truncate">{selected.name}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button> */}

            <Transition
              show={true}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {items.map((item) => (
                  <Listbox.Option
                    key={item.id}
                    // className={({ active }) =>
                    //   classNames(
                    //     selected ? "bg-indigo-600 text-white" : "text-gray-900",
                    //     "relative cursor-default select-none py-2 pl-3 pr-9"
                    //   )
                    // }
                    value={item.id}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <img
                            src={item.img}
                            alt=""
                            className="h-5 w-5 flex-shrink-0 rounded-full"
                          />
                          <span
                            className={
                              (selected ? "font-semibold" : "font-normal",
                              "ml-3 block truncate")
                            }
                          >
                            {item.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={
                              (active ? "text-white" : "text-indigo-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4")
                            }
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}
