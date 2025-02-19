import React from "react";

const Limits = () => {
  return (
    <>
      <div className="flex flex-col items-center w-full gap-10 md:gap-20 ">
        <p className="text-3xl font-extrabold md:text-4xl">Set Limit</p>
        
        {/* Sensor 1 */}
        <div className="flex flex-col items-center w-full max-w-md gap-4 md:flex-row md:gap-20 md:max-w-none md:items-center md:justify-center">
          <p className="text-xl font-extrabold md:text-2xl">Sensor 1</p>
          <input
            className="w-full max-w-xs p-2 bg-transparent border-2 rounded-md md:w-80"
            type="number"
          />
          <button
            type="button"
            className="text-white bg-orange-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm p-2.5 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center me-2 mb-2 dark:focus:ring-yellow-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-col items-center w-full max-w-md gap-4 md:flex-row md:gap-20 md:max-w-none md:items-center md:justify-center">
          <p className="text-xl font-extrabold md:text-2xl">Sensor 2</p>
          <input
            className="w-full max-w-xs p-2 bg-transparent border-2 rounded-md md:w-80"
            type="number"
          />
          <button
            type="button"
            className="text-white bg-orange-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm p-2.5 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center me-2 mb-2 dark:focus:ring-yellow-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-col items-center w-full max-w-md gap-4 md:flex-row md:gap-20 md:max-w-none md:items-center md:justify-center">
          <p className="text-xl font-extrabold md:text-2xl">Sensor 3</p>
          <input
            className="w-full max-w-xs p-2 bg-transparent border-2 rounded-md md:w-80"
            type="number"
          />
          <button
            type="button"
            className="text-white bg-orange-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm p-2.5 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center me-2 mb-2 dark:focus:ring-yellow-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"
              />
            </svg>
          </button>
        </div>

        {/* <button
          type="button"
          className="w-full max-w-xs md:w-36 h-16 text-white bg-orange-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-extrabold rounded-lg text-xl md:text-2xl px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
        >
          Save
        </button> */}
      </div>
    </>
  );
};

export default Limits;
