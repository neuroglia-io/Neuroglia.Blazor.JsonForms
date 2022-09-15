namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    interface OwnPropsOfRenderer
    {
        [System.Text.Json.Serialization.JsonPropertyName("cells")]
        JsonFormsCellRendererRegistryEntry[]? Cells { get; set; }

        /// <summary>
        /// Whether the rendered element should be enabled.
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("enabled")]
        bool? Enabled { get; set; }

        /// <summary>
        /// Optional instance path. Necessary when the actual data
        /// path can not be inferred via the UI schema element as
        /// it is the case with nested controls.
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("path")]
        string? Path { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("renderers")]
        JsonFormsRendererRegistryEntry[]? Renderers { get; set; }

        /// <summary>
        /// The JSON schema that describes the data.
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("schema")]
        JsonSchema? Schema { get; set; }

        /// <summary>
        /// The UI schema to be rendered.
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("uischema")]
        UISchemaElement? Uischema { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("uischemas")]
        JsonFormsUISchemaRegistryEntry[]? Uischemas { get; set; }

        /// <summary>
        /// Whether the rendered element should be visible.
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("visible")]
        bool? Visible { get; set; }

    }
}

