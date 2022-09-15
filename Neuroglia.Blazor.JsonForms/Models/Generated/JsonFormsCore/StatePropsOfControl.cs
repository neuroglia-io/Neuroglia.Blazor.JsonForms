namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    /// <summary>
    /// State-based props of a Control
    /// </summary>
    interface StatePropsOfControl : StatePropsOfScopedRenderer
    {
        /// <summary>
        /// Description of input cell
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("description")]
        string? Description { get; set; }

        /// <summary>
        /// The label for the rendered element.
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("label")]
        string Label { get; set; }

        /// <summary>
        /// Whether the rendered data is required.
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("required")]
        bool? Required { get; set; }

    }
}

