import { createCanvas } from "canvas";
import "canvas-5-polyfill";

import svgpath from "svgpath";
import merge from "deepmerge";

import { Compiler } from "webpack";

import { DeepPartial, OptionsSchema } from "./types";
import { schema } from "./options";
import roundedRectangle from "./roundedRectangle";

export class LogoGeneratorPluginOptionsSchemaError extends Error {}

export default class LogoGeneratorPlugin {
  static defaultOptions: DeepPartial<OptionsSchema> = {
    assetName: "logo.png",

    canvas: {
      size: {
        width: 512,
        height: 512,
      },
    },

    background: {
      x: 10,
      y: 10,
      width: 492,
      height: 492,
      rounded: 50,
      fillStyle: "white",
    },

    icon: {
      x: 0,
      y: 0,
      fillStyle: "black",
      scale: 1.0,
    },
  };

  options: OptionsSchema;

  constructor(options: DeepPartial<OptionsSchema> = {}) {
    options = merge(LogoGeneratorPlugin.defaultOptions, options);

    schema.validate(options).catch(({ errors }) => {
      throw new LogoGeneratorPluginOptionsSchemaError(errors.join(", "));
    });

    if (!options.output) {
      options.output = {};
    }
    if (!options.output.size) {
      options.output.size = {};
    }
    if (!options.output.size.width) {
      options.output.size.width = options.canvas!.size!.width;
    }
    if (!options.output.size.height) {
      options.output.size.height = options.canvas!.size!.height;
    }

    this.options = options as OptionsSchema;
  }

  apply(compiler: Compiler) {
    const pluginName = LogoGeneratorPlugin.name;

    compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
      compilation.hooks.additionalAssets.tap(pluginName, () => {
        const scaleX =
          this.options.output.size.width / this.options.canvas.size.width;
        const scaleY =
          this.options.output.size.height / this.options.canvas.size.height;

        const canvas = createCanvas(
          this.options.canvas.size.width * scaleX,
          this.options.canvas.size.height * scaleY
        );

        const ctx = canvas.getContext("2d");

        ctx.scale(scaleX, scaleY);

        // draw the background
        ctx.beginPath();
        roundedRectangle(ctx, this.options.background);
        ctx.fillStyle = this.options.background.fillStyle;
        ctx.fill();

        // draw the icon
        ctx.fillStyle = this.options.icon.fillStyle;
        ctx.fill(
          new Path2D(
            svgpath(this.options.icon.svgPath)
              .scale(this.options.icon.scale)
              .translate(this.options.icon.x, this.options.icon.y)
              .toString()
          )
        );

        const stream = canvas.createPNGStream();
        compilation.assets[this.options.assetName] = {
          source: () => stream.read(),
          size: () => stream.readableLength,
        };
      });
    });
  }
}
