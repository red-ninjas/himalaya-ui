import { HybridCode, HybridLink } from './components';
import { Image } from '../components';

export const MdxComponents = {
  a: (props: any) => <HybridLink {...props} />,
  img: (props: React.ComponentPropsWithoutRef<'img'>) => <Image {...props} />,
  pre: (props: React.ComponentPropsWithoutRef<'pre'>) => <HybridCode {...props} />,
};
