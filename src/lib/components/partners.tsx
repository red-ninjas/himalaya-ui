import { Carousel, CarouselItem, ContentLayout, FadeInEffect, Text, useTheme } from 'components';
import { RedNinjas, Striked } from './icons';

export default function Partners() {
  const theme = useTheme();
  return (
    <FadeInEffect translateY="4rem">
      <div className="carousel">
        <Text mb={1.2} small style={{ color: theme.palette.accents_4, textTransform: 'uppercase' }}>
          With heavy support from
        </Text>
        <ContentLayout>
          <Carousel
            options={{
              perPage: 6,
              type: 'loop',
              pagination: true,
              arrows: false,
              autoplay: true,
              pauseOnHover: true,
              gap: '5rem',

              breakpoints: {
                480: {
                  perPage: 2,
                },
                640: {
                  perPage: 3,
                },
                960: {
                  perPage: 4,
                },
                1100: {
                  perPage: 5,
                },
                1200: {
                  perPage: 6,
                },
              },
            }}
          >
            <CarouselItem>
              <a href="https://striked.gg" rel="noreferrer" target="_blank" className="partner">
                <Striked></Striked>
              </a>
            </CarouselItem>
            <CarouselItem>
              <a href="https://redninjas.dev" rel="noreferrer" target="_blank" className="partner">
                <RedNinjas></RedNinjas>
              </a>
            </CarouselItem>
          </Carousel>
        </ContentLayout>

        <style jsx>{`
          .carousel {
            padding: 45px 0px;
            padding-top: 80px;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          :global(a.partner) {
            display: inline-flex;
            align-items: center;
            justify-items: center;
            font-size: clamp(24px, 21vw, 36px);
            color: ${theme.palette.accents_6};
            width: 100%;
            height: 100%;
          }

          :global(a.partner svg) {
            width: 100%;
          }

          :global(a.partner:hover) {
            color: ${theme.palette.foreground};
          }
        `}</style>
      </div>
    </FadeInEffect>
  );
}
