declare module 'babel-plugin-glsl/macro';

import { ShaderMaterial } from 'three';
import { LiquidShaderMaterial } from './components/Home';

declare module 'babel-plugin-glsl/macro' {
  const content: any;
  export default content;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      liquidShaderMaterial: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        attach?: string;
        args?: ConstructorParameters<typeof ShaderMaterial>;
        ref?: React.Ref<LiquidShaderMaterial>;
      };
    }
  }
}
