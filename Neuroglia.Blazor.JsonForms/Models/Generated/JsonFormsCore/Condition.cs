namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    /// <summary>
    /// Represents a condition to be evaluated.
    /// </summary>
    public interface Condition
    {
        /// <summary>
        /// The type of condition.
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("type")]
        string? Type { get; set; }

    }
}

