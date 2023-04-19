import * as Utils from "../../helpers/utils";

const SIZE_REGEX = "^[\\d]{1,}[xX]{1}[\\d]{1,}[\\s]{0,1}[a-z]{0,3}$";

function validate(inputs) {
  let errors = {};

  if (!inputs.name || Utils.isSpace(inputs.name)) {
    errors["name"] = "Nombre de la obra requerida";
  }

  if (!inputs.price || inputs.price < 0) {
    errors["price"] = "Precio inválido";
  }

  if (!inputs.imageUrl) {
    errors["imageUrl"] = "La obra debe tener una imagen";
  }

  if (!inputs.size || !inputs.size.match(SIZE_REGEX)) {
    errors["size"] = "Dimensiones no validas; ejemplo correcto: 35x50 cm";
  }

  if (!inputs.stock || inputs.stock < 0) {
    errors["stock"] = "Cantidad de producto disponible inválido";
  }

  if (typeof inputs.available !== "boolean") {
    errors["available"] = "Disponibilidad inválida";
  }

  if (!inputs.author_id) {
    errors["author"] =
      'Seleccione un autor, si no existe seleccione "Desconocido"';
  }

  if (!inputs.category_id) {
    errors["category"] = "Seleccione una categoría";
  }

  if (!inputs.technique_id) {
    errors["technique"] = "Seleccione una técnica";
  }

  if (!inputs.support_id) {
    errors["support"] = "Seleccione una soporte";
  }

  return errors;
}

export default validate;
