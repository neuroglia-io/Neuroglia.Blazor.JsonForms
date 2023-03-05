namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    /// <summary>
    /// public interface for describing an UI schema element that is referencing
    /// a subschema. The value of the scope may be a JSON Pointer.
    /// </summary>
    public interface Scopable
    {
        /// <summary>
        /// The scope that determines to which part this element should be bound to.
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("scope")]
        string? Scope { get; set; }

    }
}

