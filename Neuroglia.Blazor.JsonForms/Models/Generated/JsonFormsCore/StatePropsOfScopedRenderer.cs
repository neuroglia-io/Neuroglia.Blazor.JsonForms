namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    /// <summary>
    /// State-based properties for UI schema elements that have a scope.
    /// </summary>
    interface StatePropsOfScopedRenderer : StatePropsOfRenderer
    {
        /// <summary>
        /// Any validation errors that are caused by the data to be rendered.
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("errors")]
        string Errors { get; set; }

        /// <summary>
        /// A unique ID that should be used for rendering the scoped UI schema element.
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("id")]
        string Id { get; set; }

        /// <summary>
        /// The root schema as returned by the store.
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("rootSchema")]
        JsonSchema RootSchema { get; set; }

    }
}

