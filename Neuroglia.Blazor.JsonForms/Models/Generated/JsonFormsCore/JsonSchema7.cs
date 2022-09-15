namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    interface JsonSchema7
    {
        /// <summary>
        /// This is important because it tells refs where
        /// the root of the document is located
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("$id")]
        string? Id { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("$ref")]
        string? Ref { get; set; }

        /// <summary>
        /// It is recommended that the meta-schema is
        /// included in the root of any JSON Schema
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("$schema")]
        string? Schema { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("additionalItems")]
        Neuroglia.Blazor.JsonForms.Models.GeneratedTypes.JsonSchema7BoolUnion? AdditionalItems { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("additionalProperties")]
        Neuroglia.Blazor.JsonForms.Models.GeneratedTypes.JsonSchema7BoolUnion? AdditionalProperties { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("allOf")]
        JsonSchema7[]? AllOf { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("anyOf")]
        JsonSchema7[]? AnyOf { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("const")]
        object? Const { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("contains")]
        JsonSchema7? Contains { get; set; }

        /// <summary>
        /// Default json for the object represented by
        /// this schema
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("default")]
        object? Default { get; set; }

        /// <summary>
        /// Holds simple JSON Schema definitions for
        /// referencing from elsewhere.
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("definitions")]
        System.Collections.Generic.Dictionary<string, JsonSchema7>? Definitions { get; set; }

        /// <summary>
        /// If the key is present as a property then the
        /// string of properties must also be present.
        /// If the value is a JSON Schema then it must
        /// also be valid for the object if the key is
        /// present.
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("dependencies")]
        System.Collections.Generic.Dictionary<string, Neuroglia.Blazor.JsonForms.Models.GeneratedTypes.StringArrayJsonSchema7Union>? Dependencies { get; set; }

        /// <summary>
        /// Schema description
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("description")]
        string? Description { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("else")]
        JsonSchema7? Else { get; set; }

        /// <summary>
        /// Enumerates the values that this schema can be
        /// e.g.
        /// {"type": "string",
        ///  "enum": ["red", "green", "blue"]}
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("enum")]
        object[]? Enum { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("errorMessage")]
        object? ErrorMessage { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("examples")]
        object[]? Examples { get; set; }

        /// <summary>
        /// If true maximum must be &gt; value, &gt;= otherwise
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("exclusiveMaximum")]
        double? ExclusiveMaximum { get; set; }

        /// <summary>
        /// If true minimum must be &lt; value, &lt;= otherwise
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("exclusiveMinimum")]
        double? ExclusiveMinimum { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("format")]
        string? Format { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("if")]
        JsonSchema7? If { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("items")]
        Neuroglia.Blazor.JsonForms.Models.GeneratedTypes.JsonSchema7ArrayJsonSchema7Union? Items { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("maxItems")]
        double? MaxItems { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("maxLength")]
        double? MaxLength { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("maxProperties")]
        double? MaxProperties { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("maximum")]
        double? Maximum { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("minItems")]
        double? MinItems { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("minLength")]
        double? MinLength { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("minProperties")]
        double? MinProperties { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("minimum")]
        double? Minimum { get; set; }

        /// <summary>
        /// The value must be a multiple of the number
        /// (e.g. 10 is a multiple of 5)
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("multipleOf")]
        double? MultipleOf { get; set; }

        /// <summary>
        /// The entity being validated must not match this schema
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("not")]
        JsonSchema7? Not { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("oneOf")]
        JsonSchema7[]? OneOf { get; set; }

        /// <summary>
        /// This is a regex string that the value must
        /// conform to
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("pattern")]
        string? Pattern { get; set; }

        /// <summary>
        /// The key of this object is a regex for which
        /// properties the schema applies to
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("patternProperties")]
        System.Collections.Generic.Dictionary<string, JsonSchema7>? PatternProperties { get; set; }

        /// <summary>
        /// The keys that can exist on the object with the
        /// json schema that should validate their value
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("properties")]
        System.Collections.Generic.Dictionary<string, JsonSchema7>? Properties { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("propertyNames")]
        JsonSchema7? PropertyNames { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("readOnly")]
        bool? ReadOnly { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("required")]
        string[]? Required { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("then")]
        JsonSchema7? Then { get; set; }

        /// <summary>
        /// Title of the schema
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("title")]
        string? Title { get; set; }

        /// <summary>
        /// The basic type of this schema, can be one of
        /// [string, number, object, array, boolean, null]
        /// or an array of the acceptable types
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("type")]
        Neuroglia.Blazor.JsonForms.Models.GeneratedTypes.StringArrayStringUnion? Type { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("uniqueItems")]
        bool? UniqueItems { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("writeOnly")]
        bool? WriteOnly { get; set; }

    }
}

