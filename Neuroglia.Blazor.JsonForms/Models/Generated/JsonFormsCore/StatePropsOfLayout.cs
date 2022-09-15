namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    /// <summary>
    /// State props of a layout;
    /// </summary>
    interface StatePropsOfLayout : StatePropsOfRenderer
    {
        /// <summary>
        /// Direction for the layout to flow
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("direction")]
        string Direction { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("label")]
        string? Label { get; set; }

    }
}

