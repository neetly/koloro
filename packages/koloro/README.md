# Koloro

[![CI](https://github.com/neetly/koloro/actions/workflows/ci.yml/badge.svg)](https://github.com/neetly/koloro/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/koloro)](https://www.npmjs.com/package/koloro)

```sh
yarn add koloro
```

```ts
import { Color } from "koloro";

const color = new Color("koloro-lch", [0.5, 0.2, 60])
  .to("srgb")
  .toString({ format: "hex" });
```

## Colorspace

### Oklab to Koloro

$$
\begin{align*}
L_{Koloro} & = \begin{cases}
  116 L_{Oklab} - 16 , & L_{Oklab} \gt \delta \\
  8 \left( \dfrac {L_{Oklab}} {\delta} \right) ^ {3} , & L_{Oklab} \le \delta \\
\end {cases} \\
a_{Koloro} & = 100 a_{Oklab} \\
b_{Koloro} & = 100 b_{Oklab} \\
\end{align*}
$$

where

$$
\delta = \tfrac{24}{116}
$$

### Koloro to Oklab

$$
\begin{align*}
L_{Oklab} & = \begin{cases}
  \dfrac {L_{Koloro} + 16} {116} , & L_{Koloro} \gt 8 \\
  \delta \left( \dfrac {L_{Koloro}} {8} \right) ^ {\tfrac{1}{3}} , & L_{Koloro} \le 8 \\
\end{cases} \\
a_{Oklab} & = \dfrac {a_{Koloro}} {100} \\
b_{Oklab} & = \dfrac {b_{Koloro}} {100} \\
\end{align*}
$$

where

$$
\delta = \tfrac{24}{116}
$$

## References

- https://bottosson.github.io/posts/oklab/
- https://raphlinus.github.io/color/2021/01/18/oklab-critique.html
- https://github.com/svgeesus/svgeesus.github.io/blob/master/Color/OKLab-notes.md
