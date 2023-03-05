namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    /// <summary>
    /// The state shape of JSONForms.
    /// </summary>
    public interface JsonFormsState
    {
        /// <summary>
        /// Represents JSONForm's sub-state.
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("jsonforms")]
        JsonFormsSubStates Jsonforms { get; set; }

    }
}

