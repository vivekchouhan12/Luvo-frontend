import { useState } from "react";

const images = [
  "Poppin' Deli.png",
  "Green House Bistro.png",
  "Pin and Pan.png",
  "Oliver Bistro & Bake House.png",
];

const poppin = () => {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  return (
    <div className="">
      <div className="p-30 w-full grid grid-cols-2 gap-10">
        {/*div 1 */}
        <div className="w-full mx-auto p-4">
          {/* Main Image */}
          <div className="w-auto h-2/3 overflow-hidden rounded-lg border border-gray-300 flex justify center">
            <img
              src={selectedImage}
              alt="Selected"
              className="object-cover w-full h-full"
            />
          </div>

          {/* Thumbnails */}
          <div className="mt-4 flex space-x-2 justify-center">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(img)}
                className={`border-2 rounded-lg overflow-hidden w-30 h-30 ${
                  selectedImage === img ? "border-blue-500" : "border-gray-300"
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </button>
            ))}
          </div>
        </div>
        {/* Div 2 */}
        <div className="">
          <h1 className=" text-3xl font-bold">Poppin' Deli</h1>
          <h1 className=" text-3xl font-semibold mt-2">Overview</h1>
          <span className="text-3xl mt-2 flex gap-2">
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
                d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
              />
            </svg>
            <span>4.5</span>
          </span>
          <p className="w-auto h-auto my-5">
            Mexican, Pizza, Desserts, Beverages, Biryani, North Indian, Italian,
            Pasta 265, E2, Arera Colony, Bhopal
          </p>
          <form>
            <h2 className="text-xl">colors</h2>
            <div className="text-2xl">
              Having fun "Lorem ipsum dolor sit amet
            </div>
            <button className="text-l text-white font-bold text-center bg-red-700 rounded w-1/2 h-12 mt-7">
              Add to Visit
            </button>
            <span className="pl-4">Icon</span>
          </form>
          <section className="additional ">
            <h2 className="mt-9 mb-5">
              -------------------------------------------------
            </h2>

            <div x-data="{ open: false }" className="space-y-4">
              <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none">
                Info
              </button>

              <div
                x-show="open"
                className="transition-all duration-300 ease-in-out"
              >
                <ul
                  role="list"
                  className="space-y-2 p-4 bg-white rounded shadow-md border border-gray-200"
                >
                  <li className="text-gray-700">Dinner</li>
                  <li className="text-gray-700">Lunch</li>
                  <li className="text-gray-700">less Noisy</li>
                  <li className="text-gray-700">ALL Day Breakfast</li>
                  <li className="text-gray-700">Lounge Seating</li>
                  <li className="text-gray-700">Vegetarian Friendly</li>
                  <li className="text-gray-700">Romantic Dining</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default poppin;
