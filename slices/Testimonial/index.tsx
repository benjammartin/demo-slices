import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

/**
 * Props for `Testimonial`.
 */
export type TestimonialProps = SliceComponentProps<Content.TestimonialSlice>;

/**
 * Component for "Testimonial" Slices.
 */
const Testimonial = ({ slice }: TestimonialProps): React.ReactElement => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="px-[5%] py-16 md:py-24 lg:py-28"
    >
      <div className="container w-full max-w-lg">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 md:mb-8">
            <PrismicNextImage field={slice.primary.logo} className="max-h-14" />
          </div>
          <blockquote className="text-xl font-bold md:text-2xl">
            <PrismicRichText
              field={slice.primary.quote}
              components={{
                paragraph: ({ children }) => <>&ldquo;{children}&rdquo;</>,
              }}
            />
          </blockquote>
          <div className="mt-6 flex flex-col items-center justify-center md:mt-8">
            <div className="mb-3 md:mb-4">
              <PrismicNextImage
                field={slice.primary.avatar}
                className="size-16 min-h-16 min-w-16 rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="font-semibold">{slice.primary.author_name}</p>
              <p>
                <span>{slice.primary.author_position}</span>,{" "}
                <span>{slice.primary.author_company}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
