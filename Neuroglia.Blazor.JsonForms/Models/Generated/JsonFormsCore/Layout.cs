namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    /// <summary>
    /// Represents a layout element which can order its children
    /// in a specific way.
    /// </summary>
    interface Layout : UISchemaElement
    {
        /// <summary>
        /// The child elements of this layout.
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("elements")]
        UISchemaElement[] Elements { get; set; }

    }
}

