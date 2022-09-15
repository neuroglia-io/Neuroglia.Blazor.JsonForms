namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    /// <summary>
    /// A leaf condition.
    /// </summary>
    interface LeafCondition : Condition, Scoped
    {
        /// <summary>
        /// The expected value when evaluating the condition
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("expectedValue")]
        object ExpectedValue { get; set; }

    }
}

