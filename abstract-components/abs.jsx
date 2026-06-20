const Content = ({ item }) => {
  return (
    <div
      className="
    bg-white"
    >
      <div className="px-8 max-w-[80rem] mx-auto py-24">
        <div className="flex justify-between items-center px-0">
          <h2 className="text-[oklch(21%_.034_264.665)] tracking-[-0.025em] font-bold text-xl leading-[1.3333]">
            Trending products
          </h2>
          <a
            href="#"
            className="block text-[oklch(51.1%_.262_276.966)] font-semibold text-sm leading-[1.4286]"
          >
            See everything
            <span aria-hidden="true"> →</span>
          </a>
        </div>

        <div className="relative mt-8">
          <div className="relative  mb-6 w-full overflow-x-auto pb-6">
            <ul
              role="list"
              className=" mx-0 grid grid-cols-4 gap-4 flex gap-x-8 nep"
            >
              <li className="inline-flex flex-col w-auto  text-center space-x-0">
                <div className=" relative ">
                  <img
                    src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-02-product-01.jpg"
                    alt="Black machined steel pen with hexagonal grip and small white logo at top."
                    className="object-cover rounded-md w-full aspect-square"
                  />
                  <div className=" mt-6">
                    <p className=" text-sm leading-[1.4286] text-[oklch(55.1%_.027_264.364)]">
                      Black
                    </p>
                    <h3 className="text-[oklch(21%_.034_264.665)] font-semibold mt-1">
                      <a href="#">
                        <span className="absolute inset-0"></span>
                        Machined Pen
                      </a>
                    </h3>
                    <p className="mt-1 text-[oklch(21%_.034_264.665)]">$35</p>
                  </div>
                </div>

                <h4 className="sr-only">Available colors</h4>
                <ul
                  role="list"
                  className="pt-6 flex justify-center items-center mt-auto"
                >
                  <li
                    style={{ backgroundColor: "#111827" }}
                    className="w-4 h-4 border border-[oklab(0%_none_none_/_0.1)] rounded-[3.40282e38px] ml-[0.75rem]"
                  >
                    <span className="sr-only">Black</span>
                  </li>
                  <li
                    style={{ backgroundColor: "#fde68a" }}
                    className="w-4 h-4 border border-[oklab(0%_none_none_/_0.1)] rounded-[3.40282e38px] ml-[0.75rem]"
                  >
                    <span className="sr-only">Brass</span>
                  </li>
                  <li
                    style={{ backgroundColor: "#e5e7eb" }}
                    className="w-4 h-4 border border-[oklab(0%_none_none_/_0.1)] rounded-[3.40282e38px] ml-[0.75rem]"
                  >
                    <span className="sr-only">Chrome</span>
                  </li>
                </ul>
              </li>
              <li className="inline-flex flex-col w-auto text-center space-x-0">
                <div className="relative ">
                  <img
                    src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-02-product-02.jpg"
                    alt="Black porcelain mug with modern square handle and natural clay accents on rim and bottom."
                    className="object-cover rounded-md w-full aspect-square"
                  />
                  <div className=" mt-6">
                    <p className=" text-sm leading-[1.4286] text-[oklch(55.1%_.027_264.364)]">
                      Matte Black
                    </p>
                    <h3 className="text-[oklch(21%_.034_264.665)] font-semibold mt-1">
                      <a href="#">
                        <span className="absolute inset-0"></span>
                        Earthen Mug
                      </a>
                    </h3>
                    <p className="mt-1 text-[oklch(21%_.034_264.665)]">$28</p>
                  </div>
                </div>

                <h4 className="sr-only">Available colors</h4>
                <ul
                  role="list"
                  className="pt-6 flex justify-center items-center mt-auto"
                >
                  <li
                    style={{ backgroundColor: "#4b5563" }}
                    className="w-4 h-4 border border-[oklab(0%_none_none_/_0.1)] rounded-[3.40282e38px] ml-[0.75rem]"
                  >
                    <span className="sr-only">Matte Black</span>
                  </li>
                  <li
                    style={{ backgroundColor: "#fef3c7" }}
                    className="w-4 h-4 border border-[oklab(0%_none_none_/_0.1)] rounded-[3.40282e38px] ml-[0.75rem]"
                  >
                    <span className="sr-only">Natural</span>
                  </li>
                </ul>
              </li>
              <li className="inline-flex flex-col w-auto text-center space-x-0">
                <div className="  relative ">
                  <img
                    src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-02-product-03.jpg"
                    alt="Natural leather journal with brass disc binding and three paper refill sets."
                    className="object-cover rounded-md w-full aspect-square"
                  />
                  <div className=" mt-6">
                    <p className=" text-sm leading-[1.4286] text-[oklch(55.1%_.027_264.364)]">
                      Natural
                    </p>
                    <h3 className="text-[oklch(21%_.034_264.665)] font-semibold mt-1">
                      <a href="#">
                        <span className="absolute inset-0"></span>
                        Leatherbound Daily Journal Set
                      </a>
                    </h3>
                    <p className="mt-1 text-[oklch(21%_.034_264.665)]">$50</p>
                  </div>
                </div>

                <h4 className="sr-only">Available colors</h4>
                <ul
                  role="list"
                  className="pt-6 flex justify-center items-center mt-auto"
                >
                  <li
                    style={{ backgroundColor: "#fef3c7" }}
                    className="w-4 h-4 border border-[oklab(0%_none_none_/_0.1)] rounded-[3.40282e38px] ml-[0.75rem]"
                  >
                    <span className="sr-only">Natural</span>
                  </li>
                  <li
                    style={{ backgroundColor: "#1f2937" }}
                    className="w-4 h-4 border border-[oklab(0%_none_none_/_0.1)] rounded-[3.40282e38px] ml-[0.75rem]"
                  >
                    <span className="sr-only">Black</span>
                  </li>
                  <li
                    style={{ backgroundColor: "#7c2d12" }}
                    className="w-4 h-4 border border-[oklab(0%_none_none_/_0.1)] rounded-[3.40282e38px] ml-[0.75rem]"
                  >
                    <span className="sr-only">Brown</span>
                  </li>
                </ul>
              </li>
              <li className="inline-flex flex-col w-auto text-center space-x-0">
                <div className="  relative ">
                  <img
                    src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-02-product-04.jpg"
                    alt="Black leather journal with brass disc binding."
                    className="object-cover rounded-md w-full aspect-square"
                  />
                  <div className=" mt-6">
                    <p className=" text-sm leading-[1.4286] text-[oklch(55.1%_.027_264.364)]">
                      Black
                    </p>
                    <h3 className="text-[oklch(21%_.034_264.665)] font-semibold mt-1">
                      <a href="#">
                        <span className="absolute inset-0"></span>
                        Leatherbound Daily Journal
                      </a>
                    </h3>
                    <p className="mt-1 text-[oklch(21%_.034_264.665)]">$50</p>
                  </div>
                </div>

                <h4 className="sr-only">Available colors</h4>
                <ul
                  role="list"
                  className="pt-6 flex justify-center items-center mt-auto"
                >
                  <li
                    style={{ backgroundColor: "#111827" }}
                    className="w-4 h-4 border border-[oklab(0%_none_none_/_0.1)] rounded-[3.40282e38px] ml-[0.75rem]"
                  >
                    <span className="sr-only">Black</span>
                  </li>
                  <li
                    style={{ backgroundColor: "#7c2d12" }}
                    className="w-4 h-4 border border-[oklab(0%_none_none_/_0.1)] rounded-[3.40282e38px] ml-[0.75rem]"
                  >
                    <span className="sr-only">Brown</span>
                  </li>
                  <li
                    style={{ backgroundColor: "#fef3c7" }}
                    className="w-4 h-4 border border-[oklab(0%_none_none_/_0.1)] rounded-[3.40282e38px] ml-[0.75rem]"
                  >
                    <span className="sr-only">Natural</span>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <div className="px-4 mt-12">
          <a
            href="#"
            className="text-[oklch(51.1%_.262_276.966)] font-semibold text-sm leading-[1.42857]"
          >
            See everything
            <span aria-hidden="true"> →</span>
          </a>
        </div>
      </div>
    </div>
  );
};
export default Content;
