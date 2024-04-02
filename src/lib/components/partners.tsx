'use client';
import { PageWidth, Text } from 'components';
import Carousel from 'components/carousel';
import { motion } from 'framer-motion';
import { RedNinjas, Striked } from './icons';

export default function Partners() {
  return (
    <motion.div
      style={{ width: '100%' }}
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, filter: 'blur(0px)' }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <div className="carousel">
        <Text mb={1.2} small style={{ color: 'var(--color-background-500)', textTransform: 'uppercase' }}>
          With heavy support from
        </Text>
        <PageWidth>
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
            <Carousel.Item>
              <a href="https://striked.gg" rel="noreferrer" target="_blank" className="partner">
                <Striked></Striked>
              </a>
            </Carousel.Item>
            <Carousel.Item>
              <a href="https://redninjas.dev" rel="noreferrer" target="_blank" className="partner">
                <RedNinjas></RedNinjas>
              </a>
            </Carousel.Item>
          </Carousel>
        </PageWidth>

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
            color: var(--color-background-300);
            width: 100%;
            height: 100%;
          }

          :global(a.partner svg) {
            width: 100%;
          }

          :global(a.partner:hover) {
            color: var(--color-foreground-1000);
          }
        `}</style>
      </div>
    </motion.div>
  );
}
