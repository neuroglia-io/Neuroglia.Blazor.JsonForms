namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    /// <summary>
    /// Common base public interface for any UI schema element.
    /// </summary>
    public interface UISchemaElement
    {
        /// <summary>
        /// Any additional options.
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("options")]
        System.Collections.Generic.Dictionary<string, object>? Options { get; set; }

        /// <summary>
        /// An optional rule.
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("rule")]
        Rule? Rule { get; set; }

        /// <summary>
        /// The type of this UI schema element.
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("type")]
        string Type { get; set; }

    }
}

