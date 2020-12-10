import {
  required,
  email,
  max_value,
  min_value,
  max,
  integer
} from "vee-validate/dist/rules";
import { extend } from "vee-validate";

extend("required", {
  ...required,
  message: "This field is required"
});

extend("max_value", {
  ...max_value,
  message: "This field must be less than {max}"
});
extend("min_value", {
  ...min_value,
  message: "This field must be higher than {min}"
});
extend("max", {
  ...max,
  message: "This field must be {length} characters or less"
});

extend("email", {
  ...email,
  message: "This field must be a valid email"
});
extend("integer", {
  ...integer,
  message: "This field must be a number"
});

extend("unique", {
  message: "This field was duplicated",
  validate(value, obj) {
    return obj.filter(item => item == value).length < 2;
  }
});
