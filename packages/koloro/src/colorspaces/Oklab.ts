import { ColorSpace } from "../ColorSpace";
import { sRGBLinear } from "./sRGBLinear";

const Oklab = new ColorSpace({
  id: "oklab",

  base: sRGBLinear,

  fromBase: (RGB) => {
    let LMS = multiply(RGB_TO_LMS_MATRIX, RGB);
    LMS = LMS.map((value) => Math.cbrt(value)) as unknown as typeof LMS;
    return multiply(LMS_TO_Lab_MATRIX, LMS);
  },

  toBase: (Lab) => {
    let LMS = multiply(Lab_TO_LMS_MATRIX, Lab);
    LMS = LMS.map((value) => value ** 3) as unknown as typeof LMS;
    return multiply(LMS_TO_RGB_MATRIX, LMS);
  },
});

const multiply = (
  matrix: readonly [
    readonly [number, number, number],
    readonly [number, number, number],
    readonly [number, number, number],
  ],
  vector: readonly [number, number, number],
) => {
  return [
    matrix[0][0] * vector[0] +
      matrix[0][1] * vector[1] +
      matrix[0][2] * vector[2],
    matrix[1][0] * vector[0] +
      matrix[1][1] * vector[1] +
      matrix[1][2] * vector[2],
    matrix[2][0] * vector[0] +
      matrix[2][1] * vector[1] +
      matrix[2][2] * vector[2],
  ] as const;
};

// Source: https://bottosson.github.io/posts/oklab/
const RGB_TO_LMS_MATRIX = [
  [0.4122214708, 0.5363325363, 0.0514459929],
  [0.2119034982, 0.6806995451, 0.1073969566],
  [0.0883024619, 0.2817188376, 0.6299787005],
] as const;

// Calculated from RGB_TO_LMS_MATRIX
const LMS_TO_RGB_MATRIX = [
  [4.076741661347994, -3.3077115904081933, 0.2309699287294279],
  [-1.268438004092176, 2.6097574006633715, -0.3413193963102196],
  [-0.004196086541837109, -0.7034186144594496, 1.7076147009309448],
] as const;

// Source: https://bottosson.github.io/posts/oklab/
const LMS_TO_Lab_MATRIX = [
  [0.2104542553, 0.793617785, -0.0040720468],
  [1.9779984951, -2.428592205, 0.4505937099],
  [0.0259040371, 0.7827717662, -0.808675766],
] as const;

// Calculated from LMS_TO_Lab_MATRIX
const Lab_TO_LMS_MATRIX = [
  [0.9999999984505198, 0.39633779217376786, 0.2158037580607588],
  [1.0000000088817609, -0.10556134232365635, -0.06385417477170591],
  [1.0000000546724108, -0.08948418209496575, -1.2914855378640917],
] as const;

export { Oklab };
