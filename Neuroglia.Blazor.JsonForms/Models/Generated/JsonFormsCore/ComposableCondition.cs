namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    /// <summary>
    /// A composable condition.
    /// </summary>
    interface ComposableCondition : Condition
    {
        [System.Text.Json.Serialization.JsonPropertyName("conditions")]
        Condition[] Conditions { get; set; }

    }
}

