namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    /// <summary>
    /// A composable condition.
    /// </summary>
    public interface ComposableCondition : Condition
    {
        [System.Text.Json.Serialization.JsonPropertyName("conditions")]
        Condition[] Conditions { get; set; }

    }
}

