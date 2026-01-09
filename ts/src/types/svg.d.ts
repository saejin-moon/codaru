/// <reference types="vite/client" />

import type { FunctionalComponent } from 'preact';
import type { SVGProps } from 'preact/compat';

declare module "*.svg?react" {
  import type { FunctionalComponent } from "preact";
  const component: FunctionalComponent<SVGProps<SVGSVGElement>>;
  export default component;
}