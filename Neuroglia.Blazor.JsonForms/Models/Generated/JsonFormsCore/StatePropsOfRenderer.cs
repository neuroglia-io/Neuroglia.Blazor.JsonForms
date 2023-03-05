namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    /// <summary>
    /// State-based props of a {@link Renderer}.
    /// </summary>
    public interface StatePropsOfRenderer
    {
        /// <summary>
        /// All available cell renderers.
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("cells")]
        JsonFormsCellRendererRegistryEntry[]? Cells { get; set; }

        /// <summary>
        /// Any configuration options for the element.
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("config")]
        object? Config { get; set; }

        /// <summary>
        /// The data to be rendered.
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("data")]
        object? Data { get; set; }

        /// <summary>
        /// Whether the rendered element should be enabled.
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("enabled")]
        bool Enabled { get; set; }

        /// <summary>
        /// Instance path the data is written to, in case of a control.
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("path")]
        string Path { get; set; }

        /// <summary>
        /// All available renderers.
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("renderers")]
        JsonFormsRendererRegistryEntry[]? Renderers { get; set; }

        /// <summary>
        /// The JSON schema that describes the data.
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("schema")]
        JsonSchema Schema { get; set; }

        /// <summary>
        /// The UI schema to be rendered.
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("uischema")]
        UISchemaElement Uischema { get; set; }

        /// <summary>
        /// Whether the rendered element should be visible.
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("visible")]
        bool Visible { get; set; }

    }
}

