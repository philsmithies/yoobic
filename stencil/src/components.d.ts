/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface AppGrid {
        "items": string;
    }
}
declare global {
    interface HTMLAppGridElement extends Components.AppGrid, HTMLStencilElement {
    }
    var HTMLAppGridElement: {
        prototype: HTMLAppGridElement;
        new (): HTMLAppGridElement;
    };
    interface HTMLElementTagNameMap {
        "app-grid": HTMLAppGridElement;
    }
}
declare namespace LocalJSX {
    interface AppGrid {
        "items"?: string;
    }
    interface IntrinsicElements {
        "app-grid": AppGrid;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "app-grid": LocalJSX.AppGrid & JSXBase.HTMLAttributes<HTMLAppGridElement>;
        }
    }
}
