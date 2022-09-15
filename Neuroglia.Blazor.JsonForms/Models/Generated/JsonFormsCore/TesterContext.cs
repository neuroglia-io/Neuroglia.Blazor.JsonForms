namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    /// <summary>
    /// Additional context given to a tester in addition to UISchema and JsonSchema.
    /// </summary>
    interface TesterContext
    {
        /// <summary>
        /// The form wide configuration object given to JsonForms.
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("config")]
        object Config { get; set; }

        /// <summary>
        /// The root JsonSchema of the form. Can be used to resolve references.
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("rootSchema")]
        JsonSchema RootSchema { get; set; }

    }
}

