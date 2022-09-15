namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    /// <summary>
    /// Interface for describing an UI schema element that may be labeled.
    /// </summary>
    interface Labelable<T>
    {
        /// <summary>
        /// Label for UI schema element.
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("label")]
        Neuroglia.Blazor.JsonForms.Models.GeneratedTypes.TStringUnion? Label { get; set; }

    }
}

