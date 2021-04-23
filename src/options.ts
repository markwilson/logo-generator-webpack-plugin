import yup from "yup";

export const schema = yup.object().shape({
  assetName: yup.string().required(),
  canvas: yup
    .object()
    .shape({
      size: yup.object().shape({
        width: yup.number().required(),
        height: yup.number().required(),
      }),
    })
    .required(),
  output: yup.object().shape({
    size: yup.object().shape({
      width: yup.number(),
      height: yup.number(),
    }),
  }),
  background: yup
    .object()
    .shape({
      x: yup.number().required(),
      y: yup.number().required(),
      width: yup.number().required(),
      height: yup.number().required(),
      rounded: yup.number().required(),
      fillStyle: yup.string().required(),
    })
    .required(),
  icon: yup
    .object()
    .shape({
      x: yup.number().required(),
      y: yup.number().required(),
      fillStyle: yup.string().required(),
      svgPath: yup.string().required(),
      scale: yup.number().required(),
    })
    .required(),
});
