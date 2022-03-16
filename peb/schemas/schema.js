// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";
// import works from "./works";
import testimonials from "./testimonials";
// import brands from "schemas/brands";
import slides from "./slides";
import stories from "./stories";
// import skills from "schemas/skills";
// import workExperience from "schemas/workExperience";
// import contact from "schemas/contact";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    slides,
    stories,
    testimonials,
    /* Your types here! */
  ]),
});
