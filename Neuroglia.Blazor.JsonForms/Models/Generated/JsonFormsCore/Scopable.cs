namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    /// <summary>
    /// Interface for describing an UI schema element that is referencing
    /// a subschema. The value of the scope may be a JSON Pointer.
    /// </summary>
    interface Scopable
    {
        /// <summary>
        /// The scope that determines to which part this element should be bound to.
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("scope")]
        string? Scope { get; set; }

    }
}

