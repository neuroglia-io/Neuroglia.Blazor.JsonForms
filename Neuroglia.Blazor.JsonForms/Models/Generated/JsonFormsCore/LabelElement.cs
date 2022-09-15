namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    /// <summary>
    /// A label element.
    /// </summary>
    interface LabelElement : UISchemaElement, Internationalizable
    {
        /// <summary>
        /// The text of label.
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("text")]
        string Text { get; set; }

    }
}

