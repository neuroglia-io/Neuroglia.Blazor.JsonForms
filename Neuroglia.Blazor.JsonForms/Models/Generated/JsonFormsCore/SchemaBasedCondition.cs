namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    interface SchemaBasedCondition : Condition, Scoped
    {
        [System.Text.Json.Serialization.JsonPropertyName("schema")]
        JsonSchema Schema { get; set; }

    }
}

