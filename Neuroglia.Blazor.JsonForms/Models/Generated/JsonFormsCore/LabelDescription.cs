namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    /// <summary>
    /// Represents an object that can be used to configure a label.
    /// </summary>
    interface LabelDescription
    {
        /// <summary>
        /// Optional property that determines whether to show this label.
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("show")]
        bool? Show { get; set; }

        /// <summary>
        /// An optional text to be displayed.
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("text")]
        string? Text { get; set; }

    }
}

