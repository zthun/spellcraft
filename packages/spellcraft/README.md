# Spellcraft

What's your preferred JavaScript framework? Many would likely mention options such as React, Angular, Vue, Svelte, or
even the latest framework freshly unveiled just moments ago. It often feels like just as you've mastered one framework,
a new contender emerges, offering little innovation but rather a rehash of existing concepts. What exacerbates the
situation is the tendency of companies and developers to swiftly adopt the latest shiny offering without much scrutiny.

Having spent years working with React, I decided to delve into Web Components, which offer native integration with
JavaScript. The challenge with Web Components lies in the extensive boilerplate code required unless you opt for a
framework like Lit or Lightning. Yet, this decision brings us full circle, binding us once more to a specific framework,
only to have it potentially replaced by the next shiny framework in a matter of months or years. Consequently, you find
yourself inevitably facing the task of rewriting your application yet again to accommodate the latest trend. Thus, I
tried my best to avoid this, and attempted to create patterns and techniques that can be used to dynamically build
components without binding myself to any framework. In short, _I wanted a library of techniques and helpers_ and not a
complete framework that I would have to be dependant on for a limited time.

I began to realize that my efforts were morphing into yet another tangled mess of object-oriented code, all in an
attempt to recycle boilerplate code that the standard DOM model struggles to accommodate. While I appreciated the
concept of Lit's decorators, I balked at the idea of everything inheriting from LitElement. Such an approach would
merely tether me to another framework, necessitating ongoing maintenance and introducing yet another cumbersome peer
dependency to ensure adherence to a specific version. Frustrated, I embarked on a journey of refactoring, aiming to
streamline the architecture into higher-order classes. However, this path presented its own set of challenges. Before
long, I found myself grappling with a convoluted hierarchy—a daunting pyramid of complexity that seemed to defy
rationalization.

```ts
export class FancyComponent extends WithRegister(
  'fancy-component',
  WithTemplate(
    WithRender(
      WithDependency(
        [MyOtherComponent],
        WithLogging(WithService(WhyNot(HowAboutAnother(OhGodMakeItStop(HTMLElement)))))
      )
    )
  )
) {
  public template() {
    return;
    html`
      <style>
        .ZFancyComponent-root {
          color: red;
        }
      </style>
      <div class="ZFancyComponent-root">That inheritance tree is disgusting!</div>
    `;
  }
}
```

While higher-order components provided some progress toward my goals, I remained steadfast in my desire to circumvent
direct inheritance entirely. My aim was to cultivate code that was both flat, effortlessly readable, and composable.
Yearning for an approach akin to utilizing Lit decorators, I forged ahead and conceived Spellcraft—a library designed to
encapsulate these principles without imposing the constraints of a specific versioned framework.

```ts
import {
  ZComponentRegister,
  ZComponentRenderTemplate,
  ZComponentRenderOnConnect,
  ZComponentShadow,
  IZComponentTemplate
} from '@zthun/spellcraft';

import { html } from '@zthun/helpful-fn';

// TypeScript has some limitations when it comes to
// using decorators.  The ZComponentRenderTemplate decorator
// adds a render function to our component for us, but
// TypeScript cannot detect this yet.  See
// https://github.com/microsoft/TypeScript/issues/4881
// for more information about why this is needed.
export interface FancyComponent extends IZComponentRender {}

// Registers the component in the custom elements registry
// This decorator is always meant to be at the top of the decorator
// list
@ZComponentRegister('z-fancy-component')
// Adds a lifecycle event, connectedCallback, which invokes the
// render method.
@ZComponentRenderOnConnect()
// Adds a render method to the component, which clears the
// current children of the target element (this or the shadow root),
// and then sets the inner html to the result of the template
// method.
@ZComponentRenderTemplate()
// Adds a shadow root - this will cause the render method to
// render in the shadow root instead of the component itself.
@ZComponentShadow()
export class FancyComponent extends HTMLElement implements IZComponentTemplate {
  public template() {
    return;
    html`
      <style>
        .ZFancyComponent-root {
          color: green;
        }
      </style>
      <div class="ZFancyComponent-root">
        I can now focus on just using aspects of a component rather than constructing a framework around them.
      </div>
    `;
  }
}
```

Spellcraft emerges as a web component library that harmonizes with existing frameworks without disrupting their
functionality. Not intended as a peer dependency, Spellcraft offers flexibility: you can install, bundle, and utilize
multiple versions concurrently without risking global scope conflicts. Seamlessly integrating into your application,
Spellcraft obviates the need for a wholesale redesign and liberates individual components from framework entanglements.
Whether you opt for full integration or cherry-pick specific features, Spellcraft empowers you to tailor your approach.
Ultimately, in combating framework bloat, the solution lies in embracing
[Aspect-Oriented Programming](https://en.wikipedia.org/wiki/Aspect-oriented_programming).

## Installation

```bash
# Spellcraft is meant to be installed as a dependency, NOT a peer dependency that is made to be someone
# else's problem.

# Using npm
> npm install @zthun/spellcraft

# Using yarn
> yarn add @zthun/spellcraft
> yarn workspace @org/package add @zthun/Spellcraft
```
